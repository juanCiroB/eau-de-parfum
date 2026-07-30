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
      <div className="halo-warm py-20 lg:py-28">
        <Container className="max-w-md text-center">
          <Eyebrow className="mb-6">Error</Eyebrow>
          <h1 className="font-display text-[2.25rem] font-light leading-tight tracking-tighter2 text-ink sm:text-[2.75rem]">Enlace inválido</h1>
          <p className="mt-3 text-sm leading-relaxed text-clay-dark">
            El enlace de recuperación es inválido o ha expirado.
          </p>
          <Link
            href={ROUTES.forgotPassword}
            className="mt-8 inline-block text-sm text-terra underline underline-offset-4 transition-colors duration-300 hover:text-terra-dark"
          >
            Solicitar nuevo enlace
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="halo-warm py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-6">Cuenta</Eyebrow>
          <h1 className="font-display text-[2.25rem] font-light leading-tight tracking-tighter2 text-ink sm:text-[2.75rem]">Nueva contraseña</h1>
          <p className="mt-3 text-sm leading-relaxed text-clay-dark">Elige una contraseña segura para tu cuenta.</p>
        </div>

        <ResetPasswordForm token={token} />
      </Container>
    </div>
  );
}
