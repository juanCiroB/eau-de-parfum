import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { prisma } from '@lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  // Admin cannot modify their own account through this endpoint
  if (user.id === session.user.id) {
    return NextResponse.json({ error: 'No puedes modificar tu propia cuenta aquí' }, { status: 400 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { role, active } = body as Record<string, unknown>;
  const data: { role?: string; active?: boolean } = {};

  if (typeof role === 'string' && ['CUSTOMER', 'ADMIN'].includes(role)) {
    data.role = role;
  }
  if (typeof active === 'boolean') {
    data.active = active;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: params.id },
    data,
    select: { id: true, email: true, role: true, active: true }
  });

  return NextResponse.json(updated);
}
