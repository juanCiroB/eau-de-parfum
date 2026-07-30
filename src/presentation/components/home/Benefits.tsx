import { Container } from '@presentation/components/ui/Container';
import { SectionHeading } from '@presentation/components/ui/SectionHeading';
import { Reveal } from '@presentation/components/ui/Reveal';

const BENEFITS = [
  {
    n: '01',
    title: 'Productos originales',
    text: 'Únicamente perfumes nuevos y sellados. Originalidad garantizada en cada frasco.'
  },
  {
    n: '02',
    title: 'Envíos nacionales',
    text: 'Llevamos tu fragancia a cualquier ciudad de Colombia, con empaque seguro.'
  },
  {
    n: '03',
    title: 'Atención personalizada',
    text: 'Te asesoramos para encontrar la fragancia que se ajusta a ti, sin presión.'
  }
];

/**
 * Propuesta de valor. En lugar de tres tarjetas iguales, una lista editorial:
 * numeral display a la izquierda, texto a la derecha, filete entre entradas.
 */
export function Benefits() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Cómo trabajamos"
              title={
                <>
                  Tres cosas que <span className="italic text-terra">no</span> negociamos
                </>
              }
            />
          </Reveal>

          <ul className="lg:pt-3">
            {BENEFITS.map((b, i) => (
              <Reveal
                as="li"
                key={b.n}
                delay={i * 110}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink/[0.09] py-8 last:border-b sm:gap-x-10"
              >
                <span className="font-mono text-xs text-terra">{b.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-light tracking-tighter2 text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-2.5 max-w-prose2 text-[0.9375rem] leading-relaxed text-clay-dark">
                    {b.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
