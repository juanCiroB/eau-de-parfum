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
      className={`rounded-shell bg-bone-200/50 ring-1 ring-inset ring-ink/[0.07] px-2 py-1 text-xs focus:border-terra focus:outline-none disabled:opacity-50 ${current?.color ?? 'text-clay'}`}
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-bone-200/60 text-ink">
          {s.label}
        </option>
      ))}
    </select>
  );
}
