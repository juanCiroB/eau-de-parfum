'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProductView } from '@application/dto/ProductView';
import { useCart } from '@presentation/hooks/useCart';
import { Button } from '@presentation/components/ui/Button';

/**
 * Acción "Agregar al carrito". Componente cliente: lee el store global.
 * Recibe el DTO ProductView (satisface CartableProduct estructuralmente).
 */
export function AddToCartButton({ product }: { product: ProductView }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Limpia el temporizador si el componente se desmonta antes de tiempo.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button
        variant="accent"
        onClick={handleAdd}
        disabled={!product.inStock}
        withArrow={!added && product.inStock}
        className="w-full justify-center sm:w-auto"
      >
        {!product.inStock ? 'Agotado' : added ? 'Añadido al carrito' : 'Agregar al carrito'}
      </Button>

      {/* Confirmación discreta, sin exclamaciones ni saltos de layout. */}
      <span
        aria-live="polite"
        className={`text-xs text-clay-dark transition-opacity duration-500 ${
          added ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {added ? 'Listo. Puedes seguir explorando.' : ''}
      </span>
    </div>
  );
}
