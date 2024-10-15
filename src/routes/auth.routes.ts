import { Router } from 'express';
import { loginUser, registerTourist } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { loginSchema } from '../validators/login.schema';
import { newTouristSchema } from '../validators/tourist.schema';

const authRouter = Router();

authRouter.post(
  '/register-tourist',
  validateRequest(newTouristSchema),
  registerTourist
);

authRouter.post('/login', validateRequest(loginSchema), loginUser);

export default authRouter;
