import type { User as UserModel } from '@prisma/client';

export type User = UserModel;

export interface UserEntry {
  email: string;
  password: string;
  phoneNumber: string;
}
