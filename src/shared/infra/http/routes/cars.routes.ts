import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { UploadCarImageController } from '@modules/cars/useCases/UploadCarImage/UploadCarImageController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvaliablecarsController'
import Router from 'express'
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import multer from 'multer'
import uploadConfig from '@config/upload'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const uploadCarsImage = multer(uploadConfig.upload("/tmp/cars"))

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

carsRoutes.post('/specifications/:id', createCarSpecificationController.handle)

carsRoutes.post(
  '/images/:id', 
  ensureAuthenticated, 
  ensureAdmin, 
  uploadCarsImage.array('images'),
  uploadCarImageController.handle
)

export { carsRoutes }