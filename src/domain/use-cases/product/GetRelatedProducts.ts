import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product } from '@domain/entities/Product';

/** Caso de uso: productos relacionados (misma categoría) para la ficha. */
export class GetRelatedProducts {
  constructor(private readonly products: ProductRepository) {}

  execute(slug: string, limit = 4): Promise<Product[]> {
    return this.products.findRelated(slug, limit);
  }
}
