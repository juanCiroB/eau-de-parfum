import type {
  CheckoutGateway,
  CheckoutRequest,
  CheckoutSession
} from '@application/ports/CheckoutGateway';

/** Adaptador de Mercado Pago. STUB de fase 2. */
export class MercadoPagoGateway implements CheckoutGateway {
  readonly provider = 'mercadopago' as const;

  async createSession(input: CheckoutRequest): Promise<CheckoutSession> {
    // TODO(fase 2): crear "preference" con el SDK de Mercado Pago.
    return {
      provider: this.provider,
      reference: input.reference,
      redirectUrl: `/checkout/mercadopago?ref=${input.reference}`
    };
  }
}
