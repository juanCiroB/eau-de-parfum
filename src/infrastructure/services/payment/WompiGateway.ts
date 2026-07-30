import type {
  CheckoutGateway,
  CheckoutRequest,
  CheckoutSession
} from '@application/ports/CheckoutGateway';

/**
 * Adaptador de Wompi (recomendado para Colombia). STUB de fase 2.
 * Implementa el puerto CheckoutGateway. La lógica real (firma de integridad,
 * llamada al SDK, widget) se añade aquí SIN tocar dominio ni presentación.
 */
export class WompiGateway implements CheckoutGateway {
  readonly provider = 'wompi' as const;

  async createSession(input: CheckoutRequest): Promise<CheckoutSession> {
    // TODO(fase 2): generar firma de integridad y crear transacción vía API Wompi.
    return {
      provider: this.provider,
      reference: input.reference,
      redirectUrl: `/checkout/wompi?ref=${input.reference}&amount=${input.amount}`
    };
  }
}
