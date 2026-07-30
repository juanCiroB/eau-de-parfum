import type { UserRepository } from '@domain/repositories/UserRepository';
import type { User, UserRole } from '@domain/entities/User';
import type { UserId } from '@shared/types';
import { prisma } from '@lib/prisma';

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    if (!row) return null;
    return this.toEntity(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (!row) return null;
    return this.toEntity(row);
  }

  private toEntity(row: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    createdAt: Date;
  }): User {
    return {
      id: row.id as UserId,
      email: row.email,
      fullName: row.fullName,
      role: row.role as UserRole,
      addresses: [],
      createdAt: row.createdAt.toISOString()
    };
  }
}
