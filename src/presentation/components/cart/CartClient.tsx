'use client';

import Link from 'next/link';
import { useCart } from '@presentation/hooks/useCart';
import { ROUTES } from '@shared/constants';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export function CartClient() {
  const { hydrated, items, count, subtotal, setQuantity, remove, clear } = useCart();

  // Esqueleto con la forma real del contenido, no un spinner genérico.
  if (!hydrated) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="h-11 w-full animate-pulse rounded-full bg-ink/[0.06]" />
          <ul className="mt-6 space-y-6">
            {[0, 1].map((i) => (
              <li key={i} className="flex gap-5">
                <div className="h-32 w-24 shrink-0 animate-pulse rounded-core bg-ink/[0.06]" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-ink/[0.06]" />
                  <div className="h-5 w-48 animate-pulse rounded-full bg-ink/[0.06]" />
                  <div className="h-3 w-16 animate-pulse rounded-full bg-ink/[0.06]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-72 animate-pulse rounded-shell bg-ink/[0.05]" />
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="flex items-center justify-between border-b border-ink/[0.09] pb-5">
          <h2 className="font-display text-xl font-light text-ink">
            <span className="font-mono text-base">{count}</span>{' '}
            {count === 1 ? 'artículo' : 'artículos'}
          </h2>
          <button
            onClick={clear}
            className="text-xs text-clay underline-offset-4 transition-colors duration-300 hover:text-terra hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        <ul className="divide-y divide-ink/[0.08]">
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
          className="group mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:text-terra"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-haptic group-hover:-translate-x-1"
          >
            ←
          </span>
          Seguir explorando
        </Link>
      </div>

      <CartSummary subtotal={subtotal} itemCount={count} />
    </div>
  );
}
