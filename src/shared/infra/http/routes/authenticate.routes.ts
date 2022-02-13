import { AuthenticateUserControlle } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserControlle()

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }