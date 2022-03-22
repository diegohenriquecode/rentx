import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/enshureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("/tmp/avatar"))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch("/avatar", uploadAvatar.single("avatar"), ensureAuthenticated, updateUserAvatarController.handle)

export { usersRoutes }