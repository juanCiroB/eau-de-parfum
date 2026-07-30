import type { CategoryRepository } from '@domain/repositories/CategoryRepository';
import type { Category } from '@domain/entities/Category';
import { CATEGORIES } from '@infrastructure/data/categories';

/** Adaptador en memoria del puerto CategoryRepository. */
export class InMemoryCategoryRepository implements CategoryRepository {
  async findAll(): Promise<Category[]> {
    return [...CATEGORIES];
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return CATEGORIES.find((c) => c.slug === slug) ?? null;
  }
}
