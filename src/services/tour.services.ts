import { PrismaClient, type Tour } from '@prisma/client';

const _prisma = new PrismaClient();

export const getTours = async (): Promise<Tour[]> => {
  try {
    const tours = await _prisma.tour.findMany();
    return tours;
  } catch (error) {
    console.error(error);
    throw new Error('Error when getting the tours');
  }
};

export const createTour = async (data: Tour): Promise<Tour> => {
  try {
    return await _prisma.tour.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tour');
  }
};
