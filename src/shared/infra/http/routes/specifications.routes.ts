import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/enshureAuthenticated";
import { Router } from "express";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()


specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/specifications', createSpecificationController.handle)

export { specificationsRoutes }