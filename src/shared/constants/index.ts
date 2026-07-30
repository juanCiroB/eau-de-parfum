import type { SortOption } from '@shared/types';

/** Configuración del sitio. Centraliza textos de marca y datos de contacto. */
export const SITE = {
  name: 'EAU DE PARFUM',
  tagline: 'Fragancias selladas. Originalidad garantizada.',
  description:
    'Perfumería de diseñador, árabe y nicho. Productos nuevos y sellados, con envío a toda Colombia.',
  country: 'Colombia',
  contact: {
    email: 'hola@eaudeparfum.co',
    whatsapp: '+57 300 000 0000',
    city: 'Medellín, Colombia'
  },
  social: {
    instagram: 'https://www.instagram.com/eaudeparfum00?igsh=OHFhZjVrMzVlbWp0'
  }
} as const;

/** Rutas centralizadas: nunca se escriben strings de URL sueltos en componentes. */
export const ROUTES = {
  home: '/',
  catalog: '/catalogo',
  cart: '/carrito',
  product: (slug: string) => `/producto/${slug}`,
  categoryFilter: (slug: string) => `/catalogo?categoria=${slug}`,
  login: '/login',
  register: '/registro',
  forgotPassword: '/recuperar',
  resetPassword: '/nueva-contrasena',
  verifyEmail: '/verificar',
  myOrders: '/cuenta/pedidos',
  admin: '/admin',
  adminSettings: '/admin/configuracion'
} as const;

/**
 * Las tres categorías del negocio. Se definen como datos (no enum rígido)
 * para que el panel administrativo futuro pueda gestionarlas vía repositorio.
 */
export const CATEGORY_SLUGS = {
  designer: 'disenador',
  arabic: 'arabe',
  niche: 'nicho'
} as const;

export const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' }
];
