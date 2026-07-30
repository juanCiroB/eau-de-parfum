'use client';

import { useState, useRef } from 'react';

export function StockEditor({ id, initialStock }: { id: string; initialStock: number }) {
  const [stock, setStock] = useState(initialStock);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function save(value: number) {
    if (value === initialStock && stock === initialStock) return;
    setSaving(true);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: value })
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  }

  // El color avisa del nivel; el punto lateral lo repite sin depender del matiz.
  const color = stock === 0 ? 'text-red-800' : stock <= 5 ? 'text-amber-700' : 'text-ink';
  const dot = stock === 0 ? 'bg-red-800' : stock <= 5 ? 'bg-amber-700' : 'bg-emerald-700';

  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <input
        ref={inputRef}
        type="number"
        min={0}
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        onBlur={(e) => {
          void save(Number(e.target.value));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') inputRef.current?.blur();
        }}
        aria-label="Unidades en stock"
        className={`w-16 rounded-full bg-bone-200/70 px-3 py-1.5 font-mono text-sm ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra disabled:opacity-50 ${color}`}
        disabled={saving}
      />
      <span aria-live="polite" className="text-[10px] text-clay">
        {saving ? 'Guardando' : saved ? 'Guardado' : ''}
      </span>
    </div>
  );
}
