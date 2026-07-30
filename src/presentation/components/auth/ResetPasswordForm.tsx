'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@shared/constants';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? 'Error. Intenta de nuevo.');
      return;
    }

    router.push(`${ROUTES.login}?reset=ok`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
      {error && (
        <div className="border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs uppercase tracking-wide2 text-smoke"
        >
          Nueva contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="confirm"
          className="mb-1.5 block text-xs uppercase tracking-wide2 text-smoke"
        >
          Confirmar contraseña
        </label>
        <input
          id="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repite la contraseña"
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold py-3 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? 'Guardando…' : 'Cambiar contraseña'}
      </button>
    </form>
  );
}
