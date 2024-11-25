import type { Request, Response } from 'express';
import {
  createTourSession,
  findOrCreateTourSession,
  getTourSessionsbyDate
} from '../services/session.services';

export const registerTourSession = async (req: Request, res: Response) => {
  try {
    const { tourId, startDate, endDate } = req.body;

    const newSession = await createTourSession({
      tourId: Number(tourId),
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    res.status(201).json({
      message: 'Tour session created successfully!',
      data: newSession
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to create the tour session' }]
    });
  }
};

export const getTourSessions = async (req: Request, res: Response) => {
  try {
    const { tourId, startDate, rangeOfDays } = req.query;

    if (!tourId) {
      res.status(400).json({
        errors: [{ message: 'The fiel tourId is required' }]
      });
    }

    const sessions = await getTourSessionsbyDate(
      Number(tourId),
      startDate ? new Date(startDate as string) : new Date(),
      Number(rangeOfDays || 0)
    );

    res.status(200).json({
      message: 'Tour sessions retrieved successfully!',
      data: sessions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to get the tour sessions' }]
    });
  }
};

export const findOrRegisterSession = async (req: Request, res: Response) => {
  try {
    const { tourId, startDate, endDate } = req.body;

    const session = await findOrCreateTourSession({
      tourId: Number(tourId),
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    res.status(200).json({
      message: 'Tour session found or created successfully!',
      data: session
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [
        { message: 'Error at trying to find or create the tour session' }
      ]
    });
  }
};
