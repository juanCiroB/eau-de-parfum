import Link from 'next/link';
import type { ProductView } from '@application/dto/ProductView';
import { ROUTES } from '@shared/constants';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';

export function ProductCard({ product }: { product: ProductView }) {
  return (
    <Link
      href={ROUTES.product(product.slug)}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-noir-800">
        <ImageWithFallback
          src={product.images[0] ?? ''}
          alt={`${product.brand} — ${product.name}`}
          className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 bg-noir/90 px-2 py-1 text-[10px] uppercase tracking-wide2 text-ivory">
            Agotado
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gold/90 py-3 text-center text-[11px] uppercase tracking-wide2 text-noir transition-transform duration-300 group-hover:translate-y-0">
          Ver fragancia →
        </div>
      </div>
      <div className="pt-4">
        <Eyebrow tone="smoke">{product.brand}</Eyebrow>
        <h3 className="mt-1 font-display text-lg font-light text-ivory transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-smoke">{product.shortDescription}</p>
        <p className="mt-2 text-sm tracking-wide text-smoke-light">{product.priceLabel}</p>
      </div>
    </Link>
  );
}
