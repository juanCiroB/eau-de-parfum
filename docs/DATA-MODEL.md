# Modelo de datos

Implementado con **Prisma** sobre **PostgreSQL** (Neon). El esquema fuente de
verdad vive en [`prisma/schema.prisma`](../prisma/schema.prisma); este
documento es un resumen legible.

## Diagrama

```
User 1 ─── N Order
User 1 ─── N EmailVerificationToken
User 1 ─── N PasswordResetToken

Product  (independiente, sin FK — categoría por slug de texto)
```

A diferencia del plan original, **no hay tablas `Category`, `Address`,
`OrderItem` ni `CartItem` en la base de datos**: esas entidades siguen
existiendo como tipos puros en `src/domain/entities/` (usadas en memoria /
en la capa de aplicación), pero el modelo persistido es deliberadamente más
plano — ver "Decisiones" abajo.

## Tablas

### `User`
`id` (cuid), `email` (único), `fullName`, `passwordHash`, `role`
(`CUSTOMER | ADMIN`, default `CUSTOMER`), `active` (default `true`),
`emailVerified` (default `false`), `loginAttempts` (default `0`),
`lockedUntil` (nullable), `createdAt`, `updatedAt`.

Relaciones: `orders`, `resetTokens`, `verificationTokens`.

### `EmailVerificationToken`
`id`, `token` (único), `userId` (FK → `User`, `onDelete: Cascade`),
`expiresAt`, `createdAt`. Uso único: se borra tras verificar.

### `PasswordResetToken`
`id`, `token` (único), `userId` (FK → `User`, `onDelete: Cascade`),
`expiresAt`, `usedAt` (nullable — marca el token como consumido en vez de
borrarlo), `createdAt`.

### `Order`
`id`, `userId` (FK → `User`, nullable, `onDelete: SetNull` — el pedido
sobrevive si se borra el usuario), `items` (**JSON serializado como
string**, snapshot de líneas del pedido), `total` (entero, COP sin
decimales), `status` (`PENDING | PACKED | SHIPPED | DELIVERED | CANCELLED`,
default `PENDING`), `address` (string libre, no tabla normalizada),
`notes` (nullable), `createdAt`, `updatedAt`.

### `Product`
`id`, `slug` (único, generado de `brand + name`), `name`, `brand`,
`categorySlug` (string libre: `disenador | arabe | nicho`, **sin FK** a una
tabla `Category`), `price` (entero COP), `shortDescription`, `description`,
`images` (**JSON serializado como string**, arreglo de URLs), `volumeMl`,
`concentration`, `notes` (**JSON serializado como string**:
`{ top, heart, base }`), `featured` (default `false`), `stock` (default
`10`), `createdAt`, `updatedAt`.

## Decisiones clave (implementadas)

- **Precios como enteros** en pesos colombianos (COP no usa decimales):
  evita error de punto flotante.
- **`slug` único** en `Product`: URLs estables, generado del lado del
  servidor con fallback de timestamp ante colisión.
- **Campos JSON como `String`** (`Order.items`, `Product.images`,
  `Product.notes`): en vez de tablas relacionadas (`OrderItem`,
  `ProductImage`) o el tipo `Json` nativo de Postgres, se serializa a texto
  y se parsea en la capa de mapeo (`application/mappers`). Simplifica el
  esquema a costa de no poder indexar/filtrar por esos campos en SQL — si
  el catálogo crece mucho, normalizar `Product.images` y `Order.items` a
  tablas propias es el primer paso recomendado.
- **`categorySlug` sin FK**: las categorías (`Diseñador`, `Árabe`, `Nicho`)
  siguen siendo datos estáticos en `infrastructure/data/categories.ts`, no
  una tabla en base de datos. Suficiente mientras solo haya 3 categorías
  fijas.
- **`Order.userId` nullable con `SetNull`**: permite (a futuro) checkout de
  invitado sin cuenta, y conserva el historial de pedidos aunque se borre el
  usuario.
- **Tokens de un solo uso**: `EmailVerificationToken` se borra tras
  consumirse; `PasswordResetToken` se marca con `usedAt` en vez de borrarse
  (permite auditar intentos de reuso).

## Migraciones

El historial vive en `prisma/migrations/`, con dialecto PostgreSQL
(`migration_lock.toml` → `provider = "postgresql"`). Flujo estándar:

```bash
npx prisma migrate dev      # desarrollo: crea y aplica migración
npx prisma migrate deploy   # producción: aplica migraciones pendientes
npx prisma generate         # regenera el cliente tras cambiar el schema
```

## Seed

`prisma/seed.ts` puebla la tabla `Product` con una lista propia
(`SEED_PRODUCTS`), calcada de los mismos datos simulados que en su momento
vivieron en `infrastructure/data/products.ts`. Hoy la fuente de verdad del
catálogo es la base de datos: ese archivo de datos en memoria queda como
referencia histórica del prototipo, no se usa en producción
(`container.ts` inyecta `PrismaProductRepository`, no el repositorio en
memoria).
