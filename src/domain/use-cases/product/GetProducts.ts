import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product } from '@domain/entities/Product';
import type { CatalogQuery } from '@shared/types';

/**
 * Caso de uso: listar productos del catálogo aplicando búsqueda, filtro y orden.
 * Recibe el repositorio por inyección: no sabe si los datos vienen de memoria,
 * de una API REST o de GraphQL.
 */
export class GetProducts {
  constructor(private readonly products: ProductRepository) {}

  execute(query?: CatalogQuery): Promise<Product[]> {
    return this.products.findAll(query);
  }
}
