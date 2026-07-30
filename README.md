# EAU DE PARFUM — E-commerce de perfumería

Tienda virtual de perfumería (Colombia) construida como **base profesional y
escalable**, no como mockup desechable. Además del storefront (catálogo,
producto, carrito), el proyecto ya tiene **autenticación, panel administrativo
y base de datos en producción** (PostgreSQL vía Neon + Prisma). Queda
preparada la arquitectura para incorporar pagos **sin reescribir**.

> Vende únicamente perfumes **nuevos y sellados** en tres categorías:
> **Diseñador**, **Árabe** y **Nicho**.

---

## 1. Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript (modo `strict`) |
| Estilos | Tailwind CSS (sistema de tokens propio) |
| Estado global | Zustand (con `persist`) |
| Tipografías | Cormorant Garamond (display) + Jost (texto), vía `next/font` |
| Base de datos | PostgreSQL (Neon) + Prisma ORM |
| Autenticación | NextAuth.js (credenciales + roles), `bcryptjs` para hashing |
| Correo | Nodemailer (SMTP Gmail) — verificación de email y recuperación de contraseña |

Convención de idioma: **el código en inglés** (entidades, tipos: `Product`,
`Category`), **la interfaz, los comentarios y la documentación en español**.

---

## 2. Arquitectura

El proyecto aplica **Arquitectura Hexagonal + Clean Architecture + SOLID**, con
una regla de dependencia estricta: **las capas externas dependen de las internas,
nunca al revés.**

```
Presentación → Aplicación → Dominio ← Infraestructura
                               ▲
                          (el centro no
                         depende de nadie)
```

### Capas y responsabilidades

| Capa | Carpeta | Responsabilidad | Depende de |
|------|---------|-----------------|------------|
| **Dominio** | `src/domain` | Reglas de negocio puras: entidades, *value objects*, puertos (interfaces de repositorio) y casos de uso. Sin React, sin red, sin Next. | Nadie |
| **Aplicación** | `src/application` | Orquesta casos de uso, define puertos de servicios externos (p. ej. `CheckoutGateway`) y traduce dominio → DTOs de UI (`ProductView`). | Dominio |
| **Infraestructura** | `src/infrastructure` | Implementaciones concretas: repositorios (hoy en memoria, mañana HTTP), pasarelas de pago, cliente HTTP, datos simulados y el **composition root** (`container.ts`). | Dominio, Aplicación |
| **Presentación** | `src/presentation` | UI: componentes, hooks, store de Zustand. Consume **servicios de aplicación**, jamás repositorios directamente. | Aplicación, Dominio (tipos) |
| **Compartido** | `src/shared` | Tipos transversales (`Result`, IDs de marca), constantes (rutas, sitio) y utilidades puras (formato de moneda, slug). | Nadie |
| **App Router** | `src/app` | Rutas y composición de páginas (Server Components que llaman a los servicios). | Todas las anteriores |

### El truco de la inversión de dependencias

Los casos de uso dependen de **interfaces** (`ProductRepository`), no de
implementaciones. La implementación concreta se inyecta en **un solo lugar**:

```
src/infrastructure/container.ts   ← composition root
```

Para pasar a producción con backend real, se cambia **una línea** ahí
(`InMemoryProductRepository` → `HttpProductRepository`). Páginas, componentes y
casos de uso quedan **intactos**. Esa es la promesa de escalabilidad del brief.

---

## 3. Estructura de carpetas

```
src/
├── app/                      # App Router (rutas + páginas)
│   ├── catalogo/
│   ├── producto/[slug]/
│   ├── carrito/
│   ├── (auth)/login | registro/      # reservado Fase 2
│   ├── (admin)/admin/                # reservado Fase 2
│   ├── layout.tsx · page.tsx · not-found.tsx · globals.css
│
├── domain/                   # Núcleo de negocio (puro)
│   ├── entities/             # Product, Category, Cart, Money, Order, User, Address
│   ├── repositories/         # Puertos: ProductRepository, CategoryRepository, OrderRepository
│   └── use-cases/            # product/ category/ cart/ checkout/
│
├── application/              # Orquestación
│   ├── dto/                  # ProductView (forma lista para UI)
│   ├── mappers/              # dominio → DTO
│   ├── ports/                # CheckoutGateway (puerto de pago)
│   └── services/             # CatalogService
│
├── infrastructure/           # Mundo real
│   ├── api/                  # httpClient (stub Fase 2)
│   ├── data/                 # products.ts, categories.ts (simulados)
│   ├── repositories/         # InMemory*Repository
│   ├── services/payment/     # Wompi · MercadoPago · PayU · Stripe (stubs)
│   └── container.ts          # composition root
│
├── presentation/             # UI
│   ├── components/           # ui/ layout/ home/ product/ catalog/ cart/
│   ├── hooks/                # useCart, useCatalogFilters
│   └── store/                # cart.store.ts (Zustand)
│
└── shared/                   # constants/ types/ utils/
```

---

## 4. Funcionalidades

- **Home**: hero, categorías destacadas, productos destacados, beneficios, footer.
- **Catálogo**: búsqueda, filtro por categoría, ordenamiento (relevancia/precio/nombre), grid responsive. Productos servidos desde PostgreSQL vía `PrismaProductRepository`.
- **Producto**: galería, datos, descripción, **pirámide olfativa**, agregar al carrito, relacionados.
- **Carrito**: agregar, eliminar, modificar cantidad, subtotal, vaciar. Persistente (localStorage).
- **Autenticación** (`(auth)` + `api/auth/*`): registro, login por credenciales, verificación de email, recuperación/reseteo de contraseña, bloqueo de cuenta por intentos fallidos (`loginAttempts` / `lockedUntil`), rate limiting (`src/lib/rate-limit.ts`).
- **Cuenta** (`/cuenta/pedidos`): historial de pedidos del usuario autenticado.
- **Panel administrativo** (`(admin)` + `api/admin/*`), protegido por rol `ADMIN` en `src/middleware.ts`:
  - Productos: alta, edición, control de stock.
  - Pedidos: listado y cambio de estado (`PENDING → PACKED → SHIPPED → DELIVERED`, o `CANCELLED`).
  - Usuarios: listado y acciones (bloqueo/rol).
  - Reportes y configuración (credenciales SMTP, etc.).

### Preparado, no implementado

- **Pagos** → `application/ports/CheckoutGateway.ts` + 4 gateways stub (Wompi, MercadoPago, PayU, Stripe) en `infrastructure/services/payment/`. Ningún gateway está conectado a una pasarela real todavía.
- **Login con Google** → mencionado en `docs/AUTH.md`, no implementado (solo credenciales por ahora).
- **Promociones/cupones** → mencionado en `docs/ADMIN.md`, sin puerto ni UI.

---

## 5. Puesta en marcha

```bash
npm install
```

Copia `.env.example` a `.env.local` y completa al menos:

```
DATABASE_URL=            # PostgreSQL (Neon u otro proveedor)
NEXTAUTH_URL=             # http://localhost:3000 en desarrollo
NEXTAUTH_SECRET=          # openssl rand -base64 32
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_FROM   # envío de correos
```

```bash
npx prisma generate
npx prisma migrate deploy   # aplica el historial de migraciones a la BD
npm run dev                 # http://localhost:3000
```

Otros scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`.

> Las imágenes usan Unsplash; sin conexión, el componente `ImageWithFallback`
> muestra un marcador elegante con el monograma **EDP**.

---

## 6. Documentación técnica

| Documento | Contenido |
|-----------|-----------|
| `docs/ARCHITECTURE.md` | Detalle de capas, flujo de datos y principios SOLID aplicados. |
| `docs/AUTH.md` | Plan original de login/registro/Google. Credenciales ya implementadas; Google OAuth sigue pendiente. |
| `docs/ADMIN.md` | Plan original del panel. Productos/pedidos/usuarios ya implementados; promociones sigue pendiente. |
| `docs/DATA-MODEL.md` | Modelo de datos propuesto. El esquema real y ya aplicado vive en `prisma/schema.prisma`. |
| `docs/DEPLOYMENT.md` | Vercel / Hostinger / VPS: ventajas y costos. |

> Los documentos en `docs/` se escribieron como plan antes de implementar
> auth/admin/BD, así que describen el diseño objetivo más que el estado
> actual línea por línea. El código y `prisma/schema.prisma` son la fuente
> de verdad.
