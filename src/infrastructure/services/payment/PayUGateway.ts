import type {
  CheckoutGateway,
  CheckoutRequest,
  CheckoutSession
} from '@application/ports/CheckoutGateway';

/** Adaptador de PayU. STUB de fase 2. */
export class PayUGateway implements CheckoutGateway {
  readonly provider = 'payu' as const;

  async createSession(input: CheckoutRequest): Promise<CheckoutSession> {
    return {
      provider: this.provider,
      reference: input.reference,
      redirectUrl: `/checkout/payu?ref=${input.reference}`
    };
  }
}
