import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { Eyebrow } from '@presentation/components/ui/Eyebrow';
import { ROUTES, SITE, CATEGORY_SLUGS } from '@shared/constants';

const SOCIAL = [{ label: 'Instagram', href: SITE.social.instagram }];

/**
 * Cierre de página en tinta: el único bloque oscuro del sitio, siempre en la
 * misma posición. El wordmark a sangre actúa de firma.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-bone halo-dark">
      <Container className="pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-light tracking-[0.14em]">
              EAU <span className="italic tracking-[0.06em] text-terra-light">de</span> PARFUM
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/55">{SITE.tagline}</p>
            <span aria-hidden="true" className="mt-7 block h-px w-14 bg-terra-light/70" />
          </div>

          <FooterCol title="Tienda">
            <FooterLink href={ROUTES.catalog}>Catálogo</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.designer)}>Diseñador</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.arabic)}>Árabe</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.niche)}>Nicho</FooterLink>
          </FooterCol>

          <FooterCol title="Contacto">
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="underline-grow text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li className="font-mono text-sm text-bone/60">{SITE.contact.whatsapp}</li>
            <li className="text-sm text-bone/60">{SITE.contact.city}</li>
          </FooterCol>

          <FooterCol title="Síguenos">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="underline-grow text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-bone/10 pt-7 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p>Hecho en {SITE.country}.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow tone="bone" bare>
        {title}
      </Eyebrow>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="underline-grow text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
      >
        {children}
      </Link>
    </li>
  );
}
