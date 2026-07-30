'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ROUTES } from '@shared/constants';

const PASSWORD_RULES = [
  { label: 'Mínimo 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Una letra mayúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Una letra minúscula', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Un número',           test: (p: string) => /[0-9]/.test(p) }
];

const RESEND_WAIT = 120; // 2 minutos en segundos

function ResendSection({ email }: { email: string }) {
  const [seconds, setSeconds] = useState(RESEND_WAIT);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  async function handleResend() {
    setResending(true);
    setResendMsg('');

    const res = await fetch('/api/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setResending(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setResendMsg(data.error ?? 'Error al reenviar. Intenta de nuevo.');
      return;
    }

    setResendMsg('¡Correo reenviado! Revisa tu bandeja de entrada.');
    // Reinicia el contador
    setSeconds(RESEND_WAIT);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(intervalRef.current!); return 0; }
        return s - 1;
      });
    }, 1000);
  }

  return (
    <div className="mt-5 border-t border-ivory/10 pt-5 text-center">
      {resendMsg && (
        <p className={`mb-3 text-xs ${resendMsg.startsWith('¡') ? 'text-green-400' : 'text-red-400'}`}>
          {resendMsg}
        </p>
      )}

      {seconds > 0 ? (
        <p className="text-xs text-smoke">
          ¿No llegó? Puedes solicitar otro correo en{' '}
          <span className="tabular-nums text-smoke-light">{formatTime(seconds)}</span>
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-xs uppercase tracking-widest text-gold underline underline-offset-4 transition-colors hover:text-gold-light disabled:opacity-50"
        >
          {resending ? 'Enviando…' : 'Reenviar correo de confirmación'}
        </button>
      )}
    </div>
  );
}

export function RegisterForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? 'Error al registrar. Intenta de nuevo.');
      return;
    }

    setSentEmail(email.trim());
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-10 space-y-4">
        <div className="border border-gold/30 bg-gold/5 px-6 py-8 text-center">
          <p className="font-display text-2xl font-light text-ivory">Revisa tu correo</p>
          <p className="mt-3 text-sm text-smoke-light leading-relaxed">
            Te enviamos un enlace de confirmación a{' '}
            <strong className="text-ivory">{sentEmail}</strong>.
            <br />
            Haz clic en él para activar tu cuenta.
          </p>
          <p className="mt-4 text-xs text-smoke">
            ¿No lo ves? Revisa la carpeta de spam o correo no deseado.
          </p>

          <ResendSection email={sentEmail} />
        </div>

        <p className="text-center text-sm text-smoke-light">
          <Link href={ROUTES.login} className="text-gold underline underline-offset-4 hover:text-gold-light">
            Volver al inicio de sesión
          </Link>
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
        <label htmlFor="fullName" className="mb-1.5 block text-xs uppercase tracking-wide2 text-smoke">
          Nombre completo
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Tu nombre completo"
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />
      </div>

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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowRules(true)}
          placeholder="••••••••"
          className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
        />

        {showRules && (
          <ul className="mt-2 space-y-1">
            {PASSWORD_RULES.map((rule) => {
              const ok = rule.test(password);
              return (
                <li key={rule.label} className={`flex items-center gap-2 text-[11px] ${ok ? 'text-green-400' : 'text-smoke'}`}>
                  <span>{ok ? '✓' : '○'}</span>
                  {rule.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold py-3 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? 'Creando cuenta…' : 'Registrarme'}
      </button>
    </form>
  );
}
