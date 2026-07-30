import type { CategoryId } from '@shared/types';

/** Tipo de categoría del negocio. Sólo estas tres existen por ahora. */
export type CategoryKind = 'designer' | 'arabic' | 'niche';

/**
 * Categoría de perfumes. Entidad de dominio pura.
 * Modelada como datos gestionables (no enum cerrado) para que el panel
 * administrativo futuro pueda crear/editar categorías vía repositorio.
 */
export interface Category {
  readonly id: CategoryId;
  readonly slug: string;
  readonly name: string;
  readonly kind: CategoryKind;
  readonly description: string;
  readonly imageUrl: string;
}
