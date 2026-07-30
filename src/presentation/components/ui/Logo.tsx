import Link from 'next/link';
import { ROUTES, SITE } from '@shared/constants';
import { cn } from '@shared/utils/cn';

/**
 * Wordmark. La tipografía ES el logo: "EAU" y "PARFUM" en versal display,
 * "DE" en itálica para romper la uniformidad. El filete de acento crece al
 * pasar el cursor.
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={SITE.name}
      className={cn('group inline-flex flex-col items-center leading-none', className)}
    >
      <span
        className={cn(
          'whitespace-nowrap font-display text-[0.8125rem] tracking-[0.12em] sm:text-[1.0625rem] sm:tracking-[0.2em] lg:text-xl',
          inverted ? 'text-bone' : 'text-ink'
        )}
      >
        EAU <span className="italic tracking-[0.1em] text-terra">de</span> PARFUM
      </span>
      <span
        aria-hidden="true"
        className="mt-1.5 h-px w-6 bg-terra transition-all duration-700 ease-haptic group-hover:w-16"
      />
    </Link>
  );
}
