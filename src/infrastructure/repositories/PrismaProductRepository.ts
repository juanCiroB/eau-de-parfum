import type { ProductRepository } from '@domain/repositories/ProductRepository';
import type { Product, Concentration, OlfactoryNotes } from '@domain/entities/Product';
import type { CatalogQuery, SortOption, ProductId } from '@shared/types';
import { CATEGORIES } from '@infrastructure/data/categories';
import { prisma } from '@lib/prisma';

export class PrismaProductRepository implements ProductRepository {
  async findAll(query?: CatalogQuery): Promise<Product[]> {
    const rows = await prisma.product.findMany();
    let products = rows.map((r) => this.toEntity(r));

    if (query?.categorySlug) {
      products = products.filter((p) => {
        const cat = CATEGORIES.find((c) => c.id === p.categoryId);
        return cat?.slug === query.categorySlug;
      });
    }

    if (query?.search) {
      const term = query.search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)
      );
    }

    return this.sort(products, query?.sort ?? 'relevance');
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (!row) return null;
    return this.toEntity(row);
  }

  async findFeatured(limit = 4): Promise<Product[]> {
    const rows = await prisma.product.findMany({
      where: { featured: true },
      take: limit,
      orderBy: { createdAt: 'asc' }
    });
    return rows.map((r) => this.toEntity(r));
  }

  async findRelated(slug: string, limit = 4): Promise<Product[]> {
    const source = await prisma.product.findUnique({ where: { slug } });
    if (!source) return [];
    const rows = await prisma.product.findMany({
      where: { categorySlug: source.categorySlug, slug: { not: slug } },
      take: limit
    });
    return rows.map((r) => this.toEntity(r));
  }

  private toEntity(row: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    categorySlug: string;
    price: number;
    shortDescription: string;
    description: string;
    images: string;
    volumeMl: number;
    concentration: string;
    notes: string;
    featured: boolean;
    stock: number;
  }): Product {
    const cat = CATEGORIES.find((c) => c.slug === row.categorySlug) ?? CATEGORIES[0]!;
    return {
      id: row.id as ProductId,
      slug: row.slug,
      name: row.name,
      brand: row.brand,
      categoryId: cat.id,
      categoryKind: cat.kind,
      price: row.price,
      shortDescription: row.shortDescription,
      description: row.description,
      images: JSON.parse(row.images) as string[],
      volumeMl: row.volumeMl,
      concentration: row.concentration as Concentration,
      notes: JSON.parse(row.notes) as OlfactoryNotes,
      featured: row.featured,
      stock: row.stock
    };
  }

  private sort(products: Product[], sort: SortOption): Product[] {
    const sorted = [...products];
    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      default:
        return sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.stock - a.stock
        );
    }
  }
}
