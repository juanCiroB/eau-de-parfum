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
    <div className="halo-warm py-20 lg:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow className="mb-6">Cuenta</Eyebrow>
          <h1 className="font-display text-[2.25rem] font-light leading-tight tracking-tighter2 text-ink sm:text-[2.75rem]">Crear cuenta</h1>
          <p className="mt-3 text-sm leading-relaxed text-clay-dark">
            Regístrate para seguir tus pedidos y guardar tus fragancias favoritas.
          </p>
        </div>

        <RegisterForm />

        <p className="mt-8 text-center text-sm leading-relaxed text-clay-dark">
          ¿Ya tienes cuenta?{' '}
          <Link
            href={ROUTES.login}
            className="text-terra underline underline-offset-4 transition-colors duration-300 hover:text-terra-dark"
          >
            Inicia sesión
          </Link>
        </p>
      </Container>
    </div>
  );
}
