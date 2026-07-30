import { Container } from '@presentation/components/ui/Container';

const BRANDS = [
  'Chanel',
  'Dior',
  'Tom Ford',
  'Creed',
  'Yves Saint Laurent',
  'Lancôme',
  'Giorgio Armani',
  'Paco Rabanne',
  'Amouage',
  'Al Haramain',
  'Rasasi',
  'Maison Francis Kurkdjian',
];

export function BrandsBanner() {
  return (
    <section className="bg-noir-800 py-12 border-y border-ivory/8">
      <Container>
        <p className="mb-7 text-center text-[11px] uppercase tracking-luxe text-smoke-light">
          Marcas disponibles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="font-display text-lg font-light tracking-wide text-smoke transition-colors hover:text-gold cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
