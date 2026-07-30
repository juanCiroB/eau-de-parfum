import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/prisma';
import { authOptions } from '@lib/auth';
import { isValidEmail, isStrongPassword, passwordError } from '@lib/auth-utils';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { currentPassword, newEmail, newPassword } = body as Record<string, unknown>;

  if (typeof currentPassword !== 'string' || !currentPassword) {
    return NextResponse.json({ error: 'Debes confirmar tu contraseña actual.' }, { status: 400 });
  }

  const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!admin) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'La contraseña actual es incorrecta.' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};

  if (typeof newEmail === 'string' && newEmail.trim()) {
    if (!isValidEmail(newEmail.trim())) {
      return NextResponse.json({ error: 'El nuevo correo no es válido.' }, { status: 400 });
    }
    const taken = await prisma.user.findUnique({ where: { email: newEmail.toLowerCase().trim() } });
    if (taken && taken.id !== admin.id) {
      return NextResponse.json({ error: 'Ese correo ya está en uso.' }, { status: 409 });
    }
    updates.email = newEmail.toLowerCase().trim();
    updates.emailVerified = true;
  }

  if (typeof newPassword === 'string' && newPassword) {
    const err = passwordError(newPassword);
    if (!isStrongPassword(newPassword)) {
      return NextResponse.json({ error: err ?? 'Contraseña demasiado débil.' }, { status: 400 });
    }
    if (newPassword === currentPassword) {
      return NextResponse.json({ error: 'La nueva contraseña debe ser diferente a la actual.' }, { status: 400 });
    }
    updates.passwordHash = await bcrypt.hash(newPassword, 12);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No hay cambios que guardar.' }, { status: 400 });
  }

  await prisma.user.update({ where: { id: admin.id }, data: updates });

  return NextResponse.json({ ok: true });
}
