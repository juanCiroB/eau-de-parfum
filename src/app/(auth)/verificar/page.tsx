'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ROUTES } from '@shared/constants';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('Enlace de verificación inválido.');
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        if (res.ok) {
          setStatus('success');
          setTimeout(() => router.push(`${ROUTES.login}?verified=1`), 3000);
        } else {
          const data = (await res.json()) as { error?: string };
          setStatus('error');
          setErrorMsg(data.error ?? 'No se pudo verificar el correo.');
        }
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('Error de conexión. Intenta de nuevo.');
      });
  }, [token, router]);

  return (
    <div className="text-center">
      <Eyebrow className="mb-4">Verificación</Eyebrow>

      {status === 'loading' && (
        <>
          <h1 className="font-display text-4xl font-light text-ivory">Verificando…</h1>
          <p className="mt-3 text-sm text-smoke-light">Confirmando tu dirección de correo.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <h1 className="font-display text-4xl font-light text-ivory">¡Correo confirmado!</h1>
          <p className="mt-3 text-sm text-smoke-light">
            Tu cuenta está activa. Serás redirigido al inicio de sesión en unos segundos…
          </p>
          <Link
            href={ROUTES.login}
            className="mt-8 inline-block text-sm text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Iniciar sesión ahora
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="font-display text-4xl font-light text-ivory">Enlace inválido</h1>
          <p className="mt-3 text-sm text-smoke-light">{errorMsg}</p>
          <Link
            href={ROUTES.register}
            className="mt-8 inline-block text-sm text-gold underline underline-offset-4 hover:text-gold-light"
          >
            Volver al registro
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-md">
        <Suspense fallback={
          <div className="text-center">
            <Eyebrow className="mb-4">Verificación</Eyebrow>
            <h1 className="font-display text-4xl font-light text-ivory">Cargando…</h1>
          </div>
        }>
          <VerifyContent />
        </Suspense>
      </Container>
    </div>
  );
}
