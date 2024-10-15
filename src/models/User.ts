import type { User as UserModel } from '@prisma/client';
import type { Tourist } from './Tourist';
import type { TravelAgency } from './TravelAgency';

export type User = UserModel;

export interface UserEntry {
  email: string;
  password: string;
  phoneNumber: string;
}

export type UserWithRelations = User & {
  tourist?: Tourist;
  travelAgency?: TravelAgency;
};
