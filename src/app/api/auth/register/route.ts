import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/prisma';
import { checkRateLimit } from '@lib/rate-limit';
import { isValidEmail, isStrongPassword, passwordError, generateResetToken } from '@lib/auth-utils';
import { sendVerificationEmail } from '@lib/mailer';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';

  if (!checkRateLimit(`register:${ip}`, 5, 60 * 60 * 1000)) {
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

  const { email, password, fullName } = body as Record<string, unknown>;

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof fullName !== 'string' ||
    !email.trim() || !password || !fullName.trim()
  ) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  if (!isValidEmail(email.trim())) {
    return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 });
  }

  const pwdError = passwordError(password);
  if (!isStrongPassword(password)) {
    return NextResponse.json(
      { error: pwdError ?? 'Contraseña demasiado débil' },
      { status: 400 }
    );
  }

  if (fullName.trim().length < 2) {
    return NextResponse.json({ error: 'El nombre es demasiado corto' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  if (existing) {
    return NextResponse.json(
      { error: 'Ya existe una cuenta con ese correo' },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      passwordHash,
      role: 'CUSTOMER',
      emailVerified: false,
    },
    select: { id: true, email: true }
  });

  // Generar token de verificación (24h de validez)
  const token = generateResetToken();
  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  });

  await sendVerificationEmail(user.email, token);

  return NextResponse.json(
    { message: 'Revisa tu correo para confirmar tu cuenta.' },
    { status: 201 }
  );
}
