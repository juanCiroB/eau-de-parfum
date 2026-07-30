import type { Product } from '@domain/entities/Product';
import type { CatalogQuery } from '@shared/types';

/**
 * Puerto (interfaz) del repositorio de productos.
 * El dominio depende de ESTA abstracción, nunca de una implementación concreta.
 * Hoy la implementa InMemoryProductRepository; mañana, un HttpProductRepository
 * que consuma la API real. Ninguna otra capa se entera del cambio.
 */
export interface ProductRepository {
  findAll(query?: CatalogQuery): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findFeatured(limit?: number): Promise<Product[]>;
  findRelated(slug: string, limit?: number): Promise<Product[]>;
}
