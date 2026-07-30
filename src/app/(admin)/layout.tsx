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
      <div className="border-b border-ivory/10 bg-noir-800">
        <Container>
          <div className="flex h-12 items-center gap-6 overflow-x-auto">
            <span className="shrink-0 text-[11px] uppercase tracking-wide2 text-gold">Admin</span>
            <span className="h-3 w-px shrink-0 bg-ivory/20" />
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 text-[11px] uppercase tracking-wide2 text-smoke-light transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <span className="ml-auto shrink-0 text-[11px] text-smoke">
              {session.user.name}
            </span>
          </div>
        </Container>
      </div>
      {children}
    </div>
  );
}
