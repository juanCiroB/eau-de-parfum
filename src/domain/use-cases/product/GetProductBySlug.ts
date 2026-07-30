import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product } from '@domain/entities/Product';

/** Caso de uso: obtener el detalle de un producto por su slug. */
export class GetProductBySlug {
  constructor(private readonly products: ProductRepository) {}

  execute(slug: string): Promise<Product | null> {
    return this.products.findBySlug(slug);
  }
}
