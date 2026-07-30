import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ForgotPasswordForm } from '@presentation/components/auth/ForgotPasswordForm';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  robots: { index: false }
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-4">Cuenta</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory">Recuperar contraseña</h1>
          <p className="mt-3 text-sm text-smoke-light">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="mt-8 text-center text-sm text-smoke-light">
          ¿Recuerdas tu contraseña?{' '}
          <Link
            href={ROUTES.login}
            className="text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Iniciar sesión
          </Link>
        </p>
      </Container>
    </div>
  );
}
