'use client';

import type { Category } from '@domain/entities/Category';
import type { SortOption } from '@shared/types';
import { SORT_OPTIONS } from '@shared/constants';
import { cn } from '@shared/utils/cn';

interface CatalogToolbarProps {
  categories: Category[];
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategory: (slug: string) => void;
  sort: SortOption;
  onSort: (value: SortOption) => void;
  resultCount: number;
}

export function CatalogToolbar({
  categories,
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
  resultCount
}: CatalogToolbarProps) {
  const chips = [{ slug: 'all', name: 'Todos' }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Búsqueda */}
        <div className="relative w-full lg:max-w-sm">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar por nombre o marca…"
            aria-label="Buscar perfumes"
            className="w-full border border-ivory/15 bg-noir-800 px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:border-ivory/40 focus:outline-none"
          />
        </div>

        {/* Orden */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="whitespace-nowrap text-[11px] uppercase tracking-wide2 text-smoke-light">
            Ordenar
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortOption)}
            className="border border-ivory/15 bg-noir-800 px-4 py-3 text-sm text-ivory focus:border-ivory/40 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-noir-800 text-ivory">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip.slug}
            onClick={() => onCategory(chip.slug)}
            className={cn(
              'border px-4 py-2 text-[11px] uppercase tracking-wide2 transition-colors duration-300',
              category === chip.slug
                ? 'border-gold bg-gold text-noir'
                : 'border-ivory/20 text-smoke-light hover:border-gold hover:text-gold'
            )}
          >
            {chip.name}
          </button>
        ))}
        <span className="ml-auto text-xs text-smoke">
          {resultCount} {resultCount === 1 ? 'fragancia' : 'fragancias'}
        </span>
      </div>
    </div>
  );
}
