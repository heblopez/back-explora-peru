import { PrismaClient, type Tourist } from '@prisma/client';
import bcrypt from 'bcrypt';
import type {
  ResRegisteredTourist,
  TouristEntry
} from '../schemas/tourist.schema';

const prisma = new PrismaClient();

export const createTourist = async (
  touristEntry: TouristEntry
): Promise<ResRegisteredTourist> => {
  try {
    const {
      password,
      birthdate,
      email,
      phoneNumber,
      ...additionalTouristData
    } = touristEntry;

    const hashedPassword = await bcrypt.hash(password, 10);
    const birthdateFmt = new Date(birthdate).toISOString();

    const userWithTourist = await prisma.user.create({
      data: {
        email,
        username: crypto.randomUUID(),
        password: hashedPassword,
        phoneNumber,
        tourist: {
          create: { birthdate: birthdateFmt, ...additionalTouristData }
        }
      },
      include: { tourist: true }
    });

    const { userId, password: _, tourist, ...dataUser } = userWithTourist;
    const { touristId, userId: __, ...dataTourist } = tourist as Tourist;
    return { ...dataUser, ...dataTourist };
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tourist');
  }
};
