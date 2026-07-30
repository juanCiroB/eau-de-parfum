# Panel administrativo

Implementado bajo el grupo de rutas `(admin)`, protegido por sesión + rol
`ADMIN` (`src/middleware.ts` + verificación repetida en cada endpoint).

## Páginas (`src/app/(admin)/admin/`)

| Ruta | Función |
|------|---------|
| `/admin` | Resumen general |
| `/admin/productos` | Listado de productos |
| `/admin/productos/nuevo` | Alta de producto |
| `/admin/productos/[id]/editar` | Edición / stock / destacado |
| `/admin/pedidos` | Listado de pedidos y cambio de estado |
| `/admin/usuarios` | Listado de usuarios, rol y bloqueo |
| `/admin/reportes` | Reportes |
| `/admin/configuracion` | Credenciales del propio admin (email/contraseña) |

## Endpoints (`src/app/api/admin/`)

Todos verifican `getServerSession(authOptions)` y exigen
`session.user.role === 'ADMIN'` antes de tocar la base de datos.

| Ruta | Método | Función |
|------|--------|---------|
| `/api/admin/products` | GET, POST | Listar / crear producto |
| `/api/admin/products/[id]` | GET, PATCH, DELETE | Ver / editar / eliminar producto |
| `/api/admin/orders` | GET | Listar pedidos |
| `/api/admin/orders/[id]` | PATCH | Cambiar estado del pedido |
| `/api/admin/users` | GET | Listar usuarios (con conteo de pedidos) |
| `/api/admin/users/[id]` | PATCH | Cambiar rol / activar-desactivar usuario |
| `/api/admin/settings/credentials` | PATCH | El admin cambia su propio email/contraseña (exige contraseña actual) |

### Detalles relevantes

- **Productos**: el `slug` se genera automáticamente a partir de
  `brand + name`; si ya existe, se le agrega un sufijo de timestamp para
  evitar colisiones. Al crear/editar se invalida la caché de `/` y
  `/catalogo` con `revalidatePath`.
- **Pedidos**: estados válidos son `PENDING`, `PACKED`, `SHIPPED`,
  `DELIVERED`, `CANCELLED` (ver `src/lib/order-status.ts` para etiquetas y
  colores usados en la UI).
- **Usuarios**: un admin no puede modificarse a sí mismo desde
  `/api/admin/users/[id]` (para eso existe `/admin/configuracion`, que exige
  reconfirmar la contraseña actual).

## Cómo se incorporó

El panel **no** implementa una lógica de negocio paralela: reutiliza el
mismo modelo Prisma (`User`, `Product`, `Order`) que el resto de la app. En
la práctica, las rutas de administración llaman directamente a `prisma`
(`@lib/prisma`) en vez de pasar por los puertos de dominio
(`ProductRepository`, `OrderRepository`) que sí usa el storefront público a
través de `CatalogService`. Es una decisión pragmática para escribir CRUD
administrativo rápido; si se quiere mantener la regla de dependencia
estricta del resto del proyecto, estas rutas deberían delegar en casos de
uso (`CreateProduct`, `UpdateOrderStatus`, etc.) que sí dependan solo de los
puertos.

## Desacople

El grupo de rutas `(admin)` tiene su propio `layout.tsx`, aislado de la
tienda pública — la navegación y protección de `/admin` no afectan al
storefront.

## Pendiente

- **Promociones/cupones** (`PromotionRepository`, cupones, campañas) —
  mencionado en el plan original, sin puerto ni UI implementados todavía.
