import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/enshureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';



const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', ensureAuthenticated, ensureAdmin, listCategoriesController.handle)

categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle)



export { categoriesRoutes }