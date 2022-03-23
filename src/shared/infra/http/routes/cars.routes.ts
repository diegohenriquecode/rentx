import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvaliablecarsController'
import Router from 'express'
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()
const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

export { carsRoutes }