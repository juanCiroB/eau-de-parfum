'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@shared/constants';

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: 'Correo o contraseña incorrectos.',
  AccountLocked:
    'Cuenta bloqueada por múltiples intentos fallidos. Espera 15 minutos e intenta de nuevo.',
  AccountInactive:
    'Esta cuenta está desactivada. Contacta al administrador.',
  RateLimit:
    'Demasiados intentos desde tu red. Espera 15 minutos antes de intentar de nuevo.',
  EmailNotVerified:
    'Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.'
};

export function LoginForm({ resetSuccess, emailVerified }: { resetSuccess?: boolean; emailVerified?: boolean }) {
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
      setError(
        ERROR_MESSAGES[res?.error ?? ''] ?? 'Correo o contraseña incorrectos.'
      );
      return;
    }

    router.push(ROUTES.home);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
      {emailVerified && (
        <div className="border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-ivory">
          ¡Correo confirmado! Ya puedes iniciar sesión.
        </div>
      )}

      {resetSuccess && (
        <div className="border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-ivory">
          Contraseña actualizada. Puedes iniciar sesión ahora.
        </div>
      )}

      {error && (
        <div className="border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wide2 text-smoke">
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
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs uppercase tracking-wide2 text-smoke">
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
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />
      </div>

      <div className="flex justify-end">
        <Link href={ROUTES.forgotPassword} className="text-xs text-smoke transition-colors hover:text-gold">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold py-3 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
