'use client';

import { useState } from 'react';
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

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button
      variant="gold"
      onClick={handleAdd}
      disabled={!product.inStock}
      className="w-full sm:w-auto"
    >
      {!product.inStock ? 'Agotado' : added ? 'Añadido ✓' : 'Agregar al carrito'}
    </Button>
  );
}
