import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { Button } from '@presentation/components/ui/Button';
import { ROUTES } from '@shared/constants';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-32 lg:py-40">
      <Container className="text-center">
        <Eyebrow className="mb-7">Error 404</Eyebrow>
        {/* La cifra como pieza gráfica, no como texto de sistema. */}
        <p aria-hidden="true" className="font-display text-[6rem] font-light leading-none tracking-tighter2 text-ink/10 sm:text-[9rem]">
          404
        </p>
        <h1 className="-mt-6 font-display text-[2.5rem] font-light leading-tight tracking-tighter2 text-ink sm:-mt-10 sm:text-[3.5rem]">
          Página no <span className="italic text-terra">encontrada</span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-clay-dark">
          La fragancia que buscas no está aquí. Quizá fue descontinuada o la
          dirección cambió.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={ROUTES.home}>
            <Button variant="primary" withArrow>
              Volver al inicio
            </Button>
          </Link>
          <Link href={ROUTES.catalog}>
            <Button variant="outline">Ver catálogo</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
