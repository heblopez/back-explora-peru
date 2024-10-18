import { type Prisma, PrismaClient, type Tour } from '@prisma/client';

const prisma = new PrismaClient();

export const getTours = async (): Promise<Tour[]> => {
  try {
    const tours = await prisma.tour.findMany();
    return tours;
  } catch (error) {
    console.error(error);
    throw new Error('Error when getting the tours');
  }
};

export interface CreateTourReq extends Tour {
  places?: Prisma.PlaceCreateInput[];
}

export const createTour = async (data: CreateTourReq): Promise<Tour> => {
  try {
    const { places, ...tourWithoutPlaces } = data;

    return await prisma.tour.create({
      data: {
        ...tourWithoutPlaces,
        places: {
          create: places
        }
      },
      include: {
        places: true
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tour');
  }
};

export const getTourbyId = async (tourId: number): Promise<Tour> => {
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        tourId
      }
    });

    if (!tour) {
      throw new Error('Tour not found');
    }

    return tour;
  } catch (error) {
    console.error(error);
    throw new Error('Error at finding the tour by id');
  }
};

export const updateTour = async (tourId: number, data: Tour): Promise<Tour> => {
  try {
    return await prisma.tour.update({
      where: {
        tourId
      },
      data
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error at updating the tour');
  }
};

export const deleteTour = async (tourId: number): Promise<Tour> => {
  try {
    return await prisma.tour.delete({
      where: {
        tourId
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error at deleting the tour');
  }
};