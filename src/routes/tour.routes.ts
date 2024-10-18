import { Router } from 'express';
import {
  registerTour,
  removeTour,
  showTourDetails,
  showTours,
  updateATour
} from '../controllers/tour.controller';

const tourRouter = Router();

tourRouter.post('/tours', registerTour);
tourRouter.get('/tours', showTours);
tourRouter.get('/tours/:tourId', showTourDetails);
tourRouter.patch('/tours/:tourId', updateATour);
tourRouter.delete('/tours/:tourId', removeTour);

export default tourRouter;
