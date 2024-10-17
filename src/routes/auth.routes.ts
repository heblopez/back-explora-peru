import { Router } from 'express';
import {
  loginUser,
  registerTourist,
  registerTravelAgency
} from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { newTravelAgencySchema } from '../schemas/agency.schema';
import { loginSchema } from '../schemas/login.schema';
import { newTouristSchema } from '../schemas/tourist.schema';

const authRouter = Router();

authRouter.post(
  '/register-tourist',
  validateRequest(newTouristSchema),
  registerTourist
);

authRouter.post(
  '/register-agency',
  validateRequest(newTravelAgencySchema),
  registerTravelAgency
);

authRouter.post('/login', validateRequest(loginSchema), loginUser);

export default authRouter;
