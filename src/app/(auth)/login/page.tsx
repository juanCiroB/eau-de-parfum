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
    <div className="halo-warm py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-6">Cuenta</Eyebrow>
          <h1 className="font-display text-[2.25rem] font-light leading-tight tracking-tighter2 text-ink sm:text-[2.75rem]">Iniciar sesión</h1>
          <p className="mt-3 text-sm leading-relaxed text-clay-dark">
            Accede a tu cuenta para ver tus pedidos y favoritos.
          </p>
        </div>

        <LoginForm resetSuccess={resetSuccess} emailVerified={emailVerified} />

        <p className="mt-8 text-center text-sm leading-relaxed text-clay-dark">
          ¿No tienes cuenta?{' '}
          <Link
            href={ROUTES.register}
            className="text-terra underline underline-offset-4 transition-colors duration-300 hover:text-terra-dark"
          >
            Regístrate
          </Link>
        </p>
      </Container>
    </div>
  );
}
