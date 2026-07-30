'use client';

import type { Money } from '@domain/entities/Money';
import { Button } from '@presentation/components/ui/Button';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';

export function CartSummary({
  subtotal,
  itemCount
}: {
  subtotal: Money;
  itemCount: number;
}) {
  return (
    <aside className="border border-ivory/10 bg-black p-7">
      <Eyebrow className="mb-5">Resumen</Eyebrow>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-smoke-light">Subtotal ({itemCount})</dt>
          <dd className="tabular-nums text-ivory">{subtotal.format()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-smoke-light">Envío</dt>
          <dd className="text-smoke">Calculado al finalizar</dd>
        </div>
      </dl>

      <div className="my-5 h-px bg-ivory/10" />

      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-wide2 text-smoke-light">Total estimado</span>
        <span className="font-display text-2xl text-ivory">{subtotal.format()}</span>
      </div>

      <Button variant="gold" className="mt-6 w-full" disabled title="Disponible en la próxima fase">
        Finalizar compra
      </Button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-smoke">
        El pago se habilitará al integrar la pasarela.
      </p>
    </aside>
  );
}
