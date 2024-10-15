import { Router } from 'express';
import { registerTourist } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { newTouristSchema } from '../validators/tourist.schema';

const authRouter = Router();

authRouter.post(
  '/register-tourist',
  validateRequest(newTouristSchema),
  registerTourist
);

export default authRouter;
