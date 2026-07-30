/**
 * Estados de pedido y su expresión visual.
 *
 * Los tonos son semánticos (no decorativos): viven aparte del acento de marca
 * y se eligen en el rango 700-800 para leerse sobre papel sin estridencia.
 */
export const ORDER_STATUSES = [
  { value: 'PENDING', label: 'Pendiente', color: 'text-amber-700', barColor: 'bg-amber-700' },
  { value: 'PACKED', label: 'Empacado', color: 'text-indigo-700', barColor: 'bg-indigo-700' },
  { value: 'SHIPPED', label: 'Enviado', color: 'text-sky-700', barColor: 'bg-sky-700' },
  { value: 'DELIVERED', label: 'Entregado', color: 'text-emerald-700', barColor: 'bg-emerald-700' },
  { value: 'CANCELLED', label: 'Cancelado', color: 'text-red-800', barColor: 'bg-red-800' }
] as const;

export function statusLabel(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export function statusColor(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.color ?? 'text-clay';
}

export function statusBarColor(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.barColor ?? 'bg-clay';
}
