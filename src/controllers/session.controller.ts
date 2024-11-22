import type { Request, Response } from 'express';
import {
  createTourSession,
  getTourSessionsbyDate
} from '../services/session.services';

export const registerTourSession = async (req: Request, res: Response) => {
  try {
    const { tourId, sessionDate } = req.body;

    const newSession = await createTourSession({
      tourId: Number(tourId),
      sessionDate: new Date(sessionDate)
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
    const { tourId, sessionDate, rangeOfDays } = req.query;

    if (!tourId) {
      res.status(400).json({
        errors: [{ message: 'The fiel tourId is required' }]
      });
    }

    const sessions = await getTourSessionsbyDate(
      Number(tourId),
      sessionDate ? new Date(sessionDate as string) : new Date(),
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
