import type { Metadata } from 'next';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { CartClient } from '@presentation/components/cart/CartClient';

export const metadata: Metadata = {
  title: 'Carrito',
  description: 'Revisa los perfumes que has seleccionado.'
};

/**
 * Página de carrito. El contenido es interactivo (estado persistido en
 * cliente), por eso delega en CartClient. La página sólo aporta el marco.
 */
export default function CartPage() {
  return (
    <div className="py-14 lg:py-20">
      <Container>
        <header className="mb-12">
          <Eyebrow className="mb-4">Tu selección</Eyebrow>
          <h1 className="font-display text-4xl font-light leading-tight text-ivory sm:text-5xl">
            Carrito de compras
          </h1>
        </header>
        <CartClient />
      </Container>
    </div>
  );
}
