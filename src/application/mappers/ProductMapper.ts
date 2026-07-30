import type { Product } from '@domain/entities/Product';
import type { Category } from '@domain/entities/Category';
import type { ProductView } from '@application/dto/ProductView';
import { isInStock } from '@domain/entities/Product';
import { formatMoney } from '@shared/utils/format';

/**
 * Traduce entidades de dominio -> DTO de presentación.
 * Único lugar donde se decide cómo se "ve" un producto en la UI.
 */
export function toProductView(product: Product, category?: Category): ProductView {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    categoryName: category?.name ?? '',
    categorySlug: category?.slug ?? '',
    price: product.price,
    priceLabel: formatMoney(product.price),
    shortDescription: product.shortDescription,
    description: product.description,
    images: product.images,
    volumeMl: product.volumeMl,
    concentration: product.concentration,
    notes: product.notes,
    inStock: isInStock(product)
  };
}
