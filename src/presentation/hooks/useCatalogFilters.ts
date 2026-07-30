'use client';

import { useMemo, useState } from 'react';
import type { ProductView } from '@application/dto/ProductView';
import type { SortOption } from '@shared/types';

/**
 * Hook de filtrado/orden en CLIENTE para el catálogo del prototipo.
 * Trabaja sobre los DTOs ya cargados, dando respuesta instantánea sin red.
 *
 * En producción, estos mismos parámetros viajarían como query params al backend
 * (la lógica ya existe en InMemoryProductRepository, lista para mudarse al server).
 */
export function useCatalogFilters(all: ProductView[]) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('relevance');

  const results = useMemo(() => {
    let list = [...all];
    if (category !== 'all') list = list.filter((p) => p.categorySlug === category);
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)
      );
    }
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      default:
        return list;
    }
  }, [all, search, category, sort]);

  return { search, setSearch, category, setCategory, sort, setSort, results };
}
