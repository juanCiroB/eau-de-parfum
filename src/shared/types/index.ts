/**
 * Tipos transversales reutilizables por todas las capas.
 * No contienen lógica de negocio; sólo contratos de datos primitivos.
 */

/** Resultado explícito para casos de uso: evita lanzar excepciones a la capa de UI. */
export type Result<T, E = AppError> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export interface AppError {
  code: string;
  message: string;
}

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

/** Identificadores de marca (branded types) para no confundir IDs entre entidades. */
export type ProductId = string & { readonly __brand: 'ProductId' };
export type CategoryId = string & { readonly __brand: 'CategoryId' };
export type OrderId = string & { readonly __brand: 'OrderId' };
export type UserId = string & { readonly __brand: 'UserId' };

export type CurrencyCode = 'COP';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc';

export interface CatalogQuery {
  search?: string;
  categorySlug?: string;
  sort?: SortOption;
}
