'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;

    setLoading(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      const data = (await res.json()) as { error?: string };
      alert(data.error ?? 'Error al eliminar el producto');
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[11px] uppercase tracking-wide2 text-red-400 transition-colors hover:text-red-300 disabled:opacity-40"
    >
      {loading ? 'Eliminando…' : 'Eliminar'}
    </button>
  );
}
