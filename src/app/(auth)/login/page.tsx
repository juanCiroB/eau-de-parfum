import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { LoginForm } from '@presentation/components/auth/LoginForm';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  robots: { index: false }
};

export default function LoginPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const resetSuccess = searchParams['reset'] === 'ok';
  const emailVerified = searchParams['verified'] === '1';

  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-4">Cuenta</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory">Iniciar sesión</h1>
          <p className="mt-3 text-sm text-smoke-light">
            Accede a tu cuenta para ver tus pedidos y favoritos.
          </p>
        </div>

        <LoginForm resetSuccess={resetSuccess} emailVerified={emailVerified} />

        <p className="mt-8 text-center text-sm text-smoke-light">
          ¿No tienes cuenta?{' '}
          <Link
            href={ROUTES.register}
            className="text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Regístrate
          </Link>
        </p>
      </Container>
    </div>
  );
}
