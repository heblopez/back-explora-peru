import { PrismaClient } from '@prisma/client';
import type { Tourist, TouristEntry } from '../models/Tourist';

const prisma = new PrismaClient();

export const createTourist = async (
  userId: number,
  data: TouristEntry
): Promise<Omit<Tourist, 'userId' | 'touristId'>> => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        userId
      }
    });

    if (!userFound) {
      throw new Error('User not found');
    }

    data.birthdate = new Date(data.birthdate).toISOString();

    const tourist = await prisma.tourist.create({
      data: {
        user: {
          connect: userFound
        },
        ...data
      }
    });

    const { userId: _, touristId, ...touristData } = tourist;
    return touristData;
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tourist');
  }
};
