'use client';

import Link from 'next/link';
import type { CartItem } from '@domain/entities/Cart';
import { lineTotal } from '@domain/entities/Cart';
import { ROUTES } from '@shared/constants';
import { QuantityStepper } from '@presentation/components/ui/QuantityStepper';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';

export function CartLineItem({
  item,
  onQuantity,
  onRemove
}: {
  item: CartItem;
  onQuantity: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex gap-5 py-6">
      <Link
        href={ROUTES.product(item.slug)}
        className="h-32 w-24 shrink-0 overflow-hidden bg-noir-800"
      >
        <ImageWithFallback src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide2 text-gold">{item.brand}</p>
            <Link
              href={ROUTES.product(item.slug)}
              className="font-display text-lg text-ivory transition-colors hover:text-gold"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-smoke">{item.volumeMl} ml</p>
          </div>
          <button
            onClick={onRemove}
            aria-label={`Eliminar ${item.name}`}
            className="h-fit text-xs text-smoke underline-offset-2 hover:text-ivory hover:underline"
          >
            Eliminar
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <QuantityStepper value={item.quantity} onChange={onQuantity} />
          <span className="font-display text-lg tabular-nums text-ivory">
            {lineTotal(item).format()}
          </span>
        </div>
      </div>
    </li>
  );
}
