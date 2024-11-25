import { Router } from 'express';
import { findOrRegisterSession } from '../controllers/session.controller';
import { verifyAuthRequest } from '../middlewares/verifyAuthRequest';

const sessionRouter = Router();

sessionRouter.post('/sessions', verifyAuthRequest, findOrRegisterSession);

export default sessionRouter;
