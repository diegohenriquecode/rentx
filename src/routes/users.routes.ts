import { Router } from 'express'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController()

userRoutes.post('/users', createUserController.handle)

export { userRoutes }