import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { Header } from '@presentation/components/layout/Header';
import { Footer } from '@presentation/components/layout/Footer';
import { SessionProvider } from '@presentation/components/layout/SessionProvider';
import { SITE } from '@shared/constants';
import './globals.css';

/**
 * Fraunces: serif variable de alto contraste, con óptica variable e itálica
 * propia. Tiene carácter — no es la serif de plantilla.
 */
const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

/** Instrument Sans: grotesca contemporánea, ligeramente estrechada. */
const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

/** Cifras: precios, stock y referencias de pedido. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    locale: 'es_CO',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }]
  }
};

export const viewport = {
  themeColor: '#F7F4EE'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-CO"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bone">
        <SessionProvider>
          <a href="#contenido" className="skip-link">
            Saltar al contenido
          </a>
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProvider>
        {/* Grano de película: fijo, sin eventos, no repinta con el scroll. */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
