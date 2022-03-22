import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/enshureAuthenticated";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()


// specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/specifications', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }