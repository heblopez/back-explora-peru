import type { Tour } from '@prisma/client';
import type { Request, Response } from 'express';
import { createTour } from '../services/tour.services';

export const registerTour = async (req: Request, res: Response) => {
  try {
    const dataNewTour = req.body as Tour;

    const newTour = await createTour(dataNewTour);

    res.status(201).json({
      message: 'Tour registered successfully!',
      data: newTour
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at registering the tour' }] });
  }
};
