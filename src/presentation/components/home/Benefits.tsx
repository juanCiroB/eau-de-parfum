import { Container } from '@presentation/components/ui/Container';

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

/** Sección de beneficios / propuesta de valor. */
export function Benefits() {
  return (
    <section className="bg-noir py-20 text-ivory lg:py-24">
      <Container>
        <div className="grid gap-px overflow-hidden border border-ivory/10 sm:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.n} className="bg-noir px-8 py-12">
              <span className="font-display text-3xl text-gold">{b.n}</span>
              <h3 className="mt-5 font-display text-xl font-light">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke-light">{b.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
