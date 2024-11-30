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
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'min-price' | 'max-price';
}

export const getFilteredTours = async (
  filter: TourFilter,
  withPlaces = false,
  withSchedules = false
): Promise<Tour[]> => {
  try {
    const { agencyId, tourName, region, minPrice, maxPrice, sortBy } = filter;

    function getOrderBy(sortBy?: string) {
      if (!sortBy) return undefined;

      const sortOptions: Record<string, { [key: string]: 'asc' | 'desc' }> = {
        'min-price': { price: 'asc' },
        'max-price': { price: 'desc' },
        newest: { createdAt: 'desc' }
      };

      return sortOptions[sortBy];
    }

    const tours = await prisma.tour.findMany({
      where: {
        ...(agencyId && { agencyId }),
        ...(tourName && {
          tourName: { contains: tourName, mode: 'insensitive' }
        }),
        ...(region && { regions: { has: region } }),
        price: {
          gte: minPrice,
          lte: maxPrice
        }
      },
      orderBy: getOrderBy(sortBy),
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
  schedules?: Prisma.ScheduleCreateInput[];
}

export const createTour = async (data: CreateTourReq): Promise<Tour> => {
  try {
    const { places, schedules, ...tourWithoutPlaces } = data;

    const regions = places ? new Set(places.map((place) => place.region)) : [];
    const days = schedules
      ? new Set(schedules.map((schedule) => schedule.startDay))
      : [];

    return await prisma.tour.create({
      data: {
        ...tourWithoutPlaces,
        regions: regions instanceof Set ? Array.from(regions) : regions,
        days: days instanceof Set ? Array.from(days) : days,
        places: {
          create: places
        },
        schedules: {
          create: schedules
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
  withPlaces = true,
  withSchedules = true
): Promise<Tour> => {
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        tourId
      },
      include: {
        places: withPlaces,
        schedules: withSchedules
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
