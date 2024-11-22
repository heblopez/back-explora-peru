import type { Request, Response } from 'express';
import { createBookingAndUpdateSession } from '../services/booking.services';

export const makeBooking = async (req: Request, res: Response) => {
  try {
    const { sessionId, touristId, totalPrice } = req.body;

    const newBooking = await createBookingAndUpdateSession({
      sessionId: Number(sessionId),
      touristId: Number(touristId),
      totalPrice: Number(totalPrice)
    });

    res.status(201).json({
      message: 'Booking created successfully!',
      data: newBooking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to create the booking' }]
    });
  }
};
