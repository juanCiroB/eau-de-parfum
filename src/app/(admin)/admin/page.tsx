import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { Alert } from '@presentation/components/ui/Alert';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Panel Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function formatPrice(n: number) {
  return `$ ${n.toLocaleString('es-CO')}`;
}

export default async function AdminPage() {
  const [totalProducts, totalCustomers, totalOrders, revenueAgg, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.product.count({ where: { stock: { lte: 5 } } })
  ]);

  const totalRevenue = revenueAgg._sum.total ?? 0;

  const MODULES = [
    {
      name: 'Productos',
      detail: 'Agregar, editar, gestionar stock del catálogo.',
      href: '/admin/productos',
      stat: `${totalProducts} en catálogo`
    },
    {
      name: 'Pedidos',
      detail: 'Seguimiento y cambio de estado de cada pedido.',
      href: '/admin/pedidos',
      stat: `${totalOrders} pedido${totalOrders !== 1 ? 's' : ''}`
    },
    {
      name: 'Usuarios',
      detail: 'Clientes, roles y estado de cuentas.',
      href: '/admin/usuarios',
      stat: `${totalCustomers} cliente${totalCustomers !== 1 ? 's' : ''}`
    },
    {
      name: 'Reportes',
      detail: 'Estadísticas de ventas, stock y pedidos.',
      href: '/admin/reportes',
      stat: formatPrice(totalRevenue)
    }
  ];

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow className="mb-6">Interno</Eyebrow>
          <h1 className="font-display text-[2.5rem] font-light leading-[1.02] tracking-tighter2 text-ink sm:text-[3.25rem]">
            Panel administrativo
          </h1>
          {lowStock > 0 && (
            <div className="mt-6">
              <Alert tone="error">
                {lowStock} producto{lowStock !== 1 ? 's' : ''} con stock ≤ 5 unidades.{' '}
                <Link href="/admin/productos" className="underline underline-offset-4">
                  Revisar
                </Link>
              </Alert>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="group block rounded-shell bg-bone-200/60 p-8 ring-1 ring-inset ring-ink/[0.07] transition-all duration-500 ease-haptic hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-xl font-light tracking-tighter2 text-ink">
                  {m.name}
                </h2>
                <span className="font-mono text-[11px] text-terra">{m.stat}</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-clay-dark">{m.detail}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 group-hover:text-terra">
                Gestionar
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-haptic group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
