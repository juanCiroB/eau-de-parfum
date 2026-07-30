import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { cn } from '@shared/utils/cn';

/** Encabezado de sección reutilizable: eyebrow + título display + intro opcional. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  inverted = false
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: 'center' | 'left';
  inverted?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          'font-display text-3xl font-light leading-tight sm:text-4xl lg:text-[2.75rem]',
          inverted ? 'text-ivory' : 'text-ivory'
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn('mt-4 text-sm leading-relaxed', inverted ? 'text-smoke-light' : 'text-smoke-light')}>
          {intro}
        </p>
      )}
    </div>
  );
}
