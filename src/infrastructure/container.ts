import { PrismaProductRepository } from '@infrastructure/repositories/PrismaProductRepository';
import { InMemoryCategoryRepository } from '@infrastructure/repositories/InMemoryCategoryRepository';
import { CatalogService } from '@application/services/CatalogService';

let catalogServiceInstance: CatalogService | null = null;

export function getCatalogService(): CatalogService {
  if (!catalogServiceInstance) {
    const productRepository = new PrismaProductRepository();
    const categoryRepository = new InMemoryCategoryRepository();
    catalogServiceInstance = new CatalogService(productRepository, categoryRepository);
  }
  return catalogServiceInstance;
}
