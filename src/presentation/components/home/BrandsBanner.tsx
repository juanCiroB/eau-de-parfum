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
  'Maison Francis Kurkdjian'
];

/**
 * Marquesina continua de casas disponibles. La lista se duplica para que el
 * bucle no tenga costura; la animación mueve solo `transform`.
 */
export function BrandsBanner() {
  return (
    <section aria-labelledby="marcas-titulo" className="overflow-hidden bg-bone py-14">
      <h2
        id="marcas-titulo"
        className="mb-9 text-center text-[10px] uppercase tracking-luxe text-clay"
      >
        Marcas disponibles
      </h2>

      {/* Los extremos se desvanecen contra el papel. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bone to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bone to-transparent sm:w-40" />

        <ul className="flex w-max animate-marquee items-center gap-x-14 motion-reduce:animate-none">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <li
              key={`${brand}-${i}`}
              aria-hidden={i >= BRANDS.length}
              className="shrink-0 font-display text-xl font-light tracking-wide text-clay transition-colors duration-500 hover:text-ink"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
