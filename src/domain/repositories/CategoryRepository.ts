import type { Category } from '@domain/entities/Category';

/** Puerto del repositorio de categorías. */
export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findBySlug(slug: string): Promise<Category | null>;
}
