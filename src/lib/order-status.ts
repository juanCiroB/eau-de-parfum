export const ORDER_STATUSES = [
  { value: 'PENDING',   label: 'Pendiente', color: 'text-amber-400', barColor: 'bg-amber-400' },
  { value: 'PACKED',    label: 'Empacado',  color: 'text-blue-400',  barColor: 'bg-blue-400' },
  { value: 'SHIPPED',   label: 'Enviado',   color: 'text-sky-400',   barColor: 'bg-sky-400' },
  { value: 'DELIVERED', label: 'Entregado', color: 'text-green-400', barColor: 'bg-green-400' },
  { value: 'CANCELLED', label: 'Cancelado', color: 'text-red-400',   barColor: 'bg-red-400' }
] as const;

export function statusLabel(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export function statusColor(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.color ?? 'text-smoke';
}

export function statusBarColor(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.barColor ?? 'bg-gold';
}
