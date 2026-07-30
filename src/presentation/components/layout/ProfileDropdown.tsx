'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ROUTES } from '@shared/constants';
import { cn } from '@shared/utils/cn';

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  CUSTOMER: 'Cliente'
};

export function ProfileDropdown({
  name,
  email,
  role
}: {
  name: string;
  email: string;
  role: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  /** Iniciales del titular: evita el círculo de avatar genérico. */
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors duration-300 hover:bg-ink/[0.05]"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Abrir menú de perfil"
      >
        {/* Rounded square, no círculo. */}
        <span className="flex h-7 w-7 items-center justify-center rounded-[0.5rem] bg-ink text-[10px] font-medium tracking-wide text-bone">
          {initials || '—'}
        </span>
        <svg
          className={cn('h-2 w-2.5 text-clay transition-transform duration-500 ease-haptic', open && 'rotate-180')}
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      <div
        role="menu"
        className={cn(
          'absolute right-0 top-full z-drawer mt-3 w-64 origin-top-right overflow-hidden rounded-core bg-bone-100 shadow-lift-lg ring-1 ring-inset ring-ink/[0.08]',
          'transition-all duration-300 ease-haptic',
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1.5 scale-[0.97] opacity-0'
        )}
      >
        <div className="border-b border-ink/[0.07] px-5 py-4">
          <p className="text-sm font-medium text-ink">{name}</p>
          <p className="mt-0.5 truncate text-xs text-clay">{email}</p>
          <span className="mt-2.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-luxe text-terra ring-1 ring-inset ring-terra/25">
            {ROLE_LABELS[role] ?? role}
          </span>
        </div>

        <div className="p-2">
          <Link
            href={ROUTES.myOrders}
            onClick={() => setOpen(false)}
            className="block rounded-full px-3 py-2 text-[11px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:bg-ink/[0.05] hover:text-ink"
          >
            Mis pedidos
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              void signOut({ callbackUrl: '/' });
            }}
            className="w-full rounded-full px-3 py-2 text-left text-[11px] uppercase tracking-wide2 text-clay-dark transition-colors duration-300 hover:bg-terra/[0.08] hover:text-terra"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
