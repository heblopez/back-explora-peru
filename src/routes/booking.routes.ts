import { Router } from 'express';
import { makeBooking } from '../controllers/booking.controller';
import { verifyAuthRequest } from '../middlewares/verifyAuthRequest';

const bookingRouter = Router();

bookingRouter.post('/bookings', verifyAuthRequest, makeBooking);

export default bookingRouter;
