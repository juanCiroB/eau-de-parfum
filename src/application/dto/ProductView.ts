import type { ProductId } from '@shared/types';
import type { Concentration, OlfactoryNotes } from '@domain/entities/Product';

/**
 * DTO de presentación: la forma "lista para la UI" de un producto.
 * Aísla a los componentes de la entidad de dominio: si la entidad cambia,
 * sólo se ajusta el mapper, no cada componente. Incluye el precio ya formateado.
 */
export interface ProductView {
  id: ProductId;
  slug: string;
  name: string;
  brand: string;
  categoryName: string;
  categorySlug: string;
  price: number;
  priceLabel: string; // "$ 480.000"
  shortDescription: string;
  description: string;
  images: string[];
  volumeMl: number;
  concentration: Concentration;
  notes: OlfactoryNotes;
  inStock: boolean;
}
