'use client';

import { MAX_QUANTITY_PER_ITEM } from '@domain/entities/Cart';

export function QuantityStepper({
  value,
  onChange
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-ivory/20">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className="h-9 w-9 text-smoke-light transition-colors hover:text-gold disabled:opacity-30"
      >
        −
      </button>
      <span className="w-9 select-none text-center text-sm tabular-nums text-ivory" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY_PER_ITEM}
        className="h-9 w-9 text-smoke-light transition-colors hover:text-gold disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
