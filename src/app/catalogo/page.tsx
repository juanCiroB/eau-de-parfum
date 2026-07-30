import type { Metadata } from 'next';
import { getCatalogService } from '@infrastructure/container';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { CatalogClient } from '@presentation/components/catalog/CatalogClient';

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Explora perfumes de diseñador, árabes y de nicho. Nuevos y sellados.'
};

/**
 * Página de catálogo (Server Component). Carga catálogo y categorías en el
 * servidor y entrega el filtrado interactivo al CatalogClient. El filtro
 * inicial de categoría llega por query param (?categoria=arabe), p. ej. desde
 * las tarjetas de categoría de la Home.
 */
export default async function CatalogPage({
  searchParams
}: {
  searchParams: { categoria?: string };
}) {
  const catalog = getCatalogService();
  const [products, categories] = await Promise.all([
    catalog.listProducts(),
    catalog.listCategories()
  ]);

  return (
    <div className="py-14 lg:py-20">
      <Container>
        <header className="mb-12 max-w-2xl">
          <Eyebrow className="mb-4">Catálogo</Eyebrow>
          <h1 className="font-display text-4xl font-light leading-tight text-ivory sm:text-5xl">
            Toda la colección
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-smoke-light">
            Una selección curada de fragancias nuevas y selladas. Filtra por
            categoría, busca por nombre o marca y ordena según tu preferencia.
          </p>
        </header>

        <CatalogClient
          products={products}
          categories={categories}
          initialCategory={searchParams.categoria}
        />
      </Container>
    </div>
  );
}
