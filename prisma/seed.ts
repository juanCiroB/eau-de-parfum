import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const fimg = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;

const SEED_PRODUCTS = [
  {
    slug: 'chanel-no-5-edp',
    name: 'N°5 Eau de Parfum',
    brand: 'Chanel',
    categorySlug: 'disenador',
    price: 520000,
    shortDescription: 'El perfume más icónico del mundo. Floral aldehídico eterno.',
    description: 'Creado en 1921 por Ernest Beaux, Chanel N°5 es la fragancia más famosa de la historia. Una sinfonía floral aldehídica de rosa de mayo y jazmín sobre una base cálida de sándalo y vainilla. Intemporalidad pura.',
    images: [fimg(40069)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Aldehídos', 'Neroli', 'Ylang-ylang'], heart: ['Rosa de mayo', 'Jazmín', 'Iris'], base: ['Sándalo', 'Vetiver', 'Vainilla', 'Almizcle'] },
    featured: true,
    stock: 14
  },
  {
    slug: 'dior-sauvage-edp',
    name: 'Sauvage EDP',
    brand: 'Dior',
    categorySlug: 'disenador',
    price: 485000,
    shortDescription: 'Frescura salvaje con especias y maderas. El más vendido del mundo.',
    description: 'Sauvage EDP es la fragancia masculina más vendida del planeta. Una apertura fresca y especiada de pimienta de Sichuan y bergamota evoluciona hacia un corazón lavandado con un fondo de ámbar gris y cedro de Virginia.',
    images: [fimg(44886)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Pimienta de Sichuan', 'Bergamota'], heart: ['Lavanda', 'Geranio', 'Nuez moscada'], base: ['Ámbar gris', 'Cedro de Virginia', 'Vetiver'] },
    featured: true,
    stock: 20
  },
  {
    slug: 'giorgio-armani-acqua-di-gio-profumo',
    name: 'Acqua di Giò Profumo',
    brand: 'Giorgio Armani',
    categorySlug: 'disenador',
    price: 420000,
    shortDescription: 'Mar, incienso y madera. La elegancia acuática masculina definitiva.',
    description: 'Acqua di Giò Profumo eleva la frescura marina a un nuevo nivel con incienso y pachulí. Una fragancia profunda, marina y masculina que evoca el Mediterráneo al atardecer.',
    images: [fimg(29727)],
    volumeMl: 75,
    concentration: 'Parfum',
    notes: { top: ['Bergamota', 'Aceites marinos'], heart: ['Incienso', 'Geranio'], base: ['Pachulí', 'Vetiver', 'Cypriol'] },
    featured: false,
    stock: 11
  },
  {
    slug: 'ysl-black-opium-edp',
    name: 'Black Opium EDP',
    brand: 'Yves Saint Laurent',
    categorySlug: 'disenador',
    price: 395000,
    shortDescription: 'Café, vainilla y jazmín. La fragancia femenina más adictiva del momento.',
    description: 'Black Opium es la fragancia femenina que definió la última década. La apertura de café negro y pera da paso a jazmín blanco, culminando en vainilla, pachulí y madera de cachemira.',
    images: [fimg(25324)],
    volumeMl: 90,
    concentration: 'Eau de Parfum',
    notes: { top: ['Pera', 'Flor de naranjo', 'Mandarina rosada'], heart: ['Café', 'Jazmín blanco'], base: ['Vainilla', 'Pachulí', 'Madera de cachemira'] },
    featured: true,
    stock: 16
  },
  {
    slug: 'lancome-la-vie-est-belle-edp',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    categorySlug: 'disenador',
    price: 410000,
    shortDescription: 'Iris, pralinė y vainilla. La celebración de la felicidad en un frasco.',
    description: 'La Vie Est Belle es la declaración de que la vida es bella. Un corazón exuberante de iris y jazmín sobre una base gourmand de pralinė y vainilla.',
    images: [fimg(14982)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Grosella negra', 'Pera'], heart: ['Iris', 'Jazmín', 'Narcisos'], base: ['Pralinė', 'Vainilla', 'Pachulí', 'Musgo de roble'] },
    featured: true,
    stock: 18
  },
  {
    slug: 'paco-rabanne-1-million-parfum',
    name: '1 Million Parfum',
    brand: 'Paco Rabanne',
    categorySlug: 'disenador',
    price: 375000,
    shortDescription: 'Tuberosa, cuero y pachulí. La versión más intensa del ícono dorado.',
    description: '1 Million Parfum es la concentración más intensa de la línea 1 Million. La tuberosa y la pimienta rosada abren paso a un corazón de pachulí y cuero, terminando en sándalo y vetiver.',
    images: [fimg(60035)],
    volumeMl: 100,
    concentration: 'Parfum',
    notes: { top: ['Pimienta rosada', 'Pimienta negra', 'Azafrán'], heart: ['Tuberosa', 'Pachulí', 'Cedro'], base: ['Vetiver', 'Sándalo', 'Cuero'] },
    featured: false,
    stock: 13
  },
  {
    slug: 'tom-ford-oud-wood',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    categorySlug: 'arabe',
    price: 890000,
    shortDescription: 'Oud tailandés, sándalo y vetiver. La referencia del lujo oriental moderno.',
    description: 'Oud Wood de Tom Ford es la puerta de entrada al mundo del oud para quienes buscan elegancia sin estridencia. El oud tailandés se combina con sándalo cremoso, cardamomo especiado y una base de vetiver y tonka.',
    images: [fimg(1826)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Oud de Tailandia', 'Palo de rosa'], heart: ['Cardamomo', 'Sándalo', 'Vetiver'], base: ['Haba tonka', 'Ámbar', 'Vainilla'] },
    featured: true,
    stock: 8
  },
  {
    slug: 'amouage-interlude-man',
    name: 'Interlude Man',
    brand: 'Amouage',
    categorySlug: 'arabe',
    price: 750000,
    shortDescription: 'Incienso, oud y resinas. La fragancia árabe más aclamada de la última década.',
    description: 'Interlude Man de Amouage es un oriental complejo de incienso, orégano y oud que evoluciona hacia un corazón de cuero y pachulí.',
    images: [fimg(15294)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Incienso', 'Tomillo', 'Orégano'], heart: ['Oud', 'Cuero', 'Pachulí'], base: ['Ámbar', 'Resinas de árbol', 'Almizcle'] },
    featured: false,
    stock: 5
  },
  {
    slug: 'rasasi-la-yuqawam-homme',
    name: 'La Yuqawam Homme',
    brand: 'Rasasi',
    categorySlug: 'arabe',
    price: 280000,
    shortDescription: 'Azafrán, oud y almizcle. El bestseller árabe con proyección brutal.',
    description: 'La Yuqawam Homme de Rasasi combina notas orientales con una apertura de frambuesa y azafrán, corazón de jazmín y oud, y una base de cuero y almizcle de enorme proyección.',
    images: [fimg(19668)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Frambuesa', 'Azafrán', 'Tomillo'], heart: ['Incienso', 'Jazmín', 'Artemisa'], base: ['Cuero', 'Gamuza', 'Madera', 'Ámbar'] },
    featured: true,
    stock: 19
  },
  {
    slug: 'al-haramain-amber-oud-gold-edition',
    name: 'Amber Oud Gold Edition',
    brand: 'Al Haramain',
    categorySlug: 'arabe',
    price: 240000,
    shortDescription: 'Oud, melocotón y vainilla. Intensidad oriental a precio excepcional.',
    description: 'Amber Oud Gold Edition de Al Haramain es el oriental dulce y atemporal que todo amante del oud debería tener.',
    images: [fimg(51816)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Bergamota', 'Notas verdes'], heart: ['Melón', 'Piña', 'Oud', 'Ámbar'], base: ['Vainilla', 'Almizcle', 'Madera'] },
    featured: false,
    stock: 22
  },
  {
    slug: 'creed-aventus',
    name: 'Aventus',
    brand: 'Creed',
    categorySlug: 'nicho',
    price: 1250000,
    shortDescription: 'Piña, abedul y ámbar gris. La fragancia de nicho más deseada del mundo.',
    description: 'Aventus de Creed es la fragancia de nicho por excelencia. Inspirada en Napoleón Bonaparte, abre con piña y frutas negras sobre abedul ahumado, terminando en ámbar gris y almizcle de longevidad excepcional.',
    images: [fimg(9828)],
    volumeMl: 100,
    concentration: 'Eau de Parfum',
    notes: { top: ['Piña', 'Manzana verde', 'Grosella negra', 'Bergamota'], heart: ['Abedul', 'Pachulí', 'Jazmín'], base: ['Almizcle', 'Ámbar gris', 'Vainilla', 'Cedro'] },
    featured: true,
    stock: 6
  },
  {
    slug: 'maison-francis-kurkdjian-baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    categorySlug: 'nicho',
    price: 1480000,
    shortDescription: 'Azafrán, ambroxan y cedro. El perfume más copiado y deseado del siglo XXI.',
    description: 'Baccarat Rouge 540 redefinió la perfumería moderna. El azafrán y el cedro abren paso a ambroxan e incienso mineral que se convierte en una firma olfativa absolutamente irresistible.',
    images: [fimg(33519)],
    volumeMl: 70,
    concentration: 'Extrait',
    notes: { top: ['Azafrán', 'Cedro'], heart: ['Ambroxan', 'Incienso'], base: ['Fougère', 'Madera de cedro', 'Almizcle mineral'] },
    featured: true,
    stock: 4
  }
];

async function main() {
  // ── Administrador ───────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@eaudeparfum.co';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'EauDeParfum2024!';
  const adminName = process.env.ADMIN_NAME ?? 'Administrador';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existing) {
    if (existing.role !== 'ADMIN' || !existing.emailVerified) {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'ADMIN', emailVerified: true }
      });
      console.log(`✓ Usuario ${adminEmail} actualizado a rol ADMIN (verificado)`);
    } else {
      console.log(`ℹ  Administrador ${adminEmail} ya existe`);
    }
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: { email: adminEmail, fullName: adminName, passwordHash, role: 'ADMIN', emailVerified: true }
    });
    console.log(`✓ Administrador creado: ${adminEmail} / ${adminPassword}`);
  }

  // ── Productos ───────────────────────────────────────────────────────────────
  let created = 0;
  let skipped = 0;

  for (const p of SEED_PRODUCTS) {
    const exists = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (exists) { skipped++; continue; }

    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        categorySlug: p.categorySlug,
        price: p.price,
        shortDescription: p.shortDescription,
        description: p.description,
        images: JSON.stringify(p.images),
        volumeMl: p.volumeMl,
        concentration: p.concentration,
        notes: JSON.stringify(p.notes),
        featured: p.featured,
        stock: p.stock
      }
    });
    created++;
  }

  console.log(`✓ Productos: ${created} creados, ${skipped} ya existían`);

  // ── Pedidos de demostración ─────────────────────────────────────────────────
  const existingOrders = await prisma.order.count();
  if (existingOrders === 0) {
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    const demoAddress = JSON.stringify({
      fullName: 'Carlos Gómez',
      phone: '+57 300 123 4567',
      department: 'Bogotá D.C.',
      city: 'Bogotá',
      line1: 'Calle 100 # 15-30, Apto 501'
    });

    const demoOrders = [
      {
        userId: admin?.id,
        status: 'DELIVERED',
        total: 520000,
        address: demoAddress,
        items: JSON.stringify([{ name: 'Chanel No. 5 EDP', brand: 'Chanel', slug: 'chanel-no-5-edp', price: 520000, quantity: 1 }])
      },
      {
        userId: admin?.id,
        status: 'SHIPPED',
        total: 960000,
        address: demoAddress,
        items: JSON.stringify([
          { name: 'Sauvage EDP', brand: 'Dior', slug: 'dior-sauvage-edp', price: 480000, quantity: 1 },
          { name: 'Bleu de Chanel EDP', brand: 'Chanel', slug: 'chanel-bleu-de-chanel-edp', price: 480000, quantity: 1 }
        ])
      },
      {
        userId: null,
        status: 'PACKED',
        total: 850000,
        address: JSON.stringify({ fullName: 'Andrea Ruiz', phone: '+57 310 987 6543', department: 'Antioquia', city: 'Medellín', line1: 'Carrera 43A # 1-50' }),
        items: JSON.stringify([{ name: 'Black Orchid', brand: 'Tom Ford', slug: 'tom-ford-black-orchid', price: 850000, quantity: 1 }])
      },
      {
        userId: null,
        status: 'PENDING',
        total: 390000,
        address: JSON.stringify({ fullName: 'Luis Torres', phone: '+57 315 444 5566', department: 'Valle del Cauca', city: 'Cali', line1: 'Av. 6 Norte # 25-12' }),
        items: JSON.stringify([{ name: 'Acqua di Giò EDP', brand: 'Giorgio Armani', slug: 'giorgio-armani-acqua-di-gio-edp', price: 390000, quantity: 1 }])
      },
      {
        userId: null,
        status: 'CANCELLED',
        total: 650000,
        address: JSON.stringify({ fullName: 'María González', phone: '+57 320 777 8899', department: 'Cundinamarca', city: 'Bogotá', line1: 'Cra 7 # 32-16' }),
        items: JSON.stringify([{ name: 'La Vie est Belle', brand: 'Lancôme', slug: 'lancome-la-vie-est-belle', price: 650000, quantity: 1 }])
      }
    ];

    for (const order of demoOrders) {
      await prisma.order.create({ data: order });
    }
    console.log(`✓ Pedidos de demostración: ${demoOrders.length} creados`);
  } else {
    console.log(`ℹ  Pedidos ya existen (${existingOrders}), omitiendo seed`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
