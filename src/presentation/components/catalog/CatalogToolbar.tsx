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
  const chips = [
    { slug: 'all', name: 'Todos' },
    ...categories.map((c) => ({ slug: c.slug, name: c.name }))
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Búsqueda */}
        <div className="relative w-full lg:max-w-sm">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-clay"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="6" cy="6" r="4.5" />
              <path d="M9.5 9.5L13 13" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar por nombre o marca…"
            aria-label="Buscar perfumes"
            className="w-full rounded-full bg-bone-200/70 py-3 pl-12 pr-4 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 placeholder:text-clay focus:bg-bone-100 focus:outline-none focus:ring-ink/25"
          />
        </div>

        {/* Orden */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="whitespace-nowrap text-[10px] uppercase tracking-wide2 text-clay-dark"
          >
            Ordenar
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => onSort(e.target.value as SortOption)}
              className="appearance-none rounded-full bg-bone-200/70 py-3 pl-5 pr-11 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] transition-all duration-300 focus:outline-none focus:ring-ink/25"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-clay"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip.slug}
            onClick={() => onCategory(chip.slug)}
            aria-pressed={category === chip.slug}
            className={cn(
              'rounded-full px-4 py-2 text-[10px] uppercase tracking-wide2 transition-all duration-500 ease-haptic active:scale-[0.97]',
              category === chip.slug
                ? 'bg-ink text-bone shadow-lift'
                : 'text-clay-dark ring-1 ring-inset ring-ink/15 hover:bg-ink/[0.04] hover:text-ink'
            )}
          >
            {chip.name}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-clay">
          {resultCount} {resultCount === 1 ? 'fragancia' : 'fragancias'}
        </span>
      </div>
    </div>
  );
}
