import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';

function isAdmin(session: Awaited<ReturnType<typeof getServerSession<typeof authOptions>>>) {
  return session?.user?.role === 'ADMIN';
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch {
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

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
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
      stock: typeof stock === 'number' && stock >= 0 ? Math.round(stock) : product.stock
    }
  });

  revalidatePath('/catalogo');
  revalidatePath('/');
  revalidatePath(`/producto/${product.slug}`);

  return NextResponse.json(updated);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { stock } = body as Record<string, unknown>;
  if (typeof stock !== 'number' || stock < 0) {
    return NextResponse.json({ error: 'Stock inválido' }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: { stock: Math.round(stock) },
    select: { id: true, stock: true }
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  await prisma.product.delete({ where: { id: params.id } });

  revalidatePath('/catalogo');
  revalidatePath('/');
  revalidatePath(`/producto/${product.slug}`);

  return NextResponse.json({ ok: true });
}
