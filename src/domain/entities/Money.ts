import type { CurrencyCode } from '@shared/types';
import { formatMoney } from '@shared/utils/format';

/**
 * Objeto de valor Money. Inmutable y con aritmética segura por moneda.
 * Encapsular el dinero evita errores de redondeo y mezcla de monedas
 * dispersos por la app. Es la base para impuestos/IVA y envíos futuros.
 */
export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: CurrencyCode
  ) {}

  static of(amount: number, currency: CurrencyCode = 'COP'): Money {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Monto inválido: ${amount}`);
    }
    return new Money(Math.round(amount), currency);
  }

  static zero(currency: CurrencyCode = 'COP'): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  format(): string {
    return formatMoney(this.amount, this.currency);
  }

  private assertSameCurrency(other: Money): void {
    if (other.currency !== this.currency) {
      throw new Error(`No se pueden operar monedas distintas: ${this.currency} vs ${other.currency}`);
    }
  }
}
