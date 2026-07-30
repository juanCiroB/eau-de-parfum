import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@lib/auth';
import { Container } from '@presentation/components/ui/Container';

const ADMIN_NAV = [
  { label: 'Panel', href: '/admin' },
  { label: 'Productos', href: '/admin/productos' },
  { label: 'Pedidos', href: '/admin/pedidos' },
  { label: 'Usuarios', href: '/admin/usuarios' },
  { label: 'Reportes', href: '/admin/reportes' },
  { label: 'Configuración', href: '/admin/configuracion' }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/');

  return (
    <div className="min-h-screen">
      {/* Barra de administración: cinta de tinta que separa el panel de la tienda. */}
      <div className="bg-ink text-bone">
        <Container>
          <div className="flex h-12 items-center gap-6 overflow-x-auto">
            <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-luxe text-terra-light ring-1 ring-inset ring-terra-light/30">
              Admin
            </span>
            <nav className="flex shrink-0 items-center gap-6" aria-label="Navegación del panel">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline-grow shrink-0 text-[10px] uppercase tracking-wide2 text-bone/60 transition-colors duration-300 hover:text-bone"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <span className="ml-auto shrink-0 whitespace-nowrap text-[10px] text-bone/40">
              {session.user.name}
            </span>
          </div>
        </Container>
      </div>
      {children}
    </div>
  );
}
