import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { RegisterForm } from '@presentation/components/auth/RegisterForm';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  robots: { index: false }
};

export default function RegisterPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-4">Cuenta</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory">Crear cuenta</h1>
          <p className="mt-3 text-sm text-smoke-light">
            Regístrate para seguir tus pedidos y guardar tus fragancias favoritas.
          </p>
        </div>

        <RegisterForm />

        <p className="mt-8 text-center text-sm text-smoke-light">
          ¿Ya tienes cuenta?{' '}
          <Link
            href={ROUTES.login}
            className="text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Inicia sesión
          </Link>
        </p>
      </Container>
    </div>
  );
}
