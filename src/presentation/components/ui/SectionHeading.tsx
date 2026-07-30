import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { cn } from '@shared/utils/cn';

/**
 * Encabezado de sección: eyebrow + titular display + intro opcional.
 * Por defecto alineado a la izquierda — la simetría centrada permanente
 * es lo que hace que una página parezca plantilla.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  inverted = false,
  className
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: 'center' | 'left';
  /** Sobre fondo de tinta. */
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={inverted ? 'bone' : 'terra'} className="mb-6">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-[2rem] font-light leading-[1.06] tracking-tighter2 sm:text-[2.75rem] lg:text-[3.25rem]',
          inverted ? 'text-bone' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 max-w-prose2 text-[0.9375rem] leading-relaxed',
            inverted ? 'text-bone/60' : 'text-clay-dark',
            align === 'center' && 'mx-auto'
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
