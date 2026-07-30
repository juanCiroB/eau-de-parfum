import type { Cart } from '@domain/entities/Cart';
import type { Address } from '@domain/entities/Address';
import type { CheckoutGateway, CheckoutSession } from '@application/ports/CheckoutGateway';
import type { OrderRepository } from '@domain/repositories/OrderRepository';
import type { Result } from '@shared/types';
import { ok, err } from '@shared/types';
import { cartSubtotal } from '@domain/entities/Cart';

/**
 * Caso de uso de checkout (FASE 2 — no se ejecuta en el prototipo).
 * Demuestra cómo la pasarela de pago entra por un PUERTO (CheckoutGateway):
 * el dominio NO conoce Wompi, Mercado Pago, PayU ni Stripe. Sólo conoce el
 * contrato. Cambiar de proveedor = cambiar el adaptador inyectado.
 */
export class CreateCheckout {
  constructor(
    private readonly gateway: CheckoutGateway,
    _orders: OrderRepository // se usará en Fase 2 para persistir el pedido
  ) {}

  async execute(input: {
    cart: Cart;
    address: Address;
    userId: string | null;
  }): Promise<Result<CheckoutSession>> {
    if (input.cart.items.length === 0) {
      return err({ code: 'CART_EMPTY', message: 'El carrito está vacío.' });
    }
    const subtotal = cartSubtotal(input.cart);
    // En fase 2: persistir el pedido (status 'pending') antes de redirigir al pago.
    // await this.orders.create(...)
    const session = await this.gateway.createSession({
      amount: subtotal.amount,
      currency: subtotal.currency,
      reference: `EDP-${Date.now()}`
    });
    return ok(session);
  }
}
