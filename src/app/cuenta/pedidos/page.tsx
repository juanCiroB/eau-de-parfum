import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { Button } from '@presentation/components/ui/Button';
import { statusLabel, statusColor, statusBarColor } from '@lib/order-status';
import { ROUTES } from '@shared/constants';

export const metadata: Metadata = {
  title: 'Mis pedidos',
  robots: { index: false }
};

export const dynamic = 'force-dynamic';

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
    <div className="py-16 lg:py-20">
      <Container>
        <header className="mb-12">
          <Eyebrow className="mb-6">Mi cuenta</Eyebrow>
          <h1 className="font-display text-[2.5rem] font-light leading-[1.02] tracking-tighter2 text-ink sm:text-[3.25rem]">
            Mis pedidos
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-clay-dark">
            Hola, <span className="text-ink">{session.user.name}</span>.
            {orders.length > 0
              ? ` Tienes ${orders.length} pedido${orders.length !== 1 ? 's' : ''} registrado${orders.length !== 1 ? 's' : ''}.`
              : ' Aún no tienes pedidos.'}
          </p>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-shell bg-bone-200/60 px-8 py-20 text-center ring-1 ring-inset ring-ink/[0.06]">
            <p className="font-display text-2xl font-light tracking-tighter2 text-ink">
              Sin pedidos aún
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-clay-dark">
              Cuando realices tu primera compra aparecerá aquí.
            </p>
            <Link href={ROUTES.catalog} className="mt-9 inline-block">
              <Button variant="primary" withArrow>
                Ver catálogo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const items = JSON.parse(order.items) as OrderItem[];

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-shell bg-bone-200/50 ring-1 ring-inset ring-ink/[0.07]"
                >
                  {/* Cabecera del pedido: la barra de estado tiñe el borde superior. */}
                  <div
                    aria-hidden="true"
                    className={`h-0.5 w-full ${statusBarColor(order.status)}`}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.07] px-6 py-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      <span className="font-mono text-[11px] text-ink">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-clay">{formatDate(order.createdAt)}</span>
                    </div>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wide2 ${statusColor(order.status)}`}
                    >
                      {statusLabel(order.status)}
                    </span>
                  </div>

                  {/* Productos del pedido */}
                  <div className="divide-y divide-ink/[0.06]">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-4">
                        <div className="min-w-0 flex-1">
                          <Link
                            href={ROUTES.product(item.slug)}
                            className="underline-grow line-clamp-1 text-sm font-medium text-ink"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wide2 text-clay">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-6">
                          <span className="font-mono text-xs text-clay">×{item.quantity}</span>
                          <span className="font-mono text-sm text-ink">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pie: total */}
                  <div className="flex items-center justify-between border-t border-ink/[0.07] px-6 py-4">
                    <span className="text-[10px] uppercase tracking-wide2 text-clay-dark">
                      Total del pedido
                    </span>
                    <span className="font-mono text-lg text-ink">{formatPrice(order.total)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href={ROUTES.catalog}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:text-terra"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-haptic group-hover:-translate-x-1"
            >
              ←
            </span>
            Seguir comprando
          </Link>
        </div>
      </Container>
    </div>
  );
}
