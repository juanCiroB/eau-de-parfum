import Link from 'next/link';
import { ROUTES } from '@shared/constants';
import { Button } from '@presentation/components/ui/Button';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-dashed border-ivory/15 py-24 text-center">
      <Eyebrow>Carrito</Eyebrow>
      <p className="font-display text-3xl font-light text-ivory">Tu carrito está vacío</p>
      <p className="max-w-sm text-sm text-smoke-light">
        Explora nuestra selección de fragancias de diseñador, árabes y de nicho,
        todas nuevas y selladas.
      </p>
      <Link href={ROUTES.catalog} className="mt-2">
        <Button variant="gold">Explorar catálogo</Button>
      </Link>
    </div>
  );
}
