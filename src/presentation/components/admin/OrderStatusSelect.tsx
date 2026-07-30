'use client';

import { useState } from 'react';
import { ORDER_STATUSES } from '@lib/order-status';

export function OrderStatusSelect({
  orderId,
  initialStatus
}: {
  orderId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next })
    });
    setSaving(false);
    if (res.ok) setStatus(next);
  }

  const current = ORDER_STATUSES.find((s) => s.value === status) ?? ORDER_STATUSES[0];

  return (
    <select
      value={status}
      onChange={(e) => { void handleChange(e.target.value); }}
      disabled={saving}
      className={`border border-ivory/10 bg-noir-800 px-2 py-1 text-xs focus:border-gold focus:outline-none disabled:opacity-50 ${current?.color ?? 'text-smoke'}`}
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-noir-800 text-ivory">
          {s.label}
        </option>
      ))}
    </select>
  );
}
