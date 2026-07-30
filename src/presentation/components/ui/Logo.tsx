import Link from 'next/link';
import { ROUTES, SITE } from '@shared/constants';
import { cn } from '@shared/utils/cn';

/** Wordmark de la marca. La tipografía ES el logo (sin imagen). */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={SITE.name}
      className={cn('group inline-flex flex-col items-center leading-none', className)}
    >
      <span
        className={cn(
          'font-display text-xl tracking-[0.22em] sm:text-2xl',
          inverted ? 'text-noir' : 'text-ivory'
        )}
      >
        EAU DE PARFUM
      </span>
      <span className="mt-1 h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
    </Link>
  );
}
