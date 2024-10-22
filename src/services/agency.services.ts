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
        role: 'agency',
        travelAgency: { create: additionalAgencyData }
      },
      include: { travelAgency: true }
    });

    const {
      userId,
      username,
      email: _email,
      password: _pw,
      phoneNumber: _phone,
      travelAgency,
      ...otherUserData
    } = userWithAgency;
    const {
      travelAgencyId,
      userId: _,
      ...dataAgency
    } = travelAgency as TravelAgency;
    return { username, email, phoneNumber, ...dataAgency, ...otherUserData };
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the travel agency');
  }
};
