import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { checkRateLimit } from '@lib/rate-limit';
import { isValidEmail, generateResetToken } from '@lib/auth-utils';
import { sendVerificationEmail } from '@lib/mailer';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';

  if (!checkRateLimit(`resend-verify:${ip}`, 3, 60 * 60 * 1000)) {
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
    return NextResponse.json({ error: 'Correo inválido' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  // No revelar si el correo existe
  if (!user) return NextResponse.json({ ok: true });

  if (user.emailVerified) {
    return NextResponse.json(
      { error: 'Este correo ya fue verificado. Puedes iniciar sesión.' },
      { status: 400 }
    );
  }

  // Borrar tokens anteriores y crear uno nuevo
  await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });

  const token = generateResetToken();
  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  });

  await sendVerificationEmail(user.email, token);

  return NextResponse.json({ ok: true });
}
