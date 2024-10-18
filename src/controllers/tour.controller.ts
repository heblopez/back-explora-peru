import type { Tour } from '@prisma/client';
import type { Request, Response } from 'express';
import {
  AuthReqHasValues,
  type AuthRequest
} from '../middlewares/verifyAuthRequest';
import {
  type CreateTourReq,
  createTour,
  deleteTour,
  getTourbyId,
  getTours,
  updateTour
} from '../services/tour.services';

export const showTours = async (_req: Request, res: Response) => {
  try {
    const tours = await getTours();

    res.status(200).json({
      message: 'Tours retrieved successfully!',
      data: tours
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at listing the tours' }] });
  }
};

export const registerTour = async (req: AuthRequest, res: Response) => {
  try {
    const { travelAgencyId } = AuthReqHasValues(req, 'travelAgencyId');

    const dataNewTour = req.body as CreateTourReq;
    dataNewTour.agencyId = travelAgencyId as number;
    const newTour = await createTour(dataNewTour);

    res.status(201).json({
      message: 'Tour registered successfully!',
      data: newTour
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at trying to register the tour' }] });
  }
};

export const showTourDetails = async (req: Request, res: Response) => {
  try {
    const { tourId } = req.params;

    const tour = await getTourbyId(Number(tourId));

    res.status(200).json({
      message: 'Tour retrieved successfully!',
      data: tour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to get the tour details' }]
    });
  }
};

export const updateATour = async (req: AuthRequest, res: Response) => {
  try {
    const { travelAgencyId } = AuthReqHasValues(req, 'travelAgencyId');
    const { tourId } = req.params;
    const dataToUpdate = req.body as Tour;

    if (!tourId) {
      throw new Error('Error: Tour Id is required');
    }

    if (!dataToUpdate) {
      throw new Error('Error: Data to be updated is required');
    }

    const currentTour = await getTourbyId(Number(tourId), false);
    if (currentTour.agencyId !== travelAgencyId) {
      res.status(403).json({
        errors: [{ message: 'You are not authorized to update this tour' }]
      });
    }

    const { createdAt, updatedAt, tourId: _, ...currentData } = currentTour;
    const dataToSend = { ...currentData, ...dataToUpdate };
    const updatedTour = await updateTour(Number(tourId), dataToSend);

    res.status(200).json({
      message: 'Tour updated successfully!',
      data: updatedTour
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at trying to update the tour' }] });
  }
};

export const removeTour = async (req: AuthRequest, res: Response) => {
  try {
    const { travelAgencyId } = AuthReqHasValues(req, 'travelAgencyId');
    const { tourId } = req.params;

    const currentTour = await getTourbyId(Number(tourId));
    if (currentTour.agencyId !== travelAgencyId) {
      res.status(403).json({
        errors: [{ message: 'You are not authorized to delete this tour' }]
      });
    }

    const deletedTour = await deleteTour(Number(tourId));

    res.status(200).json({
      message: 'Tour deleted successfully!',
      data: deletedTour
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at trying to delete the tour' }] });
  }
};
