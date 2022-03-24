import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvaliablecarsController'
import Router from 'express'
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

carsRoutes.post('/specifications/:id', createCarSpecificationController.handle)

export { carsRoutes }