'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@shared/constants';
import { Alert } from '@presentation/components/ui/Alert';
import { formStyles } from '@presentation/components/ui/form';

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: 'Correo o contraseña incorrectos.',
  AccountLocked:
    'Cuenta bloqueada por múltiples intentos fallidos. Espera 15 minutos e intenta de nuevo.',
  AccountInactive: 'Esta cuenta está desactivada. Contacta al administrador.',
  RateLimit:
    'Demasiados intentos desde tu red. Espera 15 minutos antes de intentar de nuevo.',
  EmailNotVerified:
    'Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.'
};

export function LoginForm({
  resetSuccess,
  emailVerified
}: {
  resetSuccess?: boolean;
  emailVerified?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email: email.trim(),
      password,
      redirect: false
    });

    setLoading(false);

    if (!res?.ok || res.error) {
      setError(ERROR_MESSAGES[res?.error ?? ''] ?? 'Correo o contraseña incorrectos.');
      return;
    }

    router.push(ROUTES.home);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      {emailVerified && <Alert tone="success">Correo confirmado. Ya puedes iniciar sesión.</Alert>}

      {resetSuccess && (
        <Alert tone="success">Contraseña actualizada. Puedes iniciar sesión ahora.</Alert>
      )}

      {error && <Alert tone="error">{error}</Alert>}

      <div>
        <label htmlFor="email" className={formStyles.label}>
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={formStyles.input}
        />
      </div>

      <div>
        <label htmlFor="password" className={formStyles.label}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={formStyles.input}
        />
      </div>

      <div className="flex justify-end">
        <Link
          href={ROUTES.forgotPassword}
          className="underline-grow text-xs text-clay transition-colors duration-300 hover:text-terra"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button type="submit" disabled={loading} className={formStyles.submit}>
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
