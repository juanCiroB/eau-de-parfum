import Link from 'next/link';
import { ROUTES } from '@shared/constants';
import { Button } from '@presentation/components/ui/Button';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';

/** Estado vacío compuesto: no un hueco, sino una invitación. */
export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-shell bg-bone-200/60 px-6 py-28 text-center ring-1 ring-inset ring-ink/[0.06]">
      <svg
        width="52"
        height="74"
        viewBox="0 0 44 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-clay-light"
        aria-hidden="true"
      >
        <rect x="16" y="2" width="12" height="9" rx="1.5" />
        <path d="M18 11h8v5h-8z" />
        <rect x="4" y="16" width="36" height="44" rx="5" />
        <path d="M4 40h36" strokeDasharray="2 3" />
      </svg>

      <Eyebrow>Carrito</Eyebrow>
      <div>
        <p className="font-display text-3xl font-light tracking-tighter2 text-ink">
          Tu carrito está vacío
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-clay-dark">
          Explora nuestra selección de fragancias de diseñador, árabes y de nicho,
          todas nuevas y selladas.
        </p>
      </div>
      <Link href={ROUTES.catalog} className="mt-1">
        <Button variant="primary" withArrow>
          Explorar catálogo
        </Button>
      </Link>
    </div>
  );
}
