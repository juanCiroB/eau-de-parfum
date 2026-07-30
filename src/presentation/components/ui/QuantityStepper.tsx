'use client';

import { MAX_QUANTITY_PER_ITEM } from '@domain/entities/Cart';
import { cn } from '@shared/utils/cn';

/** Selector de cantidad en píldora, con hundido al pulsar. */
export function QuantityStepper({
  value,
  onChange,
  inverted = false
}: {
  value: number;
  onChange: (next: number) => void;
  /** Sobre fondo de tinta. */
  inverted?: boolean;
}) {
  const step = cn(
    'flex h-9 w-9 items-center justify-center rounded-full text-base transition-all duration-300 ease-haptic',
    'active:scale-90 disabled:pointer-events-none disabled:opacity-25',
    inverted
      ? 'text-bone/70 hover:bg-bone/10 hover:text-bone'
      : 'text-clay-dark hover:bg-ink/[0.06] hover:text-ink'
  );

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full p-1 ring-1 ring-inset',
        inverted ? 'bg-bone/[0.06] ring-bone/15' : 'bg-ink/[0.035] ring-ink/10'
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className={step}
      >
        −
      </button>
      <span
        aria-live="polite"
        className={cn(
          'w-8 select-none text-center font-mono text-sm',
          inverted ? 'text-bone' : 'text-ink'
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY_PER_ITEM}
        className={step}
      >
        +
      </button>
    </div>
  );
}
