import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product } from '@domain/entities/Product';

/** Caso de uso: productos destacados para la home. */
export class GetFeaturedProducts {
  constructor(private readonly products: ProductRepository) {}

  execute(limit = 4): Promise<Product[]> {
    return this.products.findFeatured(limit);
  }
}
