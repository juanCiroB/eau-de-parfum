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
      <h1 className="mb-2 font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">Configuración de cuenta</h1>
      <p className="mb-8 text-sm text-clay-dark">
        Correo actual: <span className="text-ink">{session?.user?.email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="border bg-terra/[0.07] ring-1 ring-inset ring-terra/25 border-transparent px-4 py-3 text-sm text-ink">
            {success}
          </div>
        )}

        {/* Contraseña actual - siempre requerida */}
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide2 text-clay-dark">
            Contraseña actual <span className="text-red-800">*</span>
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Tu contraseña actual"
            className="w-full rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 placeholder:text-clay focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra"
          />
        </div>

        <hr className="border-ink/[0.08]" />

        {/* Cambio de correo */}
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide2 text-clay-dark">
            Nuevo correo electrónico
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="nuevo@correo.com"
            className="w-full rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 placeholder:text-clay focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra"
          />
          <p className="mt-1 text-xs text-clay">Dejar vacío para no cambiar.</p>
        </div>

        {/* Cambio de contraseña */}
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide2 text-clay-dark">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres con mayúscula y número"
            className="w-full rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 placeholder:text-clay focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide2 text-clay-dark">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la nueva contraseña"
            className="w-full rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 placeholder:text-clay focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !currentPassword}
          className="w-full rounded-full bg-ink py-3.5 text-[11px] uppercase tracking-wide2 text-bone shadow-lift transition-all duration-500 ease-haptic hover:bg-ink-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45"
        >
          {loading ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </form>

      <div className="mt-8 rounded-core bg-bone-200/50 p-5 ring-1 ring-inset ring-ink/[0.07]">
        <p className="text-xs text-clay leading-relaxed">
          <strong className="text-clay-dark">Importante:</strong> Al cambiar el correo, este
          quedará como la nueva dirección de acceso. Si también cambias la contraseña, asegúrate de
          guardarla en un lugar seguro. El correo provisional{' '}
          <code className="text-terra">admin@eaudeparfum.co</code> puede descartarse una vez hayas
          guardado los nuevos datos.
        </p>
      </div>
    </div>
  );
}
