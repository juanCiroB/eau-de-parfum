'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@presentation/store/cart.store';
import { cartCount, cartSubtotal } from '@domain/entities/Cart';

/**
 * Hook de presentación que expone el carrito de forma segura para SSR.
 * Rehidrata el store persistido tras montar y deriva totales con el dominio.
 */
export function useCart() {
  const [hydrated, setHydrated] = useState(false);
  const cart = useCartStore((s) => s.cart);
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const subtotal = cartSubtotal(cart);
  const count = hydrated ? cartCount(cart) : 0;

  return {
    hydrated,
    items: hydrated ? cart.items : [],
    count,
    subtotal,
    add,
    remove,
    setQuantity,
    clear
  };
}
