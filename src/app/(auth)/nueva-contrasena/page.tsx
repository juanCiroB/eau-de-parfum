import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ResetPasswordForm } from '@presentation/components/auth/ResetPasswordForm';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Nueva contraseña',
  robots: { index: false }
};

export default function ResetPasswordPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const token = typeof searchParams['token'] === 'string' ? searchParams['token'] : '';

  if (!token) {
    return (
      <div className="py-20 lg:py-28">
        <Container className="max-w-md text-center">
          <Eyebrow className="mb-4">Error</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory">Enlace inválido</h1>
          <p className="mt-3 text-sm text-smoke-light">
            El enlace de recuperación es inválido o ha expirado.
          </p>
          <Link
            href={ROUTES.forgotPassword}
            className="mt-8 inline-block text-sm text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Solicitar nuevo enlace
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-4">Cuenta</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory">Nueva contraseña</h1>
          <p className="mt-3 text-sm text-smoke-light">Elige una contraseña segura para tu cuenta.</p>
        </div>

        <ResetPasswordForm token={token} />
      </Container>
    </div>
  );
}
