import { Router } from 'express';
import { updateUserData } from '../controllers/user.controller';
import { verifyAuthRequest } from '../middlewares/verifyAuthRequest';

const userRouter = Router();

userRouter.patch('/users', verifyAuthRequest, updateUserData);

export default userRouter;
