import type { TravelAgency as TravelAgencyModel } from '@prisma/client';

export type TravelAgency = TravelAgencyModel;

export interface TravelAgencyEntry {
  agencyName: string;
  agencyDescription?: string;
  ruc: string;
  address: string;
  website?: string;
}
