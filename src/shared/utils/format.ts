import type { CurrencyCode } from '@shared/types';

/**
 * Formatea pesos colombianos (COP) sin decimales: $ 350.000.
 * El monto se modela en unidades enteras de peso (el COP no usa centavos en la práctica).
 */
const FORMATTERS: Record<CurrencyCode, Intl.NumberFormat> = {
  COP: new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  })
};

export function formatMoney(amount: number, currency: CurrencyCode = 'COP'): string {
  return FORMATTERS[currency].format(amount);
}
