import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

type Variant = 'primary' | 'outline' | 'ghost' | 'gold';

/**
 * Paleta oscura:
 * - primary  → relleno marfil claro sobre fondo negro
 * - outline  → borde marfil semitransparente, texto marfil
 * - ghost    → sin borde, texto humo que se ilumina a oro
 * - gold     → relleno dorado, texto negro
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ivory text-noir hover:bg-ivory-200 border border-ivory',
  gold:
    'bg-gold text-noir hover:bg-gold-light border border-gold',
  outline:
    'bg-transparent text-ivory border border-ivory/30 hover:border-gold hover:text-gold',
  ghost:
    'bg-transparent text-smoke-light hover:text-gold border border-transparent'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-medium uppercase tracking-wide2 transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-noir',
        'disabled:cursor-not-allowed disabled:opacity-40',
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
