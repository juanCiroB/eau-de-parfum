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
    <li className="flex gap-5 py-7">
      <Link
        href={ROUTES.product(item.slug)}
        className="group h-32 w-24 shrink-0 overflow-hidden rounded-core bg-bone-200 ring-1 ring-inset ring-ink/[0.06]"
      >
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain p-2.5 transition-transform duration-700 ease-haptic group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-terra">{item.brand}</p>
            <Link
              href={ROUTES.product(item.slug)}
              className="underline-grow mt-1 inline-block font-display text-lg font-light text-ink"
            >
              {item.name}
            </Link>
            <p className="mt-1 font-mono text-[11px] text-clay">{item.volumeMl} ml</p>
          </div>
          <button
            onClick={onRemove}
            aria-label={`Eliminar ${item.name}`}
            className="h-fit text-xs text-clay underline-offset-4 transition-colors duration-300 hover:text-terra hover:underline"
          >
            Eliminar
          </button>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <QuantityStepper value={item.quantity} onChange={onQuantity} />
          <span className="font-mono text-base text-ink">{lineTotal(item).format()}</span>
        </div>
      </div>
    </li>
  );
}
