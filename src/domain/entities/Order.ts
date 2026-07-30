import type { OrderId, UserId } from '@shared/types';
import type { CartItem } from './Cart';
import type { Address } from './Address';

/** Estados del pedido. Base para el módulo de pedidos del panel admin. */
export type OrderStatus =
  | 'pending'    // creado, esperando pago
  | 'paid'       // pago confirmado por pasarela
  | 'shipped'    // despachado
  | 'delivered'  // entregado
  | 'cancelled';

/**
 * Pedido. No se usa en el prototipo (no hay checkout real), pero el contrato
 * existe para que la integración de pasarela y el panel admin encajen sin
 * rediseñar el dominio.
 */
export interface Order {
  readonly id: OrderId;
  readonly userId: UserId | null; // null = invitado (guest checkout)
  readonly items: CartItem[];
  readonly shippingAddress: Address;
  readonly subtotal: number;
  readonly shipping: number;
  readonly total: number;
  readonly status: OrderStatus;
  readonly createdAt: string; // ISO 8601
}
