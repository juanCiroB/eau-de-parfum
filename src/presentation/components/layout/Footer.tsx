import Link from 'next/link';
import { Container } from '@presentation/components/ui/Container';
import { ROUTES, SITE, CATEGORY_SLUGS } from '@shared/constants';

const SOCIAL = [{ label: 'Instagram', href: SITE.social.instagram }];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ivory/10 bg-noir text-ivory">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.2em]">EAU DE PARFUM</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke-light">
              {SITE.tagline}
            </p>
          </div>

          <FooterCol title="Tienda">
            <FooterLink href={ROUTES.catalog}>Catálogo</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.designer)}>Diseñador</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.arabic)}>Árabe</FooterLink>
            <FooterLink href={ROUTES.categoryFilter(CATEGORY_SLUGS.niche)}>Nicho</FooterLink>
          </FooterCol>

          <FooterCol title="Contacto">
            <li className="text-sm text-smoke-light">{SITE.contact.email}</li>
            <li className="text-sm text-smoke-light">{SITE.contact.whatsapp}</li>
            <li className="text-sm text-smoke-light">{SITE.contact.city}</li>
          </FooterCol>

          <FooterCol title="Síguenos">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-sm text-smoke-light transition-colors hover:text-gold"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. Todos los derechos reservados.</p>
          <p className="text-smoke">Hecho en {SITE.country}.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-luxe text-gold">{title}</p>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-smoke-light transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
