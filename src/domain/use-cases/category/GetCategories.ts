import type { CategoryRepository } from '@domain/repositories/CategoryRepository';
import type { Category } from '@domain/entities/Category';

/** Caso de uso: listar categorías (home y filtros del catálogo). */
export class GetCategories {
  constructor(private readonly categories: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categories.findAll();
  }
}
