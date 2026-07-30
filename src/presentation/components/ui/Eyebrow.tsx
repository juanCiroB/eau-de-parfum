import { cn } from '@shared/utils/cn';

/**
 * "Eyebrow": etiqueta pequeña en mayúsculas con tracking amplio.
 * Estructura editorial que jerarquiza sin decorar de más.
 */
export function Eyebrow({
  children,
  className,
  tone = 'gold'
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'gold' | 'smoke';
}) {
  return (
    <span
      className={cn(
        'inline-block text-[11px] font-medium uppercase tracking-luxe',
        tone === 'gold' ? 'text-gold' : 'text-smoke',
        className
      )}
    >
      {children}
    </span>
  );
}
