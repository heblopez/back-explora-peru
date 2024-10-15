import { Router } from 'express';
import { registerTourist } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register-tourist', registerTourist);

export default authRouter;
