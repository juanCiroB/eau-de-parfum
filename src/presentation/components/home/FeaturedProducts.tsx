import Link from 'next/link';
import type { ProductView } from '@application/dto/ProductView';
import { Container } from '@presentation/components/ui/Container';
import { SectionHeading } from '@presentation/components/ui/SectionHeading';
import { Button } from '@presentation/components/ui/Button';
import { Reveal } from '@presentation/components/ui/Reveal';
import { ProductCard } from '@presentation/components/product/ProductCard';
import { ROUTES } from '@shared/constants';

export function FeaturedProducts({ products }: { products: ProductView[] }) {
  return (
    <section className="border-y border-ink/[0.08] bg-bone-200/50 py-24 lg:py-32">
      <Container>
        {/* Encabezado a la izquierda, acción a la derecha: sin simetría centrada. */}
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selección de la casa"
            title="Fragancias más deseadas"
            intro="Las referencias que nuestros clientes más buscan. Originales selladas, despacho inmediato."
          />
          <Link href={ROUTES.catalog} className="hidden shrink-0 sm:block">
            <Button variant="outline" size="sm" withArrow>
              Ver todo
            </Button>
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 sm:hidden">
          <Link href={ROUTES.catalog} className="block">
            <Button variant="outline" className="w-full justify-center">
              Ver todo el catálogo
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
