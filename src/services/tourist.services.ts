import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { Tourist, TouristEntry } from '../models/Tourist';
import type { UserEntry, UserWithRelations } from '../models/User';

const prisma = new PrismaClient();

export const createTourist = async (
  userEntry: UserEntry,
  TouristEntry: TouristEntry
): Promise<Partial<UserWithRelations>> => {
  try {
    const { password, ...userEntryWithoutPassword } = userEntry;
    const hashedPassword = await bcrypt.hash(password, 10);

    let { birthdate, ...touristEntryWithoutBirthdate } = TouristEntry;
    birthdate = new Date(birthdate).toISOString();

    const userWithTourist = await prisma.user.create({
      data: {
        username: crypto.randomUUID(),
        ...userEntryWithoutPassword,
        password: hashedPassword,
        createdAt: new Date(),
        tourist: {
          create: { birthdate, ...touristEntryWithoutBirthdate }
        }
      },
      include: {
        tourist: true
      }
    });

    const { userId, password: _, tourist, ...dataUser } = userWithTourist;
    const { touristId, userId: __, ...dataTourist } = tourist as Tourist;
    return { ...dataUser, ...dataTourist };
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tourist');
  }
};
