import type { Request, Response } from 'express';
import { createBookingAndUpdateSession } from '../services/booking.services';

export const makeBooking = async (req: Request, res: Response) => {
  try {
    const { sessionId, touristId, totalPrice } = req.body;

    const result = await createBookingAndUpdateSession({
      sessionId: Number(sessionId),
      touristId: Number(touristId),
      totalPrice: Number(totalPrice)
    });

    res.status(201).json({
      message: 'Booking created successfully!',
      data: {
        booking: result.booking,
        tourSession: result.tourSession
      }
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message.includes('403')) {
      res.status(403).json({
        errors: [{ message: error.message }]
      });
    }

    res.status(500).json({
      errors: [{ message: 'Error at trying to create the booking' }]
    });
  }
};
