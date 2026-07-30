'use client';

import { useState } from 'react';
import { Alert } from '@presentation/components/ui/Alert';
import { formStyles } from '@presentation/components/ui/form';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() })
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? 'Error. Intenta de nuevo.');
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-10 rounded-shell bg-bone-200/70 px-7 py-9 text-center ring-1 ring-inset ring-ink/[0.06]">
        <p className="text-sm leading-relaxed text-ink">
          Si existe una cuenta con ese correo, recibirás el enlace para restablecer tu contraseña.
        </p>
        <p className="mt-3 text-xs text-clay">
          En modo desarrollo, el enlace aparece en la consola del servidor.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
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

      <button type="submit" disabled={loading} className={formStyles.submit}>
        {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
      </button>
    </form>
  );
}
