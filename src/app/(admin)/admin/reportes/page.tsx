import type { Metadata } from 'next';
import { Container } from '@presentation/components/ui/Container';
import { statusLabel, statusBarColor } from '@lib/order-status';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Reportes · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function formatPrice(n: number) {
  return `$ ${n.toLocaleString('es-CO')}`;
}

/**
 * Barra de proporción. Carril tintado con el papel, relleno redondeado y
 * un mínimo visible para que un valor pequeño no desaparezca del todo.
 */
function Bar({ value, max, color = 'bg-terra' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      role="img"
      aria-label={`${pct}% del total`}
      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.07]"
    >
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: pct > 0 ? `max(3px, ${pct}%)` : '0%' }}
      />
    </div>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  disenador: 'Diseñador',
  arabe: 'Árabe',
  nicho: 'Nicho'
};

export default async function AdminReportesPage() {
  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    revenueAgg,
    categoryGroups,
    orderStatusGroups,
    stockHealth,
    recentOrders
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.product.groupBy({ by: ['categorySlug'], _count: { id: true } }),
    prisma.order.groupBy({ by: ['status'], _count: { id: true } }),
    Promise.all([
      prisma.product.count({ where: { stock: { gt: 5 } } }),
      prisma.product.count({ where: { stock: { gt: 0, lte: 5 } } }),
      prisma.product.count({ where: { stock: 0 } })
    ]),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, total: true, status: true, createdAt: true, address: true }
    })
  ]);

  const totalRevenue = revenueAgg._sum.total ?? 0;
  const [inStock, lowStock, outOfStock] = stockHealth;
  const maxCategory = Math.max(...categoryGroups.map((g) => g._count.id), 1);
  const maxStatus = Math.max(...orderStatusGroups.map((g) => g._count.id), 1);

  const STAT_CARDS = [
    { label: 'Productos en catálogo', value: String(totalProducts), color: 'text-terra' },
    { label: 'Clientes registrados', value: String(totalCustomers), color: 'text-ink' },
    { label: 'Pedidos totales', value: String(totalOrders), color: 'text-ink' },
    { label: 'Ingresos totales', value: formatPrice(totalRevenue), color: 'text-emerald-700' }
  ];

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <h1 className="mb-8 font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">Reportes</h1>

        <dl className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map((card) => (
            <div
              key={card.label}
              className="rounded-shell bg-bone-200/50 px-6 py-6 ring-1 ring-inset ring-ink/[0.07]"
            >
              <dt className="text-[10px] uppercase tracking-wide2 text-clay-dark">{card.label}</dt>
              <dd className={`mt-3 font-mono text-2xl ${card.color}`}>{card.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-shell p-6 ring-1 ring-inset ring-ink/[0.07]">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-clay">Productos por categoría</h2>
            <div className="space-y-4">
              {categoryGroups.map((g) => (
                <div key={g.categorySlug}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink">{CATEGORY_LABELS[g.categorySlug] ?? g.categorySlug}</span>
                    <span className="text-sm text-terra">{g._count.id}</span>
                  </div>
                  <Bar value={g._count.id} max={maxCategory} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-shell p-6 ring-1 ring-inset ring-ink/[0.07]">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-clay">Estado del stock</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">En stock</span>
                  <span className="text-sm text-emerald-700">{inStock}</span>
                </div>
                <Bar value={inStock} max={totalProducts} color="bg-emerald-700" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">Stock bajo (≤5)</span>
                  <span className="text-sm text-amber-700">{lowStock}</span>
                </div>
                <Bar value={lowStock} max={totalProducts} color="bg-amber-700" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">Sin stock</span>
                  <span className="text-sm text-red-800">{outOfStock}</span>
                </div>
                <Bar value={outOfStock} max={totalProducts} color="bg-red-800" />
              </div>
            </div>
          </div>

          <div className="rounded-shell p-6 ring-1 ring-inset ring-ink/[0.07]">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-clay">Pedidos por estado</h2>
            {orderStatusGroups.length === 0 ? (
              <p className="text-sm text-clay">Sin pedidos aún</p>
            ) : (
              <div className="space-y-4">
                {orderStatusGroups.map((g) => (
                  <div key={g.status}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ink">{statusLabel(g.status)}</span>
                      <span className="text-sm text-terra">{g._count.id}</span>
                    </div>
                    <Bar value={g._count.id} max={maxStatus} color={statusBarColor(g.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {recentOrders.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-shell ring-1 ring-inset ring-ink/[0.07]">
            <div className="border-b border-ink/[0.08] px-6 py-4">
              <h2 className="text-[11px] uppercase tracking-wide2 text-clay">Últimos 5 pedidos</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/[0.05] text-left text-[11px] uppercase tracking-wide2 text-clay">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => {
                  const addr = JSON.parse(o.address) as { fullName: string };
                  return (
                    <tr key={o.id} className="border-b border-ink/[0.05]">
                      <td className="px-6 py-3 font-mono text-[11px] text-clay">
                        #{o.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-3 text-ink">{addr.fullName}</td>
                      <td className="px-6 py-3 text-terra">{formatPrice(o.total)}</td>
                      <td className="px-6 py-3 text-clay">{statusLabel(o.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
