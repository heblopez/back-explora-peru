import { Router } from 'express';
import { registerTour } from '../controllers/tour.controller';

const tourRouter = Router();

tourRouter.post('/register-tour', registerTour);

export default tourRouter;
