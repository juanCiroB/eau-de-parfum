import type { UserId } from '@shared/types';
import type { Address } from './Address';

export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface User {
  readonly id: UserId;
  readonly email: string;
  readonly fullName: string;
  readonly role: UserRole;
  readonly addresses: Address[];
  readonly createdAt: string; // ISO 8601
}
