import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { TravelAgency, TravelAgencyEntry } from '../models/TravelAgency';
import type { UserEntry, UserWithRelations } from '../models/User';

const prisma = new PrismaClient();

export const createTravelAgency = async (
  userEntry: UserEntry,
  agencyEntry: TravelAgencyEntry
): Promise<Partial<UserWithRelations>> => {
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

    const { userId, password: _, travelAgency, ...dataUser } = userWithAgency;
    const {
      travelAgencyId,
      userId: __,
      ...dataAgency
    } = travelAgency as TravelAgency;
    return { ...dataUser, ...dataAgency };
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the travel agency');
  }
};
