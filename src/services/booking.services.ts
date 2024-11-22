import { type Booking, PrismaClient } from '@prisma/client';

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
