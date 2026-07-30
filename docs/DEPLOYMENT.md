# Despliegue y hosting

El cliente tiene presupuesto limitado. A continuación, tres rutas ordenadas de
mayor a menor recomendación.

## 1. Vercel — recomendado

Creadores de Next.js. Despliegue conectando el repositorio de Git; cada *push*
publica automáticamente.

- **Ventajas**: cero configuración para Next, SSR/SSG/ISR nativos, CDN global,
  HTTPS automático, *preview deployments* por rama, escalado sin servidores que
  administrar.
- **Costo**: plan **Hobby gratuito** suficiente para validar el prototipo y
  tráfico inicial. Plan **Pro ~US$20/mes** cuando crezca (límites de ancho de
  banda y funciones más altos).
- **Ideal para**: salir a producción rápido con mínima operación.

## 2. Hostinger

Hosting económico popular en Latinoamérica.

- **Ventajas**: precio bajo, panel sencillo, dominios y correo incluidos en
  algunos planes.
- **Consideración**: Next con SSR requiere su soporte de **Node.js** (VPS o plan
  compatible), no el hosting compartido PHP clásico. Para sitio mayormente
  estático se puede exportar (`output: 'export'`), perdiendo SSR.
- **Costo**: **~US$3–10/mes** según plan.
- **Ideal para**: presupuesto muy ajustado aceptando algo más de configuración.

## 3. VPS económico (Hetzner, DigitalOcean, Contabo)

Servidor propio con control total.

- **Ventajas**: control completo, sin límites de plataforma, buen precio/recursos.
- **Costo**: **~US$4–6/mes** (p. ej. Hetzner CX22, DigitalOcean droplet básico).
- **Requiere**: administrar Node, un *process manager* (PM2), Nginx como *reverse
  proxy* y certificados (Let's Encrypt). Más mantenimiento manual.
- **Ideal para**: quien quiere control y costo bajo y no teme la operación.

## Recomendación final

Empezar en **Vercel (gratis)** para validar negocio sin distracción operativa.
Migrar a VPS sólo si el costo de Vercel Pro deja de compensar el tiempo ahorrado.

## Checklist previo a producción

- Configurar variables de entorno (ver `.env.example`).
- Reemplazar repositorios `InMemory*` por adaptadores HTTP en `container.ts`.
- Conectar una pasarela de pago (`CheckoutGateway`).
- Apuntar el dominio y verificar HTTPS.
