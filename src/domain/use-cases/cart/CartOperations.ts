import type { Cart } from '@domain/entities/Cart';
import type { CartableProduct } from '@domain/entities/Cart';
import type { ProductId } from '@shared/types';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  cartSubtotal,
  cartCount
} from '@domain/entities/Cart';

/**
 * Caso de uso del carrito como fachada de operaciones puras sobre la entidad Cart.
 * Mantiene la regla de negocio (qué es agregar, modificar, vaciar y calcular)
 * fuera de React. El store (Zustand) sólo invoca estas funciones.
 *
 * Beneficio: cuando exista un carrito persistido en backend, basta con que el
 * store delegue en un servicio remoto que respete estas mismas operaciones.
 */
export const CartOperations = {
  add: (cart: Cart, product: CartableProduct, qty = 1): Cart => addToCart(cart, product, qty),
  remove: (cart: Cart, productId: ProductId): Cart => removeFromCart(cart, productId),
  setQuantity: (cart: Cart, productId: ProductId, qty: number): Cart =>
    updateQuantity(cart, productId, qty),
  clear: (): Cart => clearCart(),
  subtotal: cartSubtotal,
  count: cartCount
} as const;
