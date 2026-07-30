'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartableProduct } from '@domain/entities/Cart';
import type { ProductId } from '@shared/types';
import { CartOperations } from '@domain/use-cases/cart/CartOperations';
import { EMPTY_CART } from '@domain/entities/Cart';

/**
 * Store del carrito (estado global con Zustand).
 *
 * Responsabilidad ESTRICTA: mantener el estado del carrito en cliente y
 * persistirlo. TODA la lógica (cómo se suma, cómo se calcula) vive en el
 * dominio (CartOperations). El store sólo invoca esas funciones puras.
 *
 * Cuando exista carrito en backend, este store delega en un servicio remoto
 * conservando exactamente la misma API pública.
 */
interface CartState {
  cart: Cart;
  add: (product: CartableProduct, qty?: number) => void;
  remove: (productId: ProductId) => void;
  setQuantity: (productId: ProductId, qty: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: EMPTY_CART,
      add: (product, qty = 1) =>
        set((state) => ({ cart: CartOperations.add(state.cart, product, qty) })),
      remove: (productId) =>
        set((state) => ({ cart: CartOperations.remove(state.cart, productId) })),
      setQuantity: (productId, qty) =>
        set((state) => ({ cart: CartOperations.setQuantity(state.cart, productId, qty) })),
      clear: () => set({ cart: CartOperations.clear() })
    }),
    {
      name: 'edp-cart',
      storage: createJSONStorage(() => localStorage),
      // Evita desajustes de hidratación SSR: se rehidrata tras montar.
      skipHydration: true
    }
  )
);
