import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product } from '@domain/entities/Product';
import type { CatalogQuery, SortOption } from '@shared/types';
import { PRODUCTS } from '@infrastructure/data/products';
import { CATEGORIES } from '@infrastructure/data/categories';

/**
 * Adaptador de repositorio en memoria. Implementa el puerto ProductRepository
 * usando los datos simulados. Aquí vive la lógica de filtrado/orden/búsqueda
 * que en producción ejecutaría el backend (query params -> SQL).
 *
 * Para migrar a backend real: crear HttpProductRepository con la misma interfaz
 * y cambiar UNA línea en el composition root. Nada más se modifica.
 */
export class InMemoryProductRepository implements ProductRepository {
  // Simula latencia de red para que el prototipo se comporte como producción.
  private readonly latencyMs = 0;

  async findAll(query?: CatalogQuery): Promise<Product[]> {
    await this.delay();
    let result = [...PRODUCTS];

    if (query?.categorySlug) {
      const category = CATEGORIES.find((c) => c.slug === query.categorySlug);
      if (category) result = result.filter((p) => p.categoryId === category.id);
    }

    if (query?.search) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)
      );
    }

    return this.sort(result, query?.sort ?? 'relevance');
  }

  async findBySlug(slug: string): Promise<Product | null> {
    await this.delay();
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  async findFeatured(limit = 4): Promise<Product[]> {
    await this.delay();
    return PRODUCTS.filter((p) => p.featured).slice(0, limit);
  }

  async findRelated(slug: string, limit = 4): Promise<Product[]> {
    await this.delay();
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.categoryId === product.categoryId && p.slug !== slug
    ).slice(0, limit);
  }

  private sort(products: Product[], sort: SortOption): Product[] {
    const sorted = [...products];
    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      case 'relevance':
      default:
        // Relevancia: destacados primero, luego por stock disponible.
        return sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.stock - a.stock
        );
    }
  }

  private delay(): Promise<void> {
    if (this.latencyMs === 0) return Promise.resolve();
    return new Promise((r) => setTimeout(r, this.latencyMs));
  }
}
