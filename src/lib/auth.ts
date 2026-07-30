import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/prisma';
import { checkRateLimit } from '@lib/rate-limit';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Rate limit por IP — 10 intentos cada 15 minutos
        const rawIp = req.headers?.['x-forwarded-for'] ?? req.headers?.['x-real-ip'] ?? 'unknown';
        const ip = rawIp.split(',')[0]?.trim() ?? 'unknown';

        if (!checkRateLimit(`login:ip:${ip}`, 10, 15 * 60 * 1000)) {
          throw new Error('RateLimit');
        }

        const email = credentials.email.toLowerCase().trim();

        // 2. Buscar usuario
        const user = await prisma.user.findUnique({ where: { email } });

        // 3. Cuenta desactivada
        if (user && !user.active) {
          throw new Error('AccountInactive');
        }

        // 4. Correo no verificado
        if (user && !user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        // 5. Cuenta bloqueada por intentos fallidos
        if (user?.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('AccountLocked');
        }

        // 6. Verificar contraseña (timing-safe: siempre llama bcrypt aunque el user no exista)
        const dummyHash = '$2b$12$invalidhashforcomparisonpurposes000000000000000000000';
        const valid = user
          ? await bcrypt.compare(credentials.password, user.passwordHash)
          : await bcrypt.compare(credentials.password, dummyHash).then(() => false);

        if (!valid) {
          // Incrementar contador de fallos en la cuenta (si existe)
          if (user) {
            const newAttempts = user.loginAttempts + 1;
            await prisma.user.update({
              where: { id: user.id },
              data: {
                loginAttempts: newAttempts,
                lockedUntil: newAttempts >= 5
                  ? new Date(Date.now() + 15 * 60 * 1000)
                  : null
              }
            });
          }
          return null; // Error genérico — no revela si el correo existe
        }

        if (!user) return null; // nunca ocurre (valid sería false), pero satisface TS

        // 7. Login exitoso: limpiar contador
        if (user.loginAttempts > 0 || user.lockedUntil) {
          await prisma.user.update({
            where: { id: user.id },
            data: { loginAttempts: 0, lockedUntil: null }
          });
        }

        return { id: user.id, email: user.email, name: user.fullName, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role; }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { session.user.id = token.id; session.user.role = token.role; }
      return session;
    }
  },
  pages: { signIn: '/login', error: '/login' }
};
