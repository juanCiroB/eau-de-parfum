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
            <h1 className="font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">Productos</h1>
            <p className="mt-1 text-sm text-clay">{products.length} en catálogo</p>
          </div>
          <Link
            href="/admin/productos/nuevo"
            className="rounded-full bg-ink px-6 py-2.5 text-[11px] uppercase tracking-wide2 text-bone shadow-lift transition-all duration-500 ease-haptic hover:bg-ink-700 active:scale-[0.98]"
          >
            + Agregar
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-clay">No hay productos. Agrega el primero.</p>
        ) : (
          <div className="scroll-x-top">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/[0.08] text-left text-[11px] uppercase tracking-wide2 text-clay">
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
                  <tr key={p.id} className="border-b border-ink/[0.05] hover:bg-ink/[0.03]">
                    <td className="py-3.5 pr-6">
                      <Link
                        href={`/producto/${p.slug}`}
                        target="_blank"
                        className="font-medium text-ink hover:text-terra transition-colors"
                      >
                        {p.name}
                      </Link>
                      <div className="text-[11px] text-clay">{p.volumeMl} ml · {p.concentration}</div>
                    </td>
                    <td className="py-3.5 pr-6 text-clay-dark">{p.brand}</td>
                    <td className="py-3.5 pr-6 text-clay-dark">
                      {CATEGORY_LABELS[p.categorySlug] ?? p.categorySlug}
                    </td>
                    <td className="py-3.5 pr-6 text-clay-dark">{formatPrice(p.price)}</td>
                    <td className="py-3.5 pr-6">
                      <StockEditor id={p.id} initialStock={p.stock} />
                    </td>
                    <td className="py-3.5 pr-6 text-clay">
                      {p.featured ? (
                        <span className="rounded-full bg-terra/10 px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-terra">
                          Sí
                        </span>
                      ) : (
                        <span className="text-clay-light">—</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/productos/${p.id}/editar`}
                          className="text-[11px] uppercase tracking-wide2 text-clay transition-colors hover:text-terra"
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
