import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

/**
 * Botón "isla": píldora con masa física.
 *
 * - primary → tinta sólida sobre papel
 * - accent  → terracota, reservado a la acción comercial principal
 * - outline → filete capilar, sin relleno
 * - ghost   → solo texto, para acciones terciarias
 *
 * El pulsado hunde el botón (`active:scale`) y la flecha opcional vive dentro
 * de su propio círculo, que se desplaza en diagonal al pasar el cursor.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-bone hover:bg-ink-700 shadow-lift',
  accent: 'bg-terra text-bone-100 hover:bg-terra-light shadow-lift',
  outline:
    'bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/45 hover:bg-ink/[0.03]',
  ghost: 'bg-transparent text-clay-dark hover:text-terra'
};

/** Círculo interior de la flecha, tintado según la variante. */
const ARROW_TONE: Record<Variant, string> = {
  primary: 'bg-bone/15',
  accent: 'bg-bone/20',
  outline: 'bg-ink/[0.07]',
  ghost: 'bg-ink/[0.07]'
};

const SIZES_ARROW: Record<Size, string> = {
  sm: 'gap-2 py-2 pl-4 pr-2 text-[11px]',
  md: 'gap-3 py-2.5 pl-6 pr-2.5 text-xs'
};

const SIZES_PLAIN: Record<Size, string> = {
  sm: 'gap-2 px-4 py-2 text-[11px]',
  md: 'gap-2 px-7 py-3 text-xs'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Muestra la flecha anidada en su propio círculo. */
  withArrow?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'group inline-flex items-center justify-center rounded-full font-medium uppercase tracking-wide2',
        'transition-all duration-500 ease-haptic active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
        'disabled:pointer-events-none disabled:opacity-40',
        withArrow ? SIZES_ARROW[size] : SIZES_PLAIN[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-haptic',
            'group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105',
            size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-[11px]',
            ARROW_TONE[variant]
          )}
        >
          ↗
        </span>
      )}
    </button>
  );
}
