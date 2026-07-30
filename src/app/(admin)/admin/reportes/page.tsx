import type { Metadata } from 'next';
import { Container } from '@presentation/components/ui/Container';
import { statusLabel, statusBarColor } from '@lib/order-status';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Reportes · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function formatPrice(n: number) {
  return `$ ${n.toLocaleString('es-CO')}`;
}

function Bar({ value, max, color = 'bg-gold' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mt-1.5 h-1.5 w-full bg-ivory/10">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
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
    { label: 'Productos en catálogo', value: String(totalProducts), color: 'text-gold' },
    { label: 'Clientes registrados', value: String(totalCustomers), color: 'text-ivory' },
    { label: 'Pedidos totales', value: String(totalOrders), color: 'text-ivory' },
    { label: 'Ingresos totales', value: formatPrice(totalRevenue), color: 'text-green-400' }
  ];

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <h1 className="mb-8 font-display text-3xl font-light text-ivory">Reportes</h1>

        <div className="mb-10 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/5 sm:grid-cols-4">
          {STAT_CARDS.map((card) => (
            <div key={card.label} className="bg-noir-800 px-6 py-5">
              <p className="text-[11px] uppercase tracking-wide2 text-smoke">{card.label}</p>
              <p className={`mt-2 font-display text-3xl font-light ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="border border-ivory/10 p-6">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-smoke">Productos por categoría</h2>
            <div className="space-y-4">
              {categoryGroups.map((g) => (
                <div key={g.categorySlug}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ivory">{CATEGORY_LABELS[g.categorySlug] ?? g.categorySlug}</span>
                    <span className="text-sm text-gold">{g._count.id}</span>
                  </div>
                  <Bar value={g._count.id} max={maxCategory} />
                </div>
              ))}
            </div>
          </div>

          <div className="border border-ivory/10 p-6">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-smoke">Estado del stock</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ivory">En stock</span>
                  <span className="text-sm text-green-400">{inStock}</span>
                </div>
                <Bar value={inStock} max={totalProducts} color="bg-green-400" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ivory">Stock bajo (≤5)</span>
                  <span className="text-sm text-amber-400">{lowStock}</span>
                </div>
                <Bar value={lowStock} max={totalProducts} color="bg-amber-400" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ivory">Sin stock</span>
                  <span className="text-sm text-red-400">{outOfStock}</span>
                </div>
                <Bar value={outOfStock} max={totalProducts} color="bg-red-400" />
              </div>
            </div>
          </div>

          <div className="border border-ivory/10 p-6">
            <h2 className="mb-4 text-[11px] uppercase tracking-wide2 text-smoke">Pedidos por estado</h2>
            {orderStatusGroups.length === 0 ? (
              <p className="text-sm text-smoke">Sin pedidos aún</p>
            ) : (
              <div className="space-y-4">
                {orderStatusGroups.map((g) => (
                  <div key={g.status}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ivory">{statusLabel(g.status)}</span>
                      <span className="text-sm text-gold">{g._count.id}</span>
                    </div>
                    <Bar value={g._count.id} max={maxStatus} color={statusBarColor(g.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {recentOrders.length > 0 && (
          <div className="mt-10 border border-ivory/10">
            <div className="border-b border-ivory/10 px-6 py-4">
              <h2 className="text-[11px] uppercase tracking-wide2 text-smoke">Últimos 5 pedidos</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ivory/5 text-left text-[11px] uppercase tracking-wide2 text-smoke">
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
                    <tr key={o.id} className="border-b border-ivory/5">
                      <td className="px-6 py-3 font-mono text-[11px] text-smoke">
                        #{o.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-3 text-ivory">{addr.fullName}</td>
                      <td className="px-6 py-3 text-gold">{formatPrice(o.total)}</td>
                      <td className="px-6 py-3 text-smoke">{statusLabel(o.status)}</td>
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
