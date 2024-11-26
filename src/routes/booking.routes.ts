import { Router } from 'express';
import { makeBooking, showMyBookings } from '../controllers/booking.controller';
import { verifyAuthRequest } from '../middlewares/verifyAuthRequest';

const bookingRouter = Router();

bookingRouter.get('/bookings', verifyAuthRequest, showMyBookings);
bookingRouter.post('/bookings', verifyAuthRequest, makeBooking);

export default bookingRouter;
