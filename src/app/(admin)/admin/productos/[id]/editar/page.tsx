import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { ProductForm } from '@presentation/components/admin/ProductForm';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Editar producto · Admin', robots: { index: false } };

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  const images = JSON.parse(product.images) as string[];
  const notes = JSON.parse(product.notes) as {
    top?: string[];
    heart?: string[];
    base?: string[];
  };

  const initialProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    categorySlug: product.categorySlug,
    price: product.price,
    volumeMl: product.volumeMl,
    concentration: product.concentration,
    shortDescription: product.shortDescription,
    description: product.description,
    imageUrl: images[0] ?? '',
    notesTop: (notes.top ?? []).join(', '),
    notesHeart: (notes.heart ?? []).join(', '),
    notesBase: (notes.base ?? []).join(', '),
    featured: product.featured,
    stock: product.stock
  };

  return (
    <div className="py-10 lg:py-14">
      <Container className="max-w-2xl">
        <div className="mb-8">
          <Link
            href="/admin/productos"
            className="text-[11px] uppercase tracking-wide2 text-clay transition-colors hover:text-terra"
          >
            ← Volver a productos
          </Link>
          <h1 className="mt-4 font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">
            Editar: {product.name}
          </h1>
        </div>

        <ProductForm initialProduct={initialProduct} />
      </Container>
    </div>
  );
}
