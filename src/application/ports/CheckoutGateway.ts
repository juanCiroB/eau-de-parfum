import type { CurrencyCode } from '@shared/types';

/**
 * Puerto de la pasarela de pago. Es la pieza clave para "preparar el pago futuro
 * sin implementarlo". Cualquier proveedor (Wompi, Mercado Pago, PayU, Stripe)
 * se conecta implementando ESTA interfaz como un adaptador en infraestructura.
 *
 * La capa de presentación y el dominio jamás importan el SDK de un proveedor:
 * sólo dependen de este contrato. Cambiar de pasarela no toca la lógica de negocio.
 */
export interface CheckoutGateway {
  readonly provider: PaymentProvider;
  createSession(input: CheckoutRequest): Promise<CheckoutSession>;
}

export type PaymentProvider = 'wompi' | 'mercadopago' | 'payu' | 'stripe';

export interface CheckoutRequest {
  amount: number;
  currency: CurrencyCode;
  reference: string;
}

export interface CheckoutSession {
  /** URL a la que se redirige al cliente para completar el pago. */
  redirectUrl: string;
  provider: PaymentProvider;
  reference: string;
}
