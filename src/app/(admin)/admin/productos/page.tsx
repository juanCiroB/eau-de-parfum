import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { DeleteProductButton } from '@presentation/components/admin/DeleteProductButton';
import { StockEditor } from '@presentation/components/admin/StockEditor';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Productos · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

const CATEGORY_LABELS: Record<string, string> = {
  disenador: 'Diseñador',
  arabe: 'Árabe',
  nicho: 'Nicho'
};

function formatPrice(amount: number) {
  return `$ ${amount.toLocaleString('es-CO')}`;
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      brand: true,
      categorySlug: true,
      price: true,
      stock: true,
      featured: true,
      concentration: true,
      volumeMl: true,
      slug: true
    }
  });

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-light text-ivory">Productos</h1>
            <p className="mt-1 text-sm text-smoke">{products.length} en catálogo</p>
          </div>
          <Link
            href="/admin/productos/nuevo"
            className="bg-gold px-6 py-2.5 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light"
          >
            + Agregar
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-smoke">No hay productos. Agrega el primero.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ivory/10 text-left text-[11px] uppercase tracking-wide2 text-smoke">
                  <th className="pb-3 pr-6">Nombre</th>
                  <th className="pb-3 pr-6">Marca</th>
                  <th className="pb-3 pr-6">Categoría</th>
                  <th className="pb-3 pr-6">Precio</th>
                  <th className="pb-3 pr-6">Stock</th>
                  <th className="pb-3 pr-6">Destacado</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-ivory/5 hover:bg-noir-800/50">
                    <td className="py-3.5 pr-6">
                      <Link
                        href={`/producto/${p.slug}`}
                        target="_blank"
                        className="font-medium text-ivory hover:text-gold transition-colors"
                      >
                        {p.name}
                      </Link>
                      <div className="text-[11px] text-smoke">{p.volumeMl} ml · {p.concentration}</div>
                    </td>
                    <td className="py-3.5 pr-6 text-smoke-light">{p.brand}</td>
                    <td className="py-3.5 pr-6 text-smoke-light">
                      {CATEGORY_LABELS[p.categorySlug] ?? p.categorySlug}
                    </td>
                    <td className="py-3.5 pr-6 text-smoke-light">{formatPrice(p.price)}</td>
                    <td className="py-3.5 pr-6">
                      <StockEditor id={p.id} initialStock={p.stock} />
                    </td>
                    <td className="py-3.5 pr-6 text-smoke">
                      {p.featured ? '★' : '—'}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/productos/${p.id}/editar`}
                          className="text-[11px] uppercase tracking-wide2 text-smoke transition-colors hover:text-gold"
                        >
                          Editar
                        </Link>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
