import type { ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

type Tone = 'success' | 'error' | 'info';

/**
 * Aviso en línea para formularios. Nunca `window.alert`.
 * El tono se marca con una barra lateral además del color, para no depender
 * solo del matiz.
 */
const TONES: Record<Tone, { box: string; bar: string }> = {
  success: { box: 'bg-terra/[0.06] text-ink', bar: 'bg-terra' },
  error: { box: 'bg-red-900/[0.05] text-red-900', bar: 'bg-red-800' },
  info: { box: 'bg-ink/[0.04] text-clay-dark', bar: 'bg-clay' }
};

export function Alert({
  tone = 'info',
  children,
  className
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 overflow-hidden rounded-core py-3 pl-0 pr-4 text-sm leading-relaxed',
        TONES[tone].box,
        className
      )}
    >
      <span aria-hidden="true" className={cn('w-1 shrink-0 self-stretch', TONES[tone].bar)} />
      <span className="py-0.5">{children}</span>
    </div>
  );
}
