import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';

function generateSlug(brand: string, name: string): string {
  return `${brand}-${name}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      name: true,
      brand: true,
      categorySlug: true,
      price: true,
      stock: true,
      featured: true,
      concentration: true,
      volumeMl: true
    }
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const {
    name, brand, categorySlug, price, volumeMl, concentration,
    shortDescription, description, imageUrl,
    notesTop, notesHeart, notesBase, featured, stock
  } = body as Record<string, unknown>;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof brand !== 'string' || !brand.trim() ||
    typeof categorySlug !== 'string' || !['disenador', 'arabe', 'nicho'].includes(categorySlug) ||
    typeof price !== 'number' || price <= 0 ||
    typeof volumeMl !== 'number' || volumeMl <= 0 ||
    typeof concentration !== 'string' ||
    typeof shortDescription !== 'string' || !shortDescription.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof imageUrl !== 'string' || !imageUrl.trim()
  ) {
    return NextResponse.json({ error: 'Faltan campos requeridos o son inválidos' }, { status: 400 });
  }

  const parseNotes = (v: unknown): string[] =>
    typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];

  const slug = generateSlug(brand.trim(), name.trim());

  const existing = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const product = await prisma.product.create({
    data: {
      slug: finalSlug,
      name: name.trim(),
      brand: brand.trim(),
      categorySlug,
      price: Math.round(price),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      images: JSON.stringify([imageUrl.trim()]),
      volumeMl: Math.round(volumeMl),
      concentration,
      notes: JSON.stringify({
        top: parseNotes(notesTop),
        heart: parseNotes(notesHeart),
        base: parseNotes(notesBase)
      }),
      featured: featured === true,
      stock: typeof stock === 'number' && stock >= 0 ? Math.round(stock) : 10
    }
  });

  revalidatePath('/catalogo');
  revalidatePath('/');

  return NextResponse.json(product, { status: 201 });
}
