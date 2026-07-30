'use client';

import { useState } from 'react';

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
      <div className="mt-10 border border-gold/30 bg-gold/5 px-6 py-8 text-center">
        <p className="text-sm text-ivory">
          Si existe una cuenta con ese correo, recibirás el enlace para restablecer tu contraseña.
        </p>
        <p className="mt-3 text-xs text-smoke">
          En modo desarrollo, el enlace aparece en la consola del servidor.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold py-3 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
      </button>
    </form>
  );
}
