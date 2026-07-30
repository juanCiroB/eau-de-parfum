import type { CheckoutGateway, PaymentProvider } from '@application/ports/CheckoutGateway';
import { WompiGateway } from './WompiGateway';
import { MercadoPagoGateway } from './MercadoPagoGateway';
import { PayUGateway } from './PayUGateway';
import { StripeGateway } from './StripeGateway';

/**
 * Factory de pasarelas. Selecciona el adaptador por nombre de proveedor.
 * Cambiar de pasarela en toda la tienda = cambiar una variable de entorno.
 */
export function createCheckoutGateway(provider: PaymentProvider): CheckoutGateway {
  switch (provider) {
    case 'wompi':
      return new WompiGateway();
    case 'mercadopago':
      return new MercadoPagoGateway();
    case 'payu':
      return new PayUGateway();
    case 'stripe':
      return new StripeGateway();
    default:
      return new WompiGateway();
  }
}
