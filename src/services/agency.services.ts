import { PrismaClient, type TravelAgency } from '@prisma/client';
import bcrypt from 'bcrypt';
import type {
  ResRegisteredAgency,
  TravelAgencyEntry
} from '../schemas/agency.schema';

const prisma = new PrismaClient();

export const createTravelAgency = async (
  agencyEntry: TravelAgencyEntry
): Promise<ResRegisteredAgency> => {
  try {
    const { password, email, phoneNumber, ...additionalAgencyData } =
      agencyEntry;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userWithAgency = await prisma.user.create({
      data: {
        email,
        username: crypto.randomUUID(),
        password: hashedPassword,
        phoneNumber,
        travelAgency: {
          create: additionalAgencyData
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
