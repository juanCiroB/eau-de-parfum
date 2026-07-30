import Link from 'next/link';
import type { ProductView } from '@application/dto/ProductView';
import { ROUTES } from '@shared/constants';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';

/**
 * Ficha de producto. Sin borde ni sombra permanente: la elevación aparece solo
 * al pasar el cursor, cuando comunica algo.
 */
export function ProductCard({ product }: { product: ProductView }) {
  return (
    <Link
      href={ROUTES.product(product.slug)}
      className="group block rounded-shell focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
    >
      {/* Bisel doble: bandeja de papel + núcleo con la pieza. */}
      <div className="relative overflow-hidden rounded-shell bg-bone-200 p-1.5 ring-1 ring-inset ring-ink/[0.06] transition-all duration-700 ease-haptic group-hover:shadow-lift">
        <div className="relative aspect-[3/4] overflow-hidden rounded-core bg-bone-100">
          <ImageWithFallback
            src={product.images[0] ?? ''}
            alt={`${product.brand} — ${product.name}`}
            className="h-full w-full object-contain p-5 transition-transform duration-[1100ms] ease-haptic group-hover:scale-[1.06]"
          />

          {!product.inStock && (
            <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-bone">
              Agotado
            </span>
          )}

          {/* Acción que emerge desde el borde inferior. */}
          <span className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-[130%] items-center justify-between rounded-full bg-ink px-4 py-2 text-[10px] uppercase tracking-wide2 text-bone opacity-0 transition-all duration-500 ease-haptic group-hover:translate-y-0 group-hover:opacity-100">
            Ver fragancia
            <span aria-hidden="true" className="text-[11px]">
              ↗
            </span>
          </span>
        </div>
      </div>

      <div className="px-1 pt-4">
        <p className="text-[10px] uppercase tracking-luxe text-terra">{product.brand}</p>
        <h3 className="mt-1.5 font-display text-lg font-light leading-snug tracking-tighter2 text-ink">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-clay">{product.shortDescription}</p>
        <p className="mt-2.5 font-mono text-sm text-ink">{product.priceLabel}</p>
      </div>
    </Link>
  );
}
