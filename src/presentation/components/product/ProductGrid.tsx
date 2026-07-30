import type { ProductView } from '@application/dto/ProductView';
import { ProductCard } from './ProductCard';
import { Reveal } from '@presentation/components/ui/Reveal';

/** Grilla responsive de productos, con estado vacío compuesto. */
export function ProductGrid({ products }: { products: ProductView[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-shell bg-bone-200/60 px-6 py-24 text-center ring-1 ring-inset ring-ink/[0.06]">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-clay-light"
          aria-hidden="true"
        >
          <circle cx="17" cy="17" r="12" />
          <path d="M26 26l11 11" strokeLinecap="round" />
          <path d="M12 17h10" strokeLinecap="round" strokeDasharray="2 3" />
        </svg>
        <div>
          <p className="font-display text-2xl font-light text-ink">Sin resultados</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-clay-dark">
            Ajusta la búsqueda o los filtros para ver más fragancias.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 80}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
