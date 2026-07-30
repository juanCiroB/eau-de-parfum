import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Button } from '@presentation/components/ui/Button';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { Reveal } from '@presentation/components/ui/Reveal';
import { ROUTES, SITE, CATEGORY_SLUGS } from '@shared/constants';

const HERO_MAIN =
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85';

/** Accesos de categoría: conservan el destino real del catálogo. */
const TILES = [
  {
    label: 'Para ella',
    href: ROUTES.categoryFilter(CATEGORY_SLUGS.designer),
    src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80',
    alt: 'Frasco de perfume femenino sobre fondo claro'
  },
  {
    label: 'Nicho',
    href: ROUTES.categoryFilter(CATEGORY_SLUGS.niche),
    src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=700&q=80',
    alt: 'Fragancia de nicho en frasco facetado'
  },
  {
    label: 'Para él',
    href: ROUTES.categoryFilter(CATEGORY_SLUGS.arabic),
    src: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=700&q=80',
    alt: 'Frasco de perfume masculino sobre superficie oscura'
  }
];

const STATS = [
  { value: '200+', label: 'Fragancias en catálogo' },
  { value: '100%', label: 'Originales selladas' },
  { value: '5.400', label: 'Pedidos entregados' },
  { value: '24 h', label: 'Despacho desde Medellín' }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone halo-warm">
      <Container>
        <div className="grid items-center gap-14 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
          {/* Bloque tipográfico sobre papel — sin foto de fondo ni degradado. */}
          <Reveal>
            <Eyebrow>Perfumería · {SITE.country}</Eyebrow>
            <h1 className="mt-7 font-display text-[3.25rem] font-light leading-[0.94] tracking-tighter2 text-ink sm:text-[4.5rem] lg:text-[5.25rem]">
              El arte de
              <br />
              la <span className="italic text-terra">fragancia</span>
            </h1>
            <p className="mt-7 max-w-prose2 text-base leading-relaxed text-clay-dark">
              {SITE.tagline} Chanel, Dior, Creed, Tom Ford y casas árabes, siempre nuevas y
              selladas.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href={ROUTES.catalog}>
                <Button variant="primary" withArrow>
                  Explorar catálogo
                </Button>
              </Link>
              <Link
                href={ROUTES.catalog}
                className="underline-grow text-[11px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:text-terra"
              >
                Ver novedades
              </Link>
            </div>
          </Reveal>

          {/* Composición de imágenes: pieza principal + accesos de categoría. */}
          <Reveal delay={120} className="grid grid-cols-[1.6fr_1fr] gap-3 sm:gap-4">
            <div className="group relative overflow-hidden rounded-shell bg-bone-200 ring-1 ring-inset ring-ink/[0.06]">
              <ImageWithFallback
                src={HERO_MAIN}
                alt="Composición de frascos de perfume sobre superficie cálida"
                priority
                className="h-full min-h-[380px] w-full object-cover transition-transform duration-[1200ms] ease-haptic group-hover:scale-[1.04] lg:min-h-[540px]"
              />
            </div>

            <ul className="grid grid-rows-3 gap-3 sm:gap-4">
              {TILES.map((tile, i) => (
                <li key={tile.label}>
                  <Link
                    href={tile.href}
                    className={cnTile(i)}
                    aria-label={`Ver categoría ${tile.label}`}
                  >
                    <ImageWithFallback
                      src={tile.src}
                      alt={tile.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-haptic group-hover/tile:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-bone/90 px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-ink backdrop-blur-sm transition-transform duration-500 ease-haptic group-hover/tile:-translate-y-0.5">
                      {tile.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* Cifras del negocio, en tabular. */}
      <div className="border-y border-ink/[0.08] bg-bone-200/70">
        <Container>
          <dl className="grid grid-cols-2 gap-y-8 py-9 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} className="px-2 text-center sm:px-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl text-ink">{s.value}</span>
                  <span className="mt-2 block text-[10px] uppercase tracking-wide2 text-clay-dark">
                    {s.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

/** El acceso central se desplaza para romper la rejilla perfecta. */
function cnTile(index: number) {
  const base =
    'group/tile relative block h-full min-h-[120px] overflow-hidden rounded-core ring-1 ring-inset ring-ink/[0.06] transition-transform duration-700 ease-haptic hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra';
  return index === 1 ? `${base} lg:translate-x-3` : base;
}
