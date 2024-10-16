import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { TravelAgency, TravelAgencyEntry } from '../models/TravelAgency';
import type { UserEntry } from '../models/User';

const prisma = new PrismaClient();

export const createTravelAgency = async (
  userEntry: UserEntry,
  agencyEntry: TravelAgencyEntry
): Promise<Omit<TravelAgency, 'userId' | 'travelAgencyId'>> => {
  try {
    const { password, ...userEntryWithoutPassword } = userEntry;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userWithAgency = await prisma.user.create({
      data: {
        username: crypto.randomUUID(),
        ...userEntryWithoutPassword,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        travelAgency: {
          create: agencyEntry
        }
      },
      include: {
        travelAgency: true
      }
    });

    let resAgencyData = {} as Omit<TravelAgency, 'userId' | 'travelAgencyId'>;
    const { userId, password: _, travelAgency, ...userData } = userWithAgency;
    if (travelAgency) {
      const { userId: _, travelAgencyId, ...agencyData } = travelAgency;
      resAgencyData = agencyData;
    }
    return { ...userData, ...resAgencyData };
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the travel agency');
  }
};
