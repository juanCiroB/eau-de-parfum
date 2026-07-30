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

  const color =
    stock === 0 ? 'text-red-400' : stock <= 5 ? 'text-amber-400' : 'text-gold';

  return (
    <div className="flex items-center gap-1.5">
      <input
        ref={inputRef}
        type="number"
        min={0}
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        onBlur={(e) => { void save(Number(e.target.value)); }}
        onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.blur(); }}
        className={`w-16 border border-ivory/10 bg-transparent px-2 py-1 text-sm focus:border-gold focus:outline-none ${color}`}
        disabled={saving}
      />
      {saving && <span className="text-[10px] text-smoke">...</span>}
      {saved && <span className="text-[10px] text-gold">✓</span>}
    </div>
  );
}
