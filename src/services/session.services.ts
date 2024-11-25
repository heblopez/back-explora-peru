import { PrismaClient, type Session } from '@prisma/client';

const prisma = new PrismaClient();

export const createTourSession = async (data: {
  tourId: number;
  startDate: Date | string;
  endDate: Date | string;
}): Promise<Session> => {
  try {
    const { tourId, startDate, endDate } = data;

    return await prisma.session.create({
      data: {
        tourId,
        startDate,
        endDate
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
    const filterStartDate = new Date(date as string);
    filterStartDate.setHours(0, 0, 0, 0);

    const filterEndDate = new Date(date as string);
    filterEndDate.setHours(23, 59, 59, 999);

    if (rangeOfDays)
      filterEndDate.setDate(filterEndDate.getDate() + rangeOfDays);

    return await prisma.session.findMany({
      where: {
        AND: [
          { tourId },
          {
            startDate: {
              gte: filterStartDate,
              lte: filterEndDate
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
  startDate: Date | string
): Promise<Session | null> => {
  try {
    return await prisma.session.findUnique({
      where: {
        tourId_startDate: {
          tourId,
          startDate
        }
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error finding the tour session');
  }
};

export const getTourSessionById = async (
  sessionId: number
): Promise<Session | null> => {
  try {
    return await prisma.session.findUnique({
      where: {
        sessionId
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error finding the tour session');
  }
};
