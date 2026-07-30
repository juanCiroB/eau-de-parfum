import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { ProductForm } from '@presentation/components/admin/ProductForm';

export const metadata: Metadata = { title: 'Agregar producto · Admin', robots: { index: false } };

export default function NewProductPage() {
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
          <h1 className="mt-4 font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">Agregar perfume</h1>
        </div>

        <ProductForm />
      </Container>
    </div>
  );
}
