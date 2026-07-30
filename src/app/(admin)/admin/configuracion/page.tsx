'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminConfiguracionPage() {
  const { data: session } = useSession();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }

    if (!newEmail.trim() && !newPassword) {
      setError('Ingresa al menos un campo a cambiar (correo o contraseña).');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/admin/settings/credentials', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword,
        newEmail: newEmail.trim() || undefined,
        newPassword: newPassword || undefined,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? 'Error al guardar los cambios.');
      return;
    }

    setSuccess('Cambios guardados correctamente. Si cambiaste el correo, cierra sesión y vuelve a entrar.');
    setCurrentPassword('');
    setNewEmail('');
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="mx-auto max-w-lg py-8">
      <h1 className="mb-2 font-display text-3xl font-light text-ivory">Configuración de cuenta</h1>
      <p className="mb-8 text-sm text-smoke-light">
        Correo actual: <span className="text-ivory">{session?.user?.email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-ivory">
            {success}
          </div>
        )}

        {/* Contraseña actual - siempre requerida */}
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-smoke">
            Contraseña actual <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Tu contraseña actual"
            className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
          />
        </div>

        <hr className="border-ivory/10" />

        {/* Cambio de correo */}
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-smoke">
            Nuevo correo electrónico
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="nuevo@correo.com"
            className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
          />
          <p className="mt-1 text-xs text-smoke">Dejar vacío para no cambiar.</p>
        </div>

        {/* Cambio de contraseña */}
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-smoke">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres con mayúscula y número"
            className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-smoke">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la nueva contraseña"
            className="w-full border border-ivory/20 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !currentPassword}
          className="w-full bg-gold py-3 text-xs uppercase tracking-widest text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </form>

      <div className="mt-8 border border-ivory/10 p-4">
        <p className="text-xs text-smoke leading-relaxed">
          <strong className="text-smoke-light">Importante:</strong> Al cambiar el correo, este
          quedará como la nueva dirección de acceso. Si también cambias la contraseña, asegúrate de
          guardarla en un lugar seguro. El correo provisional{' '}
          <code className="text-gold">admin@eaudeparfum.co</code> puede descartarse una vez hayas
          guardado los nuevos datos.
        </p>
      </div>
    </div>
  );
}
