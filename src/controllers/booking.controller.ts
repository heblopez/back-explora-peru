import type { Request, Response } from 'express';
import { AuthReqHasValues } from '../middlewares/verifyAuthRequest';
import { createBookingAndUpdateSession } from '../services/booking.services';

export const makeBooking = async (req: Request, res: Response) => {
  try {
    const { touristId } = AuthReqHasValues(req, 'touristId');
    const { sessionId, numberOfAttendees, totalPrice } = req.body;

    const result = await createBookingAndUpdateSession({
      sessionId: Number(sessionId),
      touristId: touristId,
      totalPrice: Number(totalPrice),
      ...(numberOfAttendees && { numberOfAttendees: Number(numberOfAttendees) })
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
