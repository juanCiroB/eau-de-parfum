'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ProfileDropdown } from './ProfileDropdown';
import { Container } from '@presentation/components/ui/Container';
import { Logo } from '@presentation/components/ui/Logo';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@presentation/hooks/useCart';
import { ROUTES } from '@shared/constants';
import { cn } from '@shared/utils/cn';

const NAV = [{ label: 'Catálogo', href: ROUTES.catalog }];

/** Enlace de cabecera con subrayado que crece y estado de página activa. */
const linkBase =
  'underline-grow text-[11px] uppercase tracking-wide2 transition-colors duration-300';

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-nav pt-3 sm:pt-4">
      <Container>
        {/* Isla flotante: despegada del borde, cristal sobre el papel. */}
        <div
          className={cn(
            'rounded-full bg-bone/80 px-4 shadow-lift ring-1 ring-inset ring-ink/[0.07] backdrop-blur-xl sm:px-6',
            'transition-[border-radius] duration-500 ease-haptic',
            mobileOpen && 'rounded-shell'
          )}
        >
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center sm:h-16">
            {/* Izquierda: navegación / menú móvil */}
            <div className="flex items-center">
              <button
                className="mr-2 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-ink/[0.06] lg:hidden"
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {/* Hamburguesa que se pliega en aspa. */}
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-5 bg-ink transition-all duration-500 ease-haptic',
                      mobileOpen ? 'top-1.5 rotate-45' : 'top-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-1.5 block h-px bg-ink transition-all duration-500 ease-haptic',
                      mobileOpen ? 'w-0 opacity-0' : 'w-3.5 opacity-100'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-5 bg-ink transition-all duration-500 ease-haptic',
                      mobileOpen ? 'top-1.5 -rotate-45' : 'top-3'
                    )}
                  />
                </span>
              </button>
              <nav className="hidden gap-7 lg:flex">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      linkBase,
                      isActive(item.href) ? 'text-terra' : 'text-clay-dark hover:text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Centro: logo */}
            <Logo />

            {/* Derecha: cuenta + carrito */}
            <div className="flex items-center justify-end gap-5">
              {status === 'loading' ? (
                <span className="hidden h-3 w-16 animate-pulse rounded-full bg-ink/10 lg:block" />
              ) : session ? (
                <div className="hidden items-center gap-4 lg:flex">
                  {session.user.role === 'ADMIN' && (
                    <Link href={ROUTES.admin} className={cn(linkBase, 'text-terra hover:text-terra-dark')}>
                      Panel
                    </Link>
                  )}
                  <ProfileDropdown
                    name={session.user.name ?? ''}
                    email={session.user.email ?? ''}
                    role={session.user.role}
                  />
                </div>
              ) : (
                <Link
                  href={ROUTES.login}
                  className={cn(linkBase, 'hidden text-clay-dark hover:text-ink lg:inline')}
                >
                  Cuenta
                </Link>
              )}
              <button
                onClick={() => setDrawerOpen(true)}
                className="group flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-1.5 text-[10px] uppercase tracking-wide2 text-ink ring-1 ring-inset ring-ink/15 transition-all duration-500 ease-haptic hover:ring-ink/40 active:scale-[0.97] sm:gap-2 sm:pl-3 sm:text-[11px]"
                aria-label={`Abrir carrito, ${count} ${count === 1 ? 'artículo' : 'artículos'}`}
              >
                Carrito
                <span
                  className={cn(
                    'flex h-5 min-w-5 items-center justify-center rounded-full px-1 font-mono text-[10px] transition-colors duration-300',
                    count > 0 ? 'bg-terra text-bone-100' : 'bg-ink/[0.07] text-clay-dark'
                  )}
                >
                  {count}
                </span>
              </button>
            </div>
          </div>

          {/* Menú móvil: los enlaces suben escalonados desde una caja invisible. */}
          <nav
            className={cn(
              'grid overflow-hidden transition-all duration-500 ease-haptic lg:hidden',
              mobileOpen ? 'max-h-96 pb-5 pt-1 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: `${mobileOpen ? 80 + i * 60 : 0}ms` }}
                className={cn(
                  'py-2.5 text-xs uppercase tracking-wide2 transition-all duration-500 ease-haptic',
                  isActive(item.href) ? 'text-terra' : 'text-clay-dark',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                {session.user.role === 'ADMIN' && (
                  <Link
                    href={ROUTES.admin}
                    onClick={() => setMobileOpen(false)}
                    style={{ transitionDelay: `${mobileOpen ? 140 : 0}ms` }}
                    className={cn(
                      'py-2.5 text-xs uppercase tracking-wide2 text-terra transition-all duration-500 ease-haptic',
                      mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    )}
                  >
                    Panel de control
                  </Link>
                )}
                <div
                  style={{ transitionDelay: `${mobileOpen ? 200 : 0}ms` }}
                  className={cn(
                    'mt-2 border-t border-ink/10 pt-4 transition-all duration-500 ease-haptic',
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  )}
                >
                  <p className="text-xs font-medium text-ink">{session.user.name}</p>
                  <p className="mt-0.5 text-[11px] text-clay">{session.user.email}</p>
                  <Link
                    href={ROUTES.myOrders}
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 block text-xs uppercase tracking-wide2 text-clay-dark transition-colors hover:text-terra"
                  >
                    Mis pedidos
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      void signOut({ callbackUrl: '/' });
                    }}
                    className="mt-2.5 text-left text-xs uppercase tracking-wide2 text-clay-dark transition-colors hover:text-terra"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <Link
                href={ROUTES.login}
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: `${mobileOpen ? 140 : 0}ms` }}
                className={cn(
                  'py-2.5 text-xs uppercase tracking-wide2 text-clay-dark transition-all duration-500 ease-haptic',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
              >
                Cuenta
              </Link>
            )}
          </nav>
        </div>
      </Container>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
