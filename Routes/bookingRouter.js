import express from 'express';
import { autoUpdateCustomers, getReservations, makeBooking, removeReservation, updateBooking, viewRentalBooking } from '../controllers/bookingController.js';
import { protect } from '../controllers/authController.js';

export const bookingRouter = express.Router();
bookingRouter.use( protect );
bookingRouter.post('/booking', makeBooking);
bookingRouter.get('/viewRentalBooking/:id', viewRentalBooking);
bookingRouter.get('/allReservation', getReservations);
bookingRouter.patch('/updateReservations/:id',updateBooking)
bookingRouter.delete('/removeReservations/:id',removeReservation)


bookingRouter.post('/customers', autoUpdateCustomers)
