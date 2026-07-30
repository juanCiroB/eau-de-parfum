import type {
  CheckoutGateway,
  CheckoutRequest,
  CheckoutSession
} from '@application/ports/CheckoutGateway';

/** Adaptador de Stripe (para ventas internacionales futuras). STUB de fase 2. */
export class StripeGateway implements CheckoutGateway {
  readonly provider = 'stripe' as const;

  async createSession(input: CheckoutRequest): Promise<CheckoutSession> {
    return {
      provider: this.provider,
      reference: input.reference,
      redirectUrl: `/checkout/stripe?ref=${input.reference}`
    };
  }
}
