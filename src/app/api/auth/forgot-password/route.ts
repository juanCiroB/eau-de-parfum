import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { checkRateLimit } from '@lib/rate-limit';
import { generateResetToken, isValidEmail } from '@lib/auth-utils';
import { sendPasswordResetEmail } from '@lib/mailer';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';

  if (!checkRateLimit(`forgot:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera un momento.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;

  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  // Siempre responder OK para no revelar si el email existe
  if (!user) return NextResponse.json({ ok: true });

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt }
  });

  await sendPasswordResetEmail(user.email, token);

  return NextResponse.json({ ok: true });
}
