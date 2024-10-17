import type { Tourist as TouristModel } from '@prisma/client';
import type { $Enums } from '@prisma/client';

export type Tourist = TouristModel;

export interface TouristEntry {
  firstName: string;
  lastName: string;
  documentType: $Enums.DocumentType;
  documentNumber: string;
  birthdate: string;
  country?: string;
  gender?: string;
}
