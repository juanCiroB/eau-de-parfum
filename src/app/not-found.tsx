import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { Button } from '@presentation/components/ui/Button';
import { ROUTES } from '@shared/constants';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-32">
      <Container className="text-center">
        <Eyebrow className="mb-4">Error 404</Eyebrow>
        <h1 className="font-display text-5xl font-light text-noir">Página no encontrada</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-smoke-dark">
          La fragancia que buscas no está aquí. Quizá fue descontinuada o la
          dirección cambió.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href={ROUTES.home}>
            <Button variant="primary">Volver al inicio</Button>
          </Link>
          <Link href={ROUTES.catalog}>
            <Button variant="outline">Ver catálogo</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
