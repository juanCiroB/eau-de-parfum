import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Mis pedidos',
  robots: { index: false }
};

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<string, string> = {
  PENDING:   'Pendiente',
  PACKED:    'Empacado',
  SHIPPED:   'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado'
};

const STATUS_COLOR: Record<string, string> = {
  PENDING:   'text-amber-400',
  PACKED:    'text-blue-400',
  SHIPPED:   'text-sky-400',
  DELIVERED: 'text-green-400',
  CANCELLED: 'text-red-400'
};

interface OrderItem {
  name: string;
  brand: string;
  slug: string;
  price: number;
  quantity: number;
}

function formatPrice(n: number) {
  return `$ ${n.toLocaleString('es-CO')}`;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(d);
}

export default async function MisPedidosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect(ROUTES.login);

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="py-14 lg:py-20">
      <Container>
        <header className="mb-10">
          <Eyebrow className="mb-4">Mi cuenta</Eyebrow>
          <h1 className="font-display text-4xl font-light text-ivory sm:text-5xl">
            Mis pedidos
          </h1>
          <p className="mt-3 text-sm text-smoke-light">
            Hola, <span className="text-ivory">{session.user.name}</span>.
            {orders.length > 0
              ? ` Tienes ${orders.length} pedido${orders.length !== 1 ? 's' : ''} registrado${orders.length !== 1 ? 's' : ''}.`
              : ' Aún no tienes pedidos.'}
          </p>
        </header>

        {orders.length === 0 ? (
          <div className="border border-ivory/10 bg-noir-800 px-8 py-16 text-center">
            <p className="font-display text-2xl font-light text-ivory">Sin pedidos aún</p>
            <p className="mt-3 text-sm text-smoke-light">
              Cuando realices tu primera compra aparecerá aquí.
            </p>
            <Link
              href={ROUTES.catalog}
              className="mt-8 inline-block bg-gold px-8 py-3 text-xs uppercase tracking-widest text-noir transition-colors hover:bg-gold-light"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const items = JSON.parse(order.items) as OrderItem[];
              const statusLabel = STATUS_LABEL[order.status] ?? order.status;
              const statusColor = STATUS_COLOR[order.status] ?? 'text-smoke';

              return (
                <article
                  key={order.id}
                  className="border border-ivory/10 bg-noir-800"
                >
                  {/* Cabecera del pedido */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 px-5 py-4">
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[11px] text-smoke">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-smoke">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <span className={`text-xs font-medium uppercase tracking-wide ${statusColor}`}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Productos del pedido */}
                  <div className="divide-y divide-ivory/5">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={ROUTES.product(item.slug)}
                            className="text-sm font-medium text-ivory transition-colors hover:text-gold line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-0.5 text-[11px] text-smoke">{item.brand}</p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="text-xs text-smoke">
                            Cant. {item.quantity}
                          </span>
                          <span className="tabular-nums text-sm text-ivory">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pie: total */}
                  <div className="flex items-center justify-between border-t border-ivory/10 px-5 py-4">
                    <span className="text-[11px] uppercase tracking-widest text-smoke">
                      Total del pedido
                    </span>
                    <span className="font-display text-xl text-gold">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={ROUTES.catalog}
            className="text-[11px] uppercase tracking-widest text-smoke-light transition-colors hover:text-gold"
          >
            ← Seguir comprando
          </Link>
        </div>
      </Container>
    </div>
  );
}
