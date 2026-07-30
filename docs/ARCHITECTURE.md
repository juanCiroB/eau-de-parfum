# Arquitectura

Este documento justifica las decisiones técnicas (entregable #11) y describe el
flujo de datos entre capas.

## 1. Por qué Hexagonal + Clean Architecture

El brief exige que el prototipo evolucione a plataforma real **sin reescritura**.
El riesgo número uno en un e-commerce joven es acoplar la UI a la fuente de datos
(hoy datos simulados, mañana una API). Cuando eso ocurre, cambiar de fuente
obliga a tocar decenas de componentes.

La solución es **invertir las dependencias**: el negocio define *interfaces*
(puertos) y el mundo exterior las *implementa* (adaptadores). El resultado:

- El **dominio** no sabe si los datos vienen de memoria, REST, GraphQL o Prisma.
- La **UI** no sabe cómo se calcula un subtotal; sólo pide el resultado.
- Cambiar una pieza no propaga cambios al resto.

## 2. Regla de dependencia

```
app  →  presentation  →  application  →  domain  ←  infrastructure
                                            ↑
                            shared (tipos/utilidades puras)
```

Una flecha `A → B` significa "A puede importar de B". **Nada apunta hacia
afuera del dominio.** `infrastructure` apunta *hacia adentro* porque implementa
los puertos del dominio.

## 3. Flujo de una lectura (catálogo)

1. `app/catalogo/page.tsx` (Server Component) llama a `getCatalogService()`.
2. `container.ts` devuelve un `CatalogService` con repositorios concretos inyectados.
3. `CatalogService` ejecuta los casos de uso (`GetProducts`, `GetCategories`).
4. Los casos de uso piden datos al **puerto** `ProductRepository`.
5. El adaptador `InMemoryProductRepository` responde (mañana: `HttpProductRepository`).
6. El `ProductMapper` convierte `Product` (dominio) → `ProductView` (DTO de UI).
7. La página entrega los DTOs al `CatalogClient`, que filtra/ordena en cliente.

> El paso 5 es el único que cambia al conectar un backend. Todo lo demás permanece.

## 4. Flujo de una escritura (carrito)

1. `AddToCartButton` llama al store de Zustand (`useCartStore.add`).
2. El store **no** contiene lógica: delega en `CartOperations` (capa de dominio).
3. `CartOperations` usa funciones puras de `entities/Cart.ts` que devuelven un
   carrito nuevo (inmutabilidad).
4. `persist` guarda el estado en `localStorage` (`edp-cart`).

Cuando exista carrito en servidor, el store delega en un servicio remoto
**conservando la misma API pública** (`add/remove/setQuantity/clear`). La UI no
cambia.

## 5. SOLID en la práctica

- **S — Responsabilidad única**: el store sólo guarda estado; el dominio sólo
  calcula; el mapper sólo traduce; la página sólo compone.
- **O — Abierto/cerrado**: agregar una pasarela de pago = crear una clase que
  implemente `CheckoutGateway`, sin tocar el checkout existente.
- **L — Sustitución de Liskov**: cualquier `ProductRepository` (memoria o HTTP)
  es intercambiable porque cumple el mismo contrato.
- **I — Segregación de interfaces**: `CartableProduct` expone sólo lo que el
  carrito necesita, no la entidad `Product` completa.
- **D — Inversión de dependencias**: los casos de uso dependen de interfaces;
  las implementaciones se inyectan en el composition root.

## 6. Decisiones de presentación

- **Server Components por defecto**: las páginas cargan datos en el servidor
  (mejor rendimiento y SEO). Sólo se marca `'use client'` lo interactivo
  (carrito, filtros, menú).
- **DTO `ProductView`**: la UI nunca toca la entidad de dominio. Si `Product`
  cambia, sólo se ajusta el mapper.
- **`Money` como value object**: evita errores de centavos y mezcla de monedas;
  centraliza el formato `es-CO` (COP sin decimales).
- **Tokens de Tailwind**: paleta y tipografía viven en `tailwind.config.ts`, no
  dispersas en clases mágicas. Un solo acento (oro champaña) por disciplina visual.

## 7. Tipos como red de seguridad

`tsconfig.json` activa `strict` y `noUncheckedIndexedAccess`. Se usan **IDs de
marca** (`ProductId`, `CategoryId`) para que el compilador impida pasar un id de
producto donde se espera uno de categoría, y un tipo `Result<T, E>` para modelar
errores esperables sin excepciones.
