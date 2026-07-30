'use client';

import { useEffect } from 'react';
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

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-drawer bg-ink/45 backdrop-blur-sm transition-opacity duration-500 ease-haptic',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
        className={cn(
          'fixed right-0 top-0 z-overlay flex h-full w-full max-w-md flex-col bg-bone shadow-lift-lg',
          'transition-transform duration-[600ms] ease-haptic sm:right-3 sm:top-3 sm:h-[calc(100%-1.5rem)] sm:rounded-shell',
          open ? 'translate-x-0' : 'translate-x-[105%]'
        )}
      >
        <header className="flex items-center justify-between border-b border-ink/[0.08] px-6 py-5">
          <h2 className="font-display text-xl font-light tracking-tighter2 text-ink">
            Tu carrito <span className="font-mono text-sm text-clay">({count})</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-clay-dark transition-all duration-300 ease-haptic hover:bg-ink/[0.06] hover:text-ink active:scale-90"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            {/* Frasco esquemático: da presencia al vacío sin recurrir a iconos de librería. */}
            <svg
              width="44"
              height="62"
              viewBox="0 0 44 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-clay-light"
              aria-hidden="true"
            >
              <rect x="16" y="2" width="12" height="9" rx="1.5" />
              <path d="M18 11h8v5h-8z" />
              <rect x="4" y="16" width="36" height="44" rx="5" />
              <path d="M4 40h36" strokeDasharray="2 3" />
            </svg>
            <div>
              <p className="font-display text-2xl font-light text-ink">Aún está vacío</p>
              <p className="mt-2 text-sm text-clay-dark">
                Descubre nuestra selección de fragancias.
              </p>
            </div>
            <Link href={ROUTES.catalog} onClick={onClose}>
              <Button variant="primary" withArrow>
                Ver catálogo
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <ul className="divide-y divide-ink/[0.07]">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4 py-5">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-[0.75rem] bg-bone-200 ring-1 ring-inset ring-ink/[0.06]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-luxe text-terra">
                            {item.brand}
                          </p>
                          <p className="mt-0.5 font-display text-base font-light text-ink">
                            {item.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] text-clay">
                            {item.volumeMl} ml
                          </p>
                        </div>
                        <button
                          onClick={() => remove(item.productId)}
                          aria-label={`Eliminar ${item.name}`}
                          className="h-fit text-[11px] text-clay underline-offset-4 transition-colors duration-300 hover:text-terra hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(q) => setQuantity(item.productId, q)}
                        />
                        <span className="font-mono text-sm text-ink">{lineTotal(item).format()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ink/[0.08] bg-bone-200/60 px-6 py-5 sm:rounded-b-shell">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-wide2 text-clay-dark">Subtotal</span>
                <span className="font-mono text-lg text-ink">{subtotal.format()}</span>
              </div>
              <p className="mt-1.5 text-xs text-clay">
                Envío e impuestos calculados al finalizar.
              </p>
              <Link href={ROUTES.cart} onClick={onClose} className="mt-5 block">
                <Button variant="primary" className="w-full justify-center">
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
