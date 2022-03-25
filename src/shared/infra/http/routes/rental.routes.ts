import {Router} from 'express';
import { CreateRentalCarController } from '@modules/rentals/useCases/createRenal/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated';

const rentalRoutes = Router();
const createRentalCarController = new CreateRentalCarController();

rentalRoutes.post("/", ensureAuthenticated, createRentalCarController.handle)

export {rentalRoutes}