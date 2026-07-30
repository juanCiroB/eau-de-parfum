'use client';

import Link from 'next/link';
import { useCart } from '@presentation/hooks/useCart';
import { ROUTES } from '@shared/constants';
import { Button } from '@presentation/components/ui/Button';
import { QuantityStepper } from '@presentation/components/ui/QuantityStepper';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { lineTotal } from '@domain/entities/Cart';
import { cn } from '@shared/utils/cn';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, count, remove, setQuantity } = useCart();

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-noir/70 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-black shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <header className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <h2 className="font-display text-xl text-ivory">
            Tu carrito <span className="text-smoke">({count})</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="text-2xl leading-none text-smoke-light transition-colors hover:text-gold"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl text-ivory">Aún está vacío</p>
            <p className="text-sm text-smoke-light">Descubre nuestra selección de fragancias.</p>
            <Link href={ROUTES.catalog} onClick={onClose}>
              <Button variant="gold">Ver catálogo</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-ivory/10">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4 py-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden bg-noir-700">
                      <ImageWithFallback src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide2 text-gold">{item.brand}</p>
                          <p className="font-display text-base text-ivory">{item.name}</p>
                          <p className="text-xs text-smoke">{item.volumeMl} ml</p>
                        </div>
                        <button
                          onClick={() => remove(item.productId)}
                          aria-label={`Eliminar ${item.name}`}
                          className="h-fit text-xs text-smoke underline-offset-2 hover:text-ivory hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(q) => setQuantity(item.productId, q)}
                        />
                        <span className="text-sm tabular-nums text-ivory">
                          {lineTotal(item).format()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ivory/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide2 text-smoke-light">Subtotal</span>
                <span className="font-display text-xl text-ivory">{subtotal.format()}</span>
              </div>
              <p className="mt-1 text-xs text-smoke">Envío e impuestos calculados al finalizar.</p>
              <Link href={ROUTES.cart} onClick={onClose} className="mt-4 block">
                <Button variant="gold" className="w-full">
                  Ver carrito completo
                </Button>
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
