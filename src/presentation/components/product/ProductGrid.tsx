import type { ProductView } from '@application/dto/ProductView';
import { ProductCard } from './ProductCard';

/** Grilla responsive de productos. */
export function ProductGrid({ products }: { products: ProductView[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-noir/15 py-20 text-center">
        <p className="font-display text-xl text-noir">Sin resultados</p>
        <p className="mt-2 text-sm text-smoke-dark">
          Ajusta la búsqueda o los filtros para ver más fragancias.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
