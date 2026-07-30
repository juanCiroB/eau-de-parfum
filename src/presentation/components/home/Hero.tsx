import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Button } from '@presentation/components/ui/Button';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { ROUTES, SITE } from '@shared/constants';

const HERO_MAIN =
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85';
const HERO_SIDE_1 =
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80';
const HERO_SIDE_2 =
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=700&q=80';
const HERO_SIDE_3 =
  'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=700&q=80';

export function Hero() {
  return (
    <section className="bg-noir text-ivory overflow-hidden">
      {/* Mosaico principal */}
      <div className="grid h-[85vh] min-h-[560px] grid-cols-1 lg:grid-cols-[3fr_2fr]">
        {/* Imagen grande con overlay de texto */}
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={HERO_MAIN}
            alt="Fragancias de lujo"
            className="h-full w-full object-cover object-center transition-transform duration-[8s] ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/40 to-transparent" />

          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-14">
            <span className="text-[11px] uppercase tracking-luxe text-gold">
              Perfumería · {SITE.country}
            </span>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
              El arte de
              <br />
              <span className="text-gold">la fragancia</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-smoke-light">
              {SITE.tagline} Originales sellados — Chanel, Dior, Creed, Tom Ford y más.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={ROUTES.catalog}>
                <Button variant="gold">Explorar catálogo</Button>
              </Link>
              <Link
                href={ROUTES.catalog}
                className="text-[11px] uppercase tracking-wide2 text-ivory underline-offset-4 hover:text-gold hover:underline"
              >
                Ver novedades →
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha: 3 imágenes apiladas */}
        <div className="hidden lg:grid lg:grid-rows-3">
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={HERO_SIDE_1}
              alt="Perfume femenino"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-noir/30" />
            <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-luxe text-ivory/80">
              Para Ella
            </span>
          </div>
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={HERO_SIDE_2}
              alt="Baccarat Rouge 540"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-noir/20" />
            <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-luxe text-ivory/80">
              Nicho
            </span>
          </div>
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={HERO_SIDE_3}
              alt="Perfume masculino"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-noir/25" />
            <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-luxe text-ivory/80">
              Para Él
            </span>
          </div>
        </div>
      </div>

      {/* Strip de stats */}
      <div className="border-t border-ivory/10 bg-noir-800">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-ivory/10 py-5 sm:grid-cols-4">
            {[
              { value: '+200', label: 'Fragancias' },
              { value: '100%', label: 'Originales selladas' },
              { value: '+5.000', label: 'Clientes felices' },
              { value: '24 h', label: 'Despacho rápido' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-2 text-center first:pl-0 last:pr-0">
                <p className="font-display text-2xl font-light text-gold">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide2 text-smoke-light">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
