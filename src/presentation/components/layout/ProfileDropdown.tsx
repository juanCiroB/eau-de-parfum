'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ROUTES } from '@shared/constants';

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
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
        aria-expanded={open}
      >
        Perfil
        <svg
          className={`h-2.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-64 border border-ivory/10 bg-noir-800 shadow-2xl">
          {/* Info del usuario */}
          <div className="border-b border-ivory/10 px-5 py-4">
            <p className="text-sm font-medium text-ivory">{name}</p>
            <p className="mt-0.5 text-xs text-smoke">{email}</p>
            <span className="mt-2 inline-block text-[10px] uppercase tracking-widest text-gold">
              {ROLE_LABELS[role] ?? role}
            </span>
          </div>

          {/* Acciones */}
          <div className="px-5 py-3 space-y-1">
            <Link
              href={ROUTES.myOrders}
              onClick={() => setOpen(false)}
              className="block w-full py-2 text-left text-[11px] uppercase tracking-wide2 text-smoke transition-colors hover:text-gold"
            >
              Mis pedidos
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                void signOut({ callbackUrl: '/' });
              }}
              className="w-full py-2 text-left text-[11px] uppercase tracking-wide2 text-smoke transition-colors hover:text-gold"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
