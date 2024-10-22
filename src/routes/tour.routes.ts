import { Router } from 'express';
import {
  registerTour,
  removeTour,
  showMyTours,
  showTourDetails,
  showTours,
  updateATour
} from '../controllers/tour.controller';
import { verifyAuthRequest } from '../middlewares/verifyAuthRequest';

const tourRouter = Router();

tourRouter.post('/tours', verifyAuthRequest, registerTour);
tourRouter.get('/tours', showTours);
tourRouter.get('/tours/admin', verifyAuthRequest, showMyTours);
tourRouter.get('/tours/:tourId', showTourDetails);
tourRouter.patch('/tours/:tourId', verifyAuthRequest, updateATour);
tourRouter.delete('/tours/:tourId', verifyAuthRequest, removeTour);

export default tourRouter;
