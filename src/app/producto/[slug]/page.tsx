import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatalogService } from '@infrastructure/container';
import { ROUTES } from '@shared/constants';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ProductGallery } from '@presentation/components/product/ProductGallery';
import { NotesPyramid } from '@presentation/components/product/NotesPyramid';
import { AddToCartButton } from '@presentation/components/product/AddToCartButton';
import { ProductGrid } from '@presentation/components/product/ProductGrid';

export async function generateStaticParams() {
  const products = await getCatalogService().listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getCatalogService().productDetail(params.slug);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.shortDescription
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const catalog = getCatalogService();
  const product = await catalog.productDetail(params.slug);
  if (!product) notFound();

  const related = await catalog.relatedProducts(params.slug, 4);

  return (
    <div className="py-12 lg:py-16">
      <Container>
        {/* Migas de pan */}
        <nav
          aria-label="Ruta de navegación"
          className="mb-10 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide2 text-clay"
        >
          <Link href={ROUTES.home} className="underline-grow transition-colors duration-300 hover:text-ink">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={ROUTES.catalog} className="underline-grow transition-colors duration-300 hover:text-ink">
            Catálogo
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-clay-dark">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Galería */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Información */}
          <div className="lg:py-4">
            <Eyebrow className="mb-5">{product.categoryName}</Eyebrow>
            <p className="text-[11px] uppercase tracking-luxe text-clay-dark">{product.brand}</p>
            <h1 className="mt-2.5 font-display text-[2.5rem] font-light leading-[1.02] tracking-tighter2 text-ink sm:text-[3.25rem]">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-mono text-2xl text-ink">{product.priceLabel}</span>
              <span className="text-[11px] uppercase tracking-wide2 text-clay">
                {product.volumeMl} ml · {product.concentration}
              </span>
            </div>

            {/* Disponibilidad con punto de estado, no solo color de texto. */}
            <p className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  product.inStock ? 'bg-terra' : 'bg-clay-light'
                }`}
              />
              {product.inStock ? (
                <span className="text-terra">Disponible · Nuevo y sellado</span>
              ) : (
                <span className="text-clay">Agotado temporalmente</span>
              )}
            </p>

            <div className="my-8 h-px bg-ink/[0.09]" />

            <p className="max-w-prose2 text-[0.9375rem] leading-relaxed text-clay-dark">
              {product.description}
            </p>

            <div className="mt-9">
              <AddToCartButton product={product} />
            </div>

            {/* Pirámide olfativa */}
            <div className="mt-14 rounded-shell bg-bone-200/70 p-8 ring-1 ring-inset ring-ink/[0.06]">
              <Eyebrow className="mb-7">Pirámide olfativa</Eyebrow>
              <NotesPyramid notes={product.notes} />
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-28">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="font-display text-[1.75rem] font-light tracking-tighter2 text-ink sm:text-4xl">
                También podría gustarle
              </h2>
              <Link
                href={ROUTES.catalog}
                className="underline-grow shrink-0 text-[10px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:text-terra"
              >
                Ver todo
              </Link>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </Container>
    </div>
  );
}
