import type { ProductId } from '@shared/types';
import { Money } from './Money';

/**
 * Forma mínima de un producto que el carrito necesita para crear un ítem.
 * Tanto la entidad de dominio Product como el DTO ProductView la satisfacen
 * estructuralmente, así el carrito funciona desde servidor o cliente sin
 * acoplar la presentación al dominio completo.
 */
export interface CartableProduct {
  readonly id: ProductId;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly price: number;
  readonly images: string[];
  readonly volumeMl: number;
}

/**
 * Ítem del carrito. Guarda un "snapshot" mínimo del producto (precio, nombre,
 * imagen) para que el carrito no dependa del catálogo en vivo: el precio queda
 * congelado al momento de agregar, comportamiento esperado en e-commerce real.
 */
export interface CartItem {
  readonly productId: ProductId;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly unitPrice: number; // COP
  readonly image: string;
  readonly volumeMl: number;
  readonly quantity: number;
}

export const MAX_QUANTITY_PER_ITEM = 10;

export function createCartItem(product: CartableProduct, quantity = 1): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    unitPrice: product.price,
    image: product.images[0] ?? '',
    volumeMl: product.volumeMl,
    quantity: clampQuantity(quantity)
  };
}

export function lineTotal(item: CartItem): Money {
  return Money.of(item.unitPrice).multiply(item.quantity);
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.min(MAX_QUANTITY_PER_ITEM, Math.trunc(quantity)));
}

/* ─── Carrito ──────────────────────────────────────────────────────────────
 * El carrito se modela como datos inmutables + funciones puras. Cada operación
 * devuelve un NUEVO carrito. Esto encaja perfecto con stores (Zustand) y deja
 * la lógica testeable sin React ni navegador.
 * ──────────────────────────────────────────────────────────────────────── */

export interface Cart {
  readonly items: CartItem[];
}

export const EMPTY_CART: Cart = { items: [] };

export function addToCart(cart: Cart, product: CartableProduct, quantity = 1): Cart {
  const existing = cart.items.find((i) => i.productId === product.id);
  if (existing) {
    return updateQuantity(cart, product.id, existing.quantity + quantity);
  }
  return { items: [...cart.items, createCartItem(product, quantity)] };
}

export function removeFromCart(cart: Cart, productId: ProductId): Cart {
  return { items: cart.items.filter((i) => i.productId !== productId) };
}

export function updateQuantity(cart: Cart, productId: ProductId, quantity: number): Cart {
  return {
    items: cart.items.map((i) =>
      i.productId === productId ? { ...i, quantity: clampQuantity(quantity) } : i
    )
  };
}

export function clearCart(): Cart {
  return EMPTY_CART;
}

export function cartCount(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(cart: Cart): Money {
  return cart.items.reduce((acc, item) => acc.add(lineTotal(item)), Money.zero());
}
