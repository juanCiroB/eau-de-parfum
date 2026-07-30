import type { Product } from '@domain/entities/Product';
import type { ProductId, CategoryId } from '@shared/types';

const pid = (v: string) => v as ProductId;
const cid = (v: string) => v as CategoryId;

const fimg = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;

export const PRODUCTS: Product[] = [
  // ─── DISEÑADOR ──────────────────────────────────────────────
  {
    id: pid('p-chanel-no5'),
    slug: 'chanel-no-5-edp',
    name: 'N°5 Eau de Parfum',
    brand: 'Chanel',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 520000,
    shortDescription: 'El perfume más icónico del mundo. Floral aldehídico eterno.',
    description:
      'Creado en 1921 por Ernest Beaux, Chanel N°5 es la fragancia más famosa de la historia. Una sinfonía floral aldehídica de rosa de mayo y jazmín sobre una base cálida de sándalo y vainilla. Intemporalidad pura.',
    images: [fimg(40069)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Aldehídos', 'Neroli', 'Ylang-ylang'],
      heart: ['Rosa de mayo', 'Jazmín', 'Iris'],
      base: ['Sándalo', 'Vetiver', 'Vainilla', 'Almizcle']
    },
    featured: true,
    stock: 14
  },
  {
    id: pid('p-dior-sauvage'),
    slug: 'dior-sauvage-edp',
    name: 'Sauvage EDP',
    brand: 'Dior',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 485000,
    shortDescription: 'Frescura salvaje con especias y maderas. El más vendido del mundo.',
    description:
      'Sauvage EDP es la fragancia masculina más vendida del planeta. Una apertura fresca y especiada de pimienta de Sichuan y bergamota evoluciona hacia un corazón lavandado con un fondo de ámbar gris y cedro de Virginia.',
    images: [fimg(44886)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Pimienta de Sichuan', 'Bergamota'],
      heart: ['Lavanda', 'Geranio', 'Nuez moscada'],
      base: ['Ámbar gris', 'Cedro de Virginia', 'Vetiver']
    },
    featured: true,
    stock: 20
  },
  {
    id: pid('p-armani-acqua'),
    slug: 'giorgio-armani-acqua-di-gio-profumo',
    name: 'Acqua di Giò Profumo',
    brand: 'Giorgio Armani',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 420000,
    shortDescription: 'Mar, incienso y madera. La elegancia acuática masculina definitiva.',
    description:
      'Acqua di Giò Profumo eleva la frescura marina a un nuevo nivel con incienso y pachulí. Una fragancia profunda, marina y masculina que evoca el Mediterráneo al atardecer.',
    images: [fimg(29727)],
    volumeMl: 75,
    concentration: 'Parfum',
    notes: {
      top: ['Bergamota', 'Aceites marinos'],
      heart: ['Incienso', 'Geranio'],
      base: ['Pachulí', 'Vetiver', 'Cypriol']
    },
    featured: false,
    stock: 11
  },
  {
    id: pid('p-ysl-black-opium'),
    slug: 'ysl-black-opium-edp',
    name: 'Black Opium EDP',
    brand: 'Yves Saint Laurent',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 395000,
    shortDescription: 'Café, vainilla y jazmín. La fragancia femenina más adictiva del momento.',
    description:
      'Black Opium es la fragancia femenina que definió la última década. La apertura de café negro y pera da paso a jazmín blanco, culminando en vainilla, pachulí y madera de cachemira.',
    images: [fimg(25324)],
    volumeMl: 90,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Pera', 'Flor de naranjo', 'Mandarina rosada'],
      heart: ['Café', 'Jazmín blanco'],
      base: ['Vainilla', 'Pachulí', 'Madera de cachemira']
    },
    featured: true,
    stock: 16
  },
  {
    id: pid('p-lancome-lavie'),
    slug: 'lancome-la-vie-est-belle-edp',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 410000,
    shortDescription: 'Iris, pralinė y vainilla. La celebración de la felicidad en un frasco.',
    description:
      'La Vie Est Belle es la declaración de que la vida es bella. Un corazón exuberante de iris y jazmín sobre una base gourmand de pralinė y vainilla.',
    images: [fimg(14982)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Grosella negra', 'Pera'],
      heart: ['Iris', 'Jazmín', 'Narcisos'],
      base: ['Pralinė', 'Vainilla', 'Pachulí', 'Musgo de roble']
    },
    featured: true,
    stock: 18
  },
  {
    id: pid('p-paco-1million'),
    slug: 'paco-rabanne-1-million-parfum',
    name: '1 Million Parfum',
    brand: 'Paco Rabanne',
    categoryId: cid('cat-designer'),
    categoryKind: 'designer',
    price: 375000,
    shortDescription: 'Tuberosa, cuero y pachulí. La versión más intensa del ícono dorado.',
    description:
      '1 Million Parfum es la concentración más intensa de la línea 1 Million. La tuberosa y la pimienta rosada abren paso a un corazón de pachulí y cuero, terminando en sándalo y vetiver. Proyección bestial.',
    images: [fimg(60035)],
    volumeMl: 100,
    concentration: 'Parfum',
    notes: {
      top: ['Pimienta rosada', 'Pimienta negra', 'Azafrán'],
      heart: ['Tuberosa', 'Pachulí', 'Cedro'],
      base: ['Vetiver', 'Sándalo', 'Cuero']
    },
    featured: false,
    stock: 13
  },

  // ─── ÁRABE ──────────────────────────────────────────────────
  {
    id: pid('p-tomford-oudwood'),
    slug: 'tom-ford-oud-wood',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    categoryId: cid('cat-arabic'),
    categoryKind: 'arabic',
    price: 890000,
    shortDescription: 'Oud tailandés, sándalo y vetiver. La referencia del lujo oriental moderno.',
    description:
      'Oud Wood de Tom Ford es la puerta de entrada al mundo del oud para quienes buscan elegancia sin estridencia. El oud tailandés se combina con sándalo cremoso, cardamomo especiado y una base de vetiver y tonka.',
    images: [fimg(1826)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Oud de Tailandia', 'Palo de rosa'],
      heart: ['Cardamomo', 'Sándalo', 'Vetiver'],
      base: ['Haba tonka', 'Ámbar', 'Vainilla']
    },
    featured: true,
    stock: 8
  },
  {
    id: pid('p-amouage-interlude'),
    slug: 'amouage-interlude-man',
    name: 'Interlude Man',
    brand: 'Amouage',
    categoryId: cid('cat-arabic'),
    categoryKind: 'arabic',
    price: 750000,
    shortDescription: 'Incienso, oud y resinas. La fragancia árabe más aclamada de la última década.',
    description:
      'Interlude Man de Amouage es un oriental complejo de incienso, orégano y oud que evoluciona hacia un corazón de cuero y pachulí. Una de las fragancias más elogiadas en la comunidad mundial de perfumería.',
    images: [fimg(15294)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Incienso', 'Tomillo', 'Orégano'],
      heart: ['Oud', 'Cuero', 'Pachulí'],
      base: ['Ámbar', 'Resinas de árbol', 'Almizcle']
    },
    featured: false,
    stock: 5
  },
  {
    id: pid('p-rasasi-layuqawam'),
    slug: 'rasasi-la-yuqawam-homme',
    name: 'La Yuqawam Homme',
    brand: 'Rasasi',
    categoryId: cid('cat-arabic'),
    categoryKind: 'arabic',
    price: 280000,
    shortDescription: 'Azafrán, oud y almizcle. El bestseller árabe con proyección brutal.',
    description:
      'La Yuqawam Homme de Rasasi combina notas orientales con una apertura de frambuesa y azafrán, corazón de jazmín y oud, y una base de cuero y almizcle de enorme proyección.',
    images: [fimg(19668)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Frambuesa', 'Azafrán', 'Tomillo'],
      heart: ['Incienso', 'Jazmín', 'Artemisa'],
      base: ['Cuero', 'Gamuza', 'Madera', 'Ámbar']
    },
    featured: true,
    stock: 19
  },
  {
    id: pid('p-alharamain-amberoud'),
    slug: 'al-haramain-amber-oud-gold-edition',
    name: 'Amber Oud Gold Edition',
    brand: 'Al Haramain',
    categoryId: cid('cat-arabic'),
    categoryKind: 'arabic',
    price: 240000,
    shortDescription: 'Oud, melocotón y vainilla. Intensidad oriental a precio excepcional.',
    description:
      'Amber Oud Gold Edition de Al Haramain es el oriental dulce y atemporal que todo amante del oud debería tener. Bergamota y notas verdes abren un corazón de melón, oud y ámbar sobre una base de vainilla.',
    images: [fimg(51816)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Bergamota', 'Notas verdes'],
      heart: ['Melón', 'Piña', 'Oud', 'Ámbar'],
      base: ['Vainilla', 'Almizcle', 'Madera']
    },
    featured: false,
    stock: 22
  },

  // ─── NICHO ──────────────────────────────────────────────────
  {
    id: pid('p-creed-aventus'),
    slug: 'creed-aventus',
    name: 'Aventus',
    brand: 'Creed',
    categoryId: cid('cat-niche'),
    categoryKind: 'niche',
    price: 1250000,
    shortDescription: 'Piña, abedul y ámbar gris. La fragancia de nicho más deseada del mundo.',
    description:
      'Aventus de Creed es la fragancia de nicho por excelencia. Inspirada en Napoleón Bonaparte, abre con piña y frutas negras sobre abedul ahumado, terminando en ámbar gris y almizcle de longevidad excepcional.',
    images: [fimg(9828)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Piña', 'Manzana verde', 'Grosella negra', 'Bergamota'],
      heart: ['Abedul', 'Pachulí', 'Jazmín'],
      base: ['Almizcle', 'Ámbar gris', 'Vainilla', 'Cedro']
    },
    featured: true,
    stock: 6
  },
  {
    id: pid('p-mfk-baccarat'),
    slug: 'maison-francis-kurkdjian-baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    categoryId: cid('cat-niche'),
    categoryKind: 'niche',
    price: 1480000,
    shortDescription: 'Azafrán, ambroxan y cedro. El perfume más copiado y deseado del siglo XXI.',
    description:
      'Baccarat Rouge 540 redefinió la perfumería moderna. El azafrán y el cedro abren paso a ambroxan e incienso mineral que se convierte en una firma olfativa absolutamente irresistible. Ninguna fragancia ha sido más imitada en los últimos diez años.',
    images: [fimg(33519)],
    volumeMl: 70,
    concentration: 'Extrait',
    notes: {
      top: ['Azafrán', 'Cedro'],
      heart: ['Ambroxan', 'Incienso'],
      base: ['Fougère', 'Madera de cedro', 'Almizcle mineral']
    },
    featured: true,
    stock: 4
  }
];
