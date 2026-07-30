import type { Metadata } from 'next';
import { Container } from '@presentation/components/ui/Container';
import { OrderStatusSelect } from '@presentation/components/admin/OrderStatusSelect';
import { statusColor, statusLabel } from '@lib/order-status';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Pedidos · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function formatPrice(n: number) {
  return `$ ${n.toLocaleString('es-CO')}`;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

interface OrderItem {
  name: string;
  brand: string;
  slug: string;
  price: number;
  quantity: number;
}

interface OrderAddress {
  fullName: string;
  phone: string;
  department: string;
  city: string;
  line1: string;
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { fullName: true, email: true } }
    }
  });

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-light text-ivory">Pedidos</h1>
          <p className="mt-1 text-sm text-smoke">{orders.length} pedido{orders.length !== 1 ? 's' : ''} en total</p>
        </div>

        {orders.length === 0 ? (
          <p className="text-smoke">Aún no hay pedidos registrados.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const items = JSON.parse(order.items) as OrderItem[];
              const address = JSON.parse(order.address) as OrderAddress;

              return (
                <div key={order.id} className="border border-ivory/10 bg-noir-800">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/10 px-5 py-3">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-smoke">#{order.id.slice(-8).toUpperCase()}</span>
                      <span className="text-[11px] text-smoke">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium ${statusColor(order.status)}`}>
                        {statusLabel(order.status)}
                      </span>
                      <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                    </div>
                  </div>

                  <div className="grid gap-4 px-5 py-4 sm:grid-cols-3">
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-wide2 text-smoke">Cliente</p>
                      {order.user ? (
                        <>
                          <p className="text-sm text-ivory">{order.user.fullName}</p>
                          <p className="text-xs text-smoke">{order.user.email}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-ivory">{address.fullName}</p>
                          <p className="text-xs text-smoke">Sin cuenta</p>
                        </>
                      )}
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-wide2 text-smoke">Envío</p>
                      <p className="text-sm text-ivory">{address.line1}</p>
                      <p className="text-xs text-smoke">{address.city}, {address.department}</p>
                      <p className="text-xs text-smoke">{address.phone}</p>
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-wide2 text-smoke">Productos</p>
                      {items.map((item, i) => (
                        <p key={i} className="text-sm text-ivory">
                          {item.quantity}× {item.name}
                          <span className="ml-2 text-xs text-smoke">{formatPrice(item.price)}</span>
                        </p>
                      ))}
                      <p className="mt-2 text-sm font-medium text-gold">Total: {formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
