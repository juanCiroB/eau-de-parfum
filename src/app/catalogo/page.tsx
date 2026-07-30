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
    <div className="py-16 lg:py-24">
      <Container>
        <header className="mb-14 max-w-2xl">
          <Eyebrow className="mb-6">Catálogo</Eyebrow>
          <h1 className="font-display text-[2.5rem] font-light leading-[1.02] tracking-tighter2 text-ink sm:text-[3.5rem]">
            Toda la <span className="italic text-terra">colección</span>
          </h1>
          <p className="mt-5 max-w-prose2 text-[0.9375rem] leading-relaxed text-clay-dark">
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
