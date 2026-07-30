import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { CategoryRepository } from '@domain/repositories/CategoryRepository';
import type { Category } from '@domain/entities/Category';
import type { ProductView } from '@application/dto/ProductView';
import type { CatalogQuery } from '@shared/types';

import { GetProducts } from '@domain/use-cases/product/GetProducts';
import { GetProductBySlug } from '@domain/use-cases/product/GetProductBySlug';
import { GetFeaturedProducts } from '@domain/use-cases/product/GetFeaturedProducts';
import { GetRelatedProducts } from '@domain/use-cases/product/GetRelatedProducts';
import { GetCategories } from '@domain/use-cases/category/GetCategories';
import { toProductView } from '@application/mappers/ProductMapper';

/**
 * Servicio de aplicación que orquesta los casos de uso del catálogo y devuelve
 * DTOs listos para la UI. Es la ÚNICA puerta de entrada que usa la capa de
 * presentación para leer catálogo; así la UI no instancia casos de uso sueltos.
 */
export class CatalogService {
  private readonly getProducts: GetProducts;
  private readonly getProductBySlug: GetProductBySlug;
  private readonly getFeatured: GetFeaturedProducts;
  private readonly getRelated: GetRelatedProducts;
  private readonly getCategories: GetCategories;

  constructor(products: ProductRepository, categories: CategoryRepository) {
    this.getProducts = new GetProducts(products);
    this.getProductBySlug = new GetProductBySlug(products);
    this.getFeatured = new GetFeaturedProducts(products);
    this.getRelated = new GetRelatedProducts(products);
    this.getCategories = new GetCategories(categories);
  }

  async listCategories(): Promise<Category[]> {
    return this.getCategories.execute();
  }

  async listProducts(query?: CatalogQuery): Promise<ProductView[]> {
    const [products, categories] = await Promise.all([
      this.getProducts.execute(query),
      this.getCategories.execute()
    ]);
    return products.map((p) =>
      toProductView(p, categories.find((c) => c.id === p.categoryId))
    );
  }

  async featuredProducts(limit = 4): Promise<ProductView[]> {
    const [products, categories] = await Promise.all([
      this.getFeatured.execute(limit),
      this.getCategories.execute()
    ]);
    return products.map((p) =>
      toProductView(p, categories.find((c) => c.id === p.categoryId))
    );
  }

  async productDetail(slug: string): Promise<ProductView | null> {
    const product = await this.getProductBySlug.execute(slug);
    if (!product) return null;
    const categories = await this.getCategories.execute();
    return toProductView(product, categories.find((c) => c.id === product.categoryId));
  }

  async relatedProducts(slug: string, limit = 4): Promise<ProductView[]> {
    const [products, categories] = await Promise.all([
      this.getRelated.execute(slug, limit),
      this.getCategories.execute()
    ]);
    return products.map((p) =>
      toProductView(p, categories.find((c) => c.id === p.categoryId))
    );
  }
}
