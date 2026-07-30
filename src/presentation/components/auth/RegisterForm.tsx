'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ROUTES } from '@shared/constants';
import { Alert } from '@presentation/components/ui/Alert';
import { formStyles } from '@presentation/components/ui/form';
import { cn } from '@shared/utils/cn';

const PASSWORD_RULES = [
  { label: 'Mínimo 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Una letra mayúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Una letra minúscula', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Un número', test: (p: string) => /[0-9]/.test(p) }
];

const RESEND_WAIT = 120; // 2 minutos en segundos

function ResendSection({ email }: { email: string }) {
  const [seconds, setSeconds] = useState(RESEND_WAIT);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [resendOk, setResendOk] = useState(false);
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
      body: JSON.stringify({ email })
    });

    setResending(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setResendOk(false);
      setResendMsg(data.error ?? 'No pudimos reenviar el correo. Intenta de nuevo.');
      return;
    }

    setResendOk(true);
    setResendMsg('Correo reenviado. Revisa tu bandeja de entrada.');
    // Reinicia el contador
    setSeconds(RESEND_WAIT);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  return (
    <div className="mt-6 border-t border-ink/[0.09] pt-5 text-center">
      {resendMsg && (
        <p
          role="status"
          className={cn('mb-3 text-xs', resendOk ? 'text-terra' : 'text-red-800')}
        >
          {resendMsg}
        </p>
      )}

      {seconds > 0 ? (
        <p className="text-xs text-clay">
          ¿No llegó? Puedes solicitar otro correo en{' '}
          <span className="font-mono text-clay-dark">{formatTime(seconds)}</span>
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={resending}
          className="underline-grow text-[11px] uppercase tracking-wide2 text-terra transition-colors duration-300 hover:text-terra-dark disabled:opacity-50"
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
      setError(data.error ?? 'No pudimos crear la cuenta. Intenta de nuevo.');
      return;
    }

    setSentEmail(email.trim());
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-10 space-y-5">
        <div className="rounded-shell bg-bone-200/70 px-7 py-9 text-center ring-1 ring-inset ring-ink/[0.06]">
          <p className="font-display text-2xl font-light tracking-tighter2 text-ink">
            Revisa tu correo
          </p>
          <p className="mt-3 text-sm leading-relaxed text-clay-dark">
            Te enviamos un enlace de confirmación a{' '}
            <strong className="font-medium text-ink">{sentEmail}</strong>.
            <br />
            Haz clic en él para activar tu cuenta.
          </p>
          <p className="mt-4 text-xs text-clay">
            ¿No lo ves? Revisa la carpeta de spam o correo no deseado.
          </p>

          <ResendSection email={sentEmail} />
        </div>

        <p className="text-center text-sm text-clay-dark">
          <Link
            href={ROUTES.login}
            className="underline-grow text-terra transition-colors duration-300 hover:text-terra-dark"
          >
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      {error && <Alert tone="error">{error}</Alert>}

      <div>
        <label htmlFor="fullName" className={formStyles.label}>
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
          className={formStyles.input}
        />
      </div>

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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowRules(true)}
          placeholder="••••••••"
          className={formStyles.input}
        />

        {/* Requisitos como barras que se completan, sin iconos de librería. */}
        {showRules && (
          <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
            {PASSWORD_RULES.map((rule) => {
              const ok = rule.test(password);
              return (
                <li key={rule.label} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-px w-5 shrink-0 transition-colors duration-500',
                      ok ? 'bg-terra' : 'bg-ink/15'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[11px] transition-colors duration-500',
                      ok ? 'text-ink' : 'text-clay'
                    )}
                  >
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button type="submit" disabled={loading} className={formStyles.submit}>
        {loading ? 'Creando cuenta…' : 'Registrarme'}
      </button>
    </form>
  );
}
