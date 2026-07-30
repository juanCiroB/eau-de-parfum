import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
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
          <Eyebrow className="mb-4">Interno</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory sm:text-5xl">
            Panel administrativo
          </h1>
          {lowStock > 0 && (
            <div className="mt-4 border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold">
              ⚠ {lowStock} producto{lowStock !== 1 ? 's' : ''} con stock ≤ 5 unidades.{' '}
              <Link href="/admin/productos" className="underline underline-offset-4">
                Revisar
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/5 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link key={m.name} href={m.href} className="group block bg-noir-800 p-7 transition-colors hover:bg-noir-700">
              <h2 className="font-display text-xl text-ivory">{m.name}</h2>
              <p className="mt-2 text-sm text-smoke-light">{m.detail}</p>
              <p className="mt-4 text-[11px] uppercase tracking-wide2 text-gold transition-colors group-hover:text-gold-light">
                {m.stat} → Gestionar
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
