import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Diego Henrique Oliveira",
      email: "diego.vale@cadmus.com.br",
      password: "Cad@70684",
      driver_license: "098756"
    }

    await createUserUseCase.execute(user)

    const isUserAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(isUserAuthenticated).toHaveProperty("token")
  })

  it("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "qualquerum"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Diego",
        email: "diego.vale@cadmus.com.br",
        password: "Cad@70684",
        driver_license: "09173"
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})