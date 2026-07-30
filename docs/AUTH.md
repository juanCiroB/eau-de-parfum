# Autenticación

Implementada con **NextAuth.js** (estrategia de credenciales) sobre el modelo
`User` de Prisma/PostgreSQL.

## Rutas de UI

- `/login` → `app/(auth)/login/page.tsx`
- `/registro` → `app/(auth)/registro/page.tsx`
- `/recuperar` → `app/(auth)/recuperar/page.tsx` (solicitar reseteo)
- `/nueva-contrasena` → `app/(auth)/nueva-contrasena/page.tsx` (definir nueva contraseña con token)
- `/verificar` → `app/(auth)/verificar/page.tsx` (confirmar email)

## Endpoints

| Ruta | Método | Función |
|------|--------|---------|
| `/api/auth/[...nextauth]` | — | Handler de NextAuth (login, sesión JWT) |
| `/api/auth/register` | POST | Crea usuario, envía email de verificación |
| `/api/auth/verify-email` | GET | Confirma el token de verificación de email |
| `/api/auth/resend-verification` | POST | Reenvía el correo de verificación |
| `/api/auth/forgot-password` | POST | Genera token de reseteo y envía correo |
| `/api/auth/reset-password` | POST | Aplica la nueva contraseña con el token |

## Flujo de credenciales (`src/lib/auth.ts`)

`CredentialsProvider.authorize()` valida, en orden:

1. **Rate limit por IP** — 10 intentos / 15 min (`checkRateLimit`, in-memory).
2. Usuario existe.
3. Cuenta activa (`user.active`).
4. Email verificado (`user.emailVerified`).
5. Cuenta no bloqueada (`user.lockedUntil`).
6. Contraseña correcta — comparación con `bcrypt`, **timing-safe**: si el
   usuario no existe se compara igual contra un hash dummy para no filtrar
   por tiempo de respuesta si el correo está registrado.

Si la contraseña falla, se incrementa `loginAttempts`; al llegar a **5** se
fija `lockedUntil = now + 15min`. Un login exitoso resetea ambos contadores.
La sesión usa JWT (`session.strategy = 'jwt'`) con `id` y `role` inyectados
en el callback `jwt`/`session`.

## Registro y verificación de email

`POST /api/auth/register`:
- Rate limit: 5 intentos / hora por IP.
- Valida email (`isValidEmail`), contraseña fuerte (`passwordError`: mínimo 8
  caracteres, mayúscula, minúscula y número) y nombre (`src/lib/auth-utils.ts`).
- Hashea con `bcrypt` (cost 12), crea el usuario con `emailVerified: false`.
- Genera un `EmailVerificationToken` (32 bytes aleatorios, expira en 24h) y
  envía el correo con `sendVerificationEmail` (`src/lib/mailer.ts`, SMTP vía
  Nodemailer).
- `GET /api/auth/verify-email?token=...` marca `emailVerified: true` y borra
  el token (uso único).

## Recuperación de contraseña

- `POST /api/auth/forgot-password`: rate limit 3/hora por IP. Si el correo
  existe, borra tokens previos, genera un `PasswordResetToken` (expira en 1h)
  y envía el correo. **Siempre responde `{ ok: true }`**, exista o no la
  cuenta, para no filtrar qué correos están registrados.
- `POST /api/auth/reset-password`: valida el token (no usado, no expirado),
  aplica la nueva contraseña (`bcrypt`) y marca el token como usado
  (`usedAt`), todo en una transacción Prisma.

## Protección de rutas

Centralizada en `src/middleware.ts` con `withAuth` de NextAuth:

```ts
matcher: ['/admin/:path*', '/cuenta/:path*']
```

- `/cuenta/*` requiere sesión.
- `/admin/*` requiere sesión **y** `token.role === 'ADMIN'`; si no, redirige
  a `/login`.

Cada endpoint bajo `/api/admin/*` repite además su propia verificación de
rol vía `getServerSession(authOptions)` (defensa en profundidad, no confía
solo en el middleware).

## Nota de arquitectura

El diseño original (ver historial) proponía un puerto `AuthGateway` en la
capa de aplicación, con un adaptador `NextAuthGateway` en infraestructura,
igual que el patrón del catálogo. La implementación real es más directa: las
rutas de auth llaman a `prisma` (`@lib/prisma`) sin pasar por casos de uso ni
por el puerto `UserRepository` que sí existe en `domain/repositories/
UserRepository.ts` (con su adaptador `PrismaUserRepository`, hoy sin
consumidores). Es una simplificación pragmática — funciona bien a este
tamaño — pero si el proyecto crece conviene mover esta lógica a casos de uso
en `domain/use-cases/auth/` para mantener la regla de dependencia del resto
del código.

## Pendiente

- **Google OAuth** ("Continuar con Google") — no implementado, solo
  credenciales por ahora. Variables `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
  documentadas en `.env.example` pero sin usar.
