'use client';

import { useEffect } from 'react';
import type { ProductView } from '@application/dto/ProductView';
import type { Category } from '@domain/entities/Category';
import { useCatalogFilters } from '@presentation/hooks/useCatalogFilters';
import { CatalogToolbar } from './CatalogToolbar';
import { ProductGrid } from '@presentation/components/product/ProductGrid';

/**
 * Componente cliente del catálogo. Recibe los DTOs ya cargados en SERVIDOR
 * (server component) y aplica búsqueda/filtro/orden en cliente para respuesta
 * instantánea. El parámetro inicial `categoria` llega desde la URL.
 *
 * Separación: la página (server) obtiene datos vía CatalogService; este cliente
 * sólo gestiona interacción. Si mañana el filtrado se mueve al backend, se
 * sustituye el hook por una llamada a servicio sin tocar la página.
 */
export function CatalogClient({
  products,
  categories,
  initialCategory
}: {
  products: ProductView[];
  categories: Category[];
  initialCategory?: string;
}) {
  const { search, setSearch, category, setCategory, sort, setSort, results } =
    useCatalogFilters(products);

  // Aplica el filtro de categoría que viene en la URL (?categoria=arabe).
  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory, setCategory]);

  return (
    <div className="space-y-10">
      <CatalogToolbar
        categories={categories}
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
        resultCount={results.length}
      />
      <ProductGrid products={results} />
    </div>
  );
}
