import type { Category } from '@domain/entities/Category';
import type { CategoryId } from '@shared/types';
import { CATEGORY_SLUGS } from '@shared/constants';

const id = (value: string) => value as CategoryId;

/**
 * Datos simulados de categorías. En producción provienen del repositorio HTTP.
 * Imágenes de demostración vía Unsplash (se reemplazan por el CDN propio).
 */
export const CATEGORIES: Category[] = [
  {
    id: id('cat-designer'),
    slug: CATEGORY_SLUGS.designer,
    name: 'Diseñador',
    kind: 'designer',
    description:
      'Las casas de moda más reconocidas del mundo. Fragancias versátiles para el día a día.',
    imageUrl:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: id('cat-arabic'),
    slug: CATEGORY_SLUGS.arabic,
    name: 'Árabe',
    kind: 'arabic',
    description:
      'Oud, ámbar y especias. Estelas intensas y duraderas de la perfumería de Medio Oriente.',
    imageUrl:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: id('cat-niche'),
    slug: CATEGORY_SLUGS.niche,
    name: 'Nicho',
    kind: 'niche',
    description:
      'Creaciones de autor, producción limitada y composiciones que no buscan agradar a todos.',
    imageUrl:
      'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1200&q=80'
  }
];
