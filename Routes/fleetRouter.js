import express from 'express';
import { getRentals, addToFleet, updateFleet, removeRental, getRental, availableRental } from '../controllers/fleetController.js';

export const fleetRouter = express.Router();

fleetRouter.get('/all-fleet', getRentals);
fleetRouter.get('/getRental/:id', getRental);
fleetRouter.post('/add-rental', addToFleet);
fleetRouter.patch('/updateRental/:id', updateFleet);
fleetRouter.delete('/removeRental/:id', removeRental);

fleetRouter.patch('/availableRental/:id', availableRental);

