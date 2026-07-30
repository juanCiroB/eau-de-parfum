import { cn } from '@shared/utils/cn';

/**
 * "Eyebrow": microetiqueta que precede a los titulares.
 * Va en cápsula con filete capilar — jerarquiza sin decorar de más.
 */
export function Eyebrow({
  children,
  className,
  tone = 'terra',
  bare = false
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'terra' | 'clay' | 'bone';
  /** Sin cápsula: solo texto, para usos dentro de tarjetas. */
  bare?: boolean;
}) {
  const TONES = {
    terra: bare ? 'text-terra' : 'text-terra ring-terra/25',
    clay: bare ? 'text-clay' : 'text-clay-dark ring-ink/15',
    bone: bare ? 'text-bone/70' : 'text-bone/80 ring-bone/20'
  } as const;

  return (
    <span
      className={cn(
        'inline-block text-[10px] font-medium uppercase tracking-luxe',
        !bare && 'rounded-full px-3 py-1 ring-1 ring-inset',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
