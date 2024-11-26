import type { Request, Response } from 'express';
import { AuthReqHasValues } from '../middlewares/verifyAuthRequest';
import {
  createBookingAndUpdateSession,
  getBookingsByTourist
} from '../services/booking.services';

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

export const showMyBookings = async (req: Request, res: Response) => {
  try {
    const { touristId } = AuthReqHasValues(req, 'touristId');

    if (!touristId) {
      res.status(403).json({
        errors: [
          { message: 'Only authenticated tourists can get their bookings' }
        ]
      });
      return;
    }

    const bookings = await getBookingsByTourist(touristId);

    res.status(200).json({
      message: 'Bookings retrieved successfully!',
      data: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to get the bookings' }]
    });
  }
};
