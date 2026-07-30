import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Container } from '@presentation/components/ui/Container';
import { UserActions } from '@presentation/components/admin/UserActions';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';

export const metadata: Metadata = { title: 'Usuarios · Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(d);
}

const ROLE_LABELS: Record<string, string> = { ADMIN: 'Admin', CUSTOMER: 'Cliente' };
const ROLE_COLORS: Record<string, string> = { ADMIN: 'text-terra', CUSTOMER: 'text-clay-dark' };

export default async function AdminUsersPage() {
  const [session, users] = await Promise.all([
    getServerSession(authOptions),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        active: true,
        createdAt: true,
        _count: { select: { orders: true } }
      }
    })
  ]);

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-[2rem] font-light tracking-tighter2 text-ink sm:text-4xl">Usuarios</h1>
          <p className="mt-1 text-sm text-clay">{users.length} cuenta{users.length !== 1 ? 's' : ''} registrada{users.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="scroll-x-top">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.08] text-left text-[11px] uppercase tracking-wide2 text-clay">
                <th className="pb-3 pr-6">Nombre</th>
                <th className="pb-3 pr-6">Correo</th>
                <th className="pb-3 pr-6">Rol</th>
                <th className="pb-3 pr-6">Estado</th>
                <th className="pb-3 pr-6">Pedidos</th>
                <th className="pb-3 pr-6">Registro</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-ink/[0.05] hover:bg-ink/[0.03]">
                  <td className="py-3.5 pr-6 font-medium text-ink">{u.fullName}</td>
                  <td className="py-3.5 pr-6 text-clay-dark">{u.email}</td>
                  <td className={`py-3.5 pr-6 text-[11px] uppercase tracking-wide ${ROLE_COLORS[u.role] ?? 'text-clay'}`}>
                    {ROLE_LABELS[u.role] ?? u.role}
                  </td>
                  <td className="py-3.5 pr-6">
                    <span className={u.active ? 'text-green-400' : 'text-red-800'}>
                      {u.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-6 text-clay">{u._count.orders}</td>
                  <td className="py-3.5 pr-6 text-clay">{formatDate(u.createdAt)}</td>
                  <td className="py-3.5">
                    <UserActions
                      userId={u.id}
                      initialRole={u.role}
                      initialActive={u.active}
                      isSelf={u.id === session?.user?.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
