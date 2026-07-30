import type { ProductId, CategoryId } from '@shared/types';
import type { CategoryKind } from './Category';

/** Pirámide olfativa: nuestra firma de marca en la página de producto. */
export interface OlfactoryNotes {
  readonly top: string[];    // notas de salida
  readonly heart: string[];  // notas de corazón
  readonly base: string[];   // notas de fondo
}

/** Concentración de la fragancia. Relevante para perfumería seria. */
export type Concentration = 'Parfum' | 'Eau de Parfum' | 'Eau de Toilette' | 'Extrait';

/**
 * Producto = perfume nuevo y sellado.
 * Sólo se comercializan frascos completos (sin decants/muestras), por eso
 * el modelo NO contempla tamaños fraccionados: un producto = un frasco.
 */
export interface Product {
  readonly id: ProductId;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly categoryId: CategoryId;
  readonly categoryKind: CategoryKind;
  /** Precio en COP (unidades enteras de peso). */
  readonly price: number;
  readonly shortDescription: string;
  readonly description: string;
  readonly images: string[];
  readonly volumeMl: number;
  readonly concentration: Concentration;
  readonly notes: OlfactoryNotes;
  readonly featured: boolean;
  /** Existencias simuladas. En el prototipo no descuenta; prepara el inventario futuro. */
  readonly stock: number;
}

export function isInStock(product: Pick<Product, 'stock'>): boolean {
  return product.stock > 0;
}
