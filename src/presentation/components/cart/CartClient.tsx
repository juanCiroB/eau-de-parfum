'use client';

import Link from 'next/link';
import { useCart } from '@presentation/hooks/useCart';
import { ROUTES } from '@shared/constants';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export function CartClient() {
  const { hydrated, items, count, subtotal, setQuantity, remove, clear } = useCart();

  if (!hydrated) {
    return <div className="py-24 text-center text-sm text-smoke-light">Cargando carrito…</div>;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
          <h2 className="font-display text-xl text-ivory">
            {count} {count === 1 ? 'artículo' : 'artículos'}
          </h2>
          <button
            onClick={clear}
            className="text-xs text-smoke underline-offset-2 hover:text-ivory hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        <ul className="divide-y divide-ivory/10">
          {items.map((item) => (
            <CartLineItem
              key={item.productId}
              item={item}
              onQuantity={(q) => setQuantity(item.productId, q)}
              onRemove={() => remove(item.productId)}
            />
          ))}
        </ul>

        <Link
          href={ROUTES.catalog}
          className="mt-6 inline-block text-xs uppercase tracking-wide2 text-smoke-light underline-offset-4 hover:text-gold hover:underline"
        >
          ← Seguir explorando
        </Link>
      </div>

      <CartSummary subtotal={subtotal} itemCount={count} />
    </div>
  );
}
