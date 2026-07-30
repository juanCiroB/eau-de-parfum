'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@shared/constants';
import { Alert } from '@presentation/components/ui/Alert';
import { formStyles } from '@presentation/components/ui/form';

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
      setError('Las contraseñas no coinciden.');
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
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      {error && <Alert tone="error">{error}</Alert>}

      <div>
        <label htmlFor="password" className={formStyles.label}>
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
          className={formStyles.input}
        />
      </div>

      <div>
        <label htmlFor="confirm" className={formStyles.label}>
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
          className={formStyles.input}
        />
      </div>

      <button type="submit" disabled={loading} className={formStyles.submit}>
        {loading ? 'Guardando…' : 'Cambiar contraseña'}
      </button>
    </form>
  );
}
