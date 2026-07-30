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
    <div className="py-10 lg:py-16">
      <Container>
        {/* Migas de pan */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-smoke">
          <Link href={ROUTES.home} className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={ROUTES.catalog} className="hover:text-gold transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-smoke-light">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Galería */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Información */}
          <div className="lg:py-4">
            <Eyebrow className="mb-3">{product.categoryName}</Eyebrow>
            <p className="text-sm uppercase tracking-wide2 text-smoke-light">{product.brand}</p>
            <h1 className="mt-2 font-display text-4xl font-light leading-tight text-ivory sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <span className="font-display text-3xl text-ivory">{product.priceLabel}</span>
              <span className="text-xs uppercase tracking-wide2 text-smoke">
                {product.volumeMl} ml · {product.concentration}
              </span>
            </div>

            <p className="mt-2 text-xs uppercase tracking-wide2">
              {product.inStock ? (
                <span className="text-gold">Disponible · Nuevo y sellado</span>
              ) : (
                <span className="text-smoke">Agotado temporalmente</span>
              )}
            </p>

            <div className="my-7 h-px bg-ivory/10" />

            <p className="text-sm leading-relaxed text-smoke-light">{product.description}</p>

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            {/* Pirámide olfativa */}
            <div className="mt-12 bg-noir-800 p-7 border border-ivory/8">
              <Eyebrow className="mb-5">Pirámide olfativa</Eyebrow>
              <NotesPyramid notes={product.notes} />
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-2xl font-light text-ivory sm:text-3xl">
                También podría gustarle
              </h2>
              <Link
                href={ROUTES.catalog}
                className="text-[11px] uppercase tracking-wide2 text-smoke-light hover:text-gold transition-colors"
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
