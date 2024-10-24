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

export interface TourFilter {
  agencyId?: number;
  tourName?: string;
  priceMin?: number;
  priceMax?: number;
}

export const getFilteredTours = async (
  filter: TourFilter,
  withPlaces = false,
  withSchedules = false
): Promise<Tour[]> => {
  try {
    const tours = await prisma.tour.findMany({
      where: {
        OR: [
          { agencyId: filter.agencyId },
          { tourName: { contains: filter.tourName } }
        ],
        AND: [
          { price: { gte: filter.priceMin } },
          { price: { lte: filter.priceMax } }
        ]
      },
      include: {
        places: withPlaces,
        schedules: withSchedules
      }
    });
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
        places: true,
        schedules: true
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error when creating the tour');
  }
};

export const getTourbyId = async (
  tourId: number,
  withPlaces = true
): Promise<Tour> => {
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        tourId
      },
      include: {
        places: withPlaces
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
