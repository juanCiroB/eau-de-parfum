'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UserActions({
  userId,
  initialRole,
  initialActive,
  isSelf
}: {
  userId: string;
  initialRole: string;
  initialActive: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [role, setRole] = useState(initialRole);
  const [active, setActive] = useState(initialActive);
  const [loading, setLoading] = useState(false);

  if (isSelf) {
    return <span className="text-[11px] text-smoke">(tu cuenta)</span>;
  }

  async function patch(data: { role?: string; active?: boolean }) {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setLoading(false);
    if (res.ok) {
      const updated = (await res.json()) as { role: string; active: boolean };
      setRole(updated.role);
      setActive(updated.active);
      router.refresh();
    } else {
      const err = (await res.json()) as { error?: string };
      alert(err.error ?? 'Error al actualizar');
    }
  }

  function toggleRole() {
    const next = role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    if (next === 'ADMIN' && !confirm('¿Dar permisos de administrador a este usuario?')) return;
    void patch({ role: next });
  }

  function toggleActive() {
    if (active && !confirm('¿Desactivar esta cuenta? El usuario no podrá iniciar sesión.')) return;
    void patch({ active: !active });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleRole}
        disabled={loading}
        className="text-[11px] uppercase tracking-wide2 text-smoke transition-colors hover:text-gold disabled:opacity-40"
      >
        {role === 'ADMIN' ? 'Quitar admin' : 'Hacer admin'}
      </button>
      <span className="text-ivory/20">|</span>
      <button
        onClick={toggleActive}
        disabled={loading}
        className={`text-[11px] uppercase tracking-wide2 transition-colors disabled:opacity-40 ${
          active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'
        }`}
      >
        {active ? 'Desactivar' : 'Activar'}
      </button>
    </div>
  );
}
