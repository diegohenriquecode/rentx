import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import Router from 'express'
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()
const createCarController = new CreateCarController()
console.log("aqui")
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }