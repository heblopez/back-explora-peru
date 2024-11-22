import { PrismaClient, type Session } from '@prisma/client';

const prisma = new PrismaClient();

export const createTourSession = async (data: {
  tourId: number;
  sessionDate: Date | string;
}): Promise<Session> => {
  try {
    const { tourId, sessionDate } = data;

    return await prisma.session.create({
      data: {
        tourId,
        sessionDate
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error creating the tour session');
  }
};

export const getTourSessionsbyDate = async (
  tourId: number,
  date: Date | string,
  rangeOfDays?: number
): Promise<Session[]> => {
  try {
    const startDate = new Date(date as string);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date as string);
    endDate.setHours(23, 59, 59, 999);

    if (rangeOfDays) endDate.setDate(endDate.getDate() + rangeOfDays);

    return await prisma.session.findMany({
      where: {
        AND: [
          { tourId },
          {
            sessionDate: {
              gte: startDate,
              lte: endDate
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting the tour sessions');
  }
};

export const findTourSession = async (
  tourId: number,
  sessionDate: Date | string
): Promise<Session | null> => {
  try {
    return await prisma.session.findUnique({
      where: {
        tourId_sessionDate: {
          tourId,
          sessionDate
        }
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error finding the tour session');
  }
};
