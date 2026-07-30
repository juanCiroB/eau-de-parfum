'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { ProfileDropdown } from './ProfileDropdown';
import { Container } from '@presentation/components/ui/Container';
import { Logo } from '@presentation/components/ui/Logo';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@presentation/hooks/useCart';
import { ROUTES } from '@shared/constants';
import { cn } from '@shared/utils/cn';

const NAV = [{ label: 'Catálogo', href: ROUTES.catalog }];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-ivory/8 bg-noir/95 backdrop-blur">
      <Container>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
          {/* Izquierda: navegación / menú móvil */}
          <div className="flex items-center">
            <button
              className="mr-2 text-ivory lg:hidden"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block h-px w-6 bg-ivory" />
              <span className="mt-1.5 block h-px w-6 bg-ivory" />
              <span className="mt-1.5 block h-px w-4 bg-ivory" />
            </button>
            <nav className="hidden gap-7 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
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
              <span className="hidden h-3 w-16 animate-pulse rounded bg-ivory/10 sm:block" />
            ) : session ? (
              <div className="hidden items-center gap-4 sm:flex">
                {session.user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-[11px] uppercase tracking-wide2 text-gold transition-colors hover:text-gold-light"
                  >
                    Panel de control
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
                className="hidden text-[11px] uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold sm:inline"
              >
                Cuenta
              </Link>
            )}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative text-[11px] uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
              aria-label={`Abrir carrito, ${count} artículos`}
            >
              Carrito
              {count > 0 && (
                <span className="absolute -right-4 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-noir">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <nav
          className={cn(
            'grid gap-1 overflow-hidden transition-all duration-300 lg:hidden',
            mobileOpen ? 'max-h-72 pb-4' : 'max-h-0'
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-xs uppercase tracking-wide2 text-smoke-light"
            >
              {item.label}
            </Link>
          ))}
          {session ? (
            <>
              {session.user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-xs uppercase tracking-wide2 text-gold"
                >
                  Panel de control
                </Link>
              )}
              <div className="border-t border-ivory/10 pt-3">
                <p className="text-xs font-medium text-ivory">{session.user.name}</p>
                <p className="mt-0.5 text-[11px] text-smoke">{session.user.email}</p>
                <Link
                  href={ROUTES.myOrders}
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block text-xs uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
                >
                  Mis pedidos
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    void signOut({ callbackUrl: '/' });
                  }}
                  className="mt-2 text-left text-xs uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <Link
              href={ROUTES.login}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-xs uppercase tracking-wide2 text-smoke-light"
            >
              Cuenta
            </Link>
          )}
        </nav>
      </Container>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
