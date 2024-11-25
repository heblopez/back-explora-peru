import { type Booking, PrismaClient } from '@prisma/client';
import { getTourSessionById } from './session.services';
import { getTourbyId } from './tour.services';

const prisma = new PrismaClient();

export const createBooking = async (data: {
  sessionId: number;
  touristId: number;
  totalPrice: number;
}): Promise<Booking> => {
  try {
    const { sessionId, touristId, totalPrice } = data;
    return await prisma.booking.create({
      data: {
        sessionId,
        touristId,
        totalPrice
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error creating the booking');
  }
};

export const createBookingAndUpdateSession = async (data: {
  sessionId: number;
  touristId: number;
  totalPrice: number;
  numberOfAttendees?: number;
}) => {
  try {
    const { sessionId, touristId, totalPrice } = data;
    return prisma.$transaction(async () => {
      const session = await getTourSessionById(sessionId);
      if (!session) throw new Error('404 - Session not found');

      const tour = await getTourbyId(session.tourId);
      if (!tour) throw new Error('404 - Tour not found');

      const { maxGroupSize } = tour;
      const numberOfAttendees = data.numberOfAttendees || 1;

      if (
        maxGroupSize &&
        session.reservedAttendees + numberOfAttendees > maxGroupSize
      )
        throw new Error(
          `403 - Not enough places available for making the booking with the given number of attendees. The maximum number of available places is ${maxGroupSize - session.reservedAttendees}`
        );

      const booking = await prisma.booking.create({
        data: {
          sessionId,
          touristId,
          totalPrice,
          numberOfAttendees
        }
      });

      const tourSession = await prisma.session.update({
        where: {
          sessionId
        },
        data: {
          reservedAttendees: {
            increment: numberOfAttendees
          }
        }
      });

      return { booking, tourSession };
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error creating the booking');
  }
};
