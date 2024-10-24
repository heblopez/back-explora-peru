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
    throw new Error('Error creating the session');
  }
};

export const getTourSessions = async (
  tourId?: number,
  date?: Date | string
) => {
  if (!tourId && !date) {
    return await prisma.session.findMany();
  }

  return await prisma.session.findMany({
    where: {
      AND: [{ tourId }, { sessionDate: date }]
    }
  });
};
