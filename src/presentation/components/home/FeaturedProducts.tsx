import Link from 'next/link';
import type { ProductView } from '@application/dto/ProductView';
import { Container } from '@presentation/components/ui/Container';
import { SectionHeading } from '@presentation/components/ui/SectionHeading';
import { Button } from '@presentation/components/ui/Button';
import { ROUTES } from '@shared/constants';

export function FeaturedProducts({ products }: { products: ProductView[] }) {
  return (
    <section className="bg-noir-700 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Selección de la casa"
          title="Fragancias más deseadas"
          intro="Las referencias que nuestros clientes más buscan. Originales selladas, despacho inmediato."
        />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={ROUTES.product(product.slug)}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {/* Imagen con fondo oscuro */}
              <div className="relative aspect-[3/4] overflow-hidden bg-noir-800">
                <img
                  src={product.images[0] ?? ''}
                  alt={`${product.brand} — ${product.name}`}
                  className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
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

              {/* Info */}
              <div className="pt-4">
                <p className="text-[10px] uppercase tracking-luxe text-gold">{product.brand}</p>
                <h3 className="mt-1 font-display text-base font-light text-ivory transition-colors group-hover:text-gold">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-smoke">
                  {product.shortDescription}
                </p>
                <p className="mt-2 text-sm font-medium tracking-wide text-smoke-light">
                  {product.priceLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href={ROUTES.catalog}>
            <Button variant="outline">Ver todo el catálogo</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
