'use client';

import type { Money } from '@domain/entities/Money';
import { Button } from '@presentation/components/ui/Button';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';

export function CartSummary({ subtotal, itemCount }: { subtotal: Money; itemCount: number }) {
  return (
    <aside className="h-fit rounded-shell bg-bone-200/70 p-7 shadow-lift ring-1 ring-inset ring-ink/[0.06] lg:sticky lg:top-28">
      <Eyebrow className="mb-6">Resumen</Eyebrow>

      <dl className="space-y-3.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-clay-dark">
            Subtotal <span className="font-mono text-xs">({itemCount})</span>
          </dt>
          <dd className="font-mono text-ink">{subtotal.format()}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-clay-dark">Envío</dt>
          <dd className="text-right text-xs text-clay">Calculado al finalizar</dd>
        </div>
      </dl>

      <div className="my-6 h-px bg-ink/10" />

      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[10px] uppercase tracking-wide2 text-clay-dark">Total estimado</span>
        <span className="font-mono text-xl text-ink">{subtotal.format()}</span>
      </div>

      <Button
        variant="accent"
        className="mt-7 w-full justify-center"
        disabled
        title="Disponible en la próxima fase"
      >
        Finalizar compra
      </Button>
      <p className="mt-3.5 text-center text-[11px] leading-relaxed text-clay">
        El pago se habilitará al integrar la pasarela.
      </p>
    </aside>
  );
}
