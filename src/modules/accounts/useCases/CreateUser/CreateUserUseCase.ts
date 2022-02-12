import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  async execute({ driver_license, email, name, password, username }: ICreateUserDTO): Promise<void> {
    const emailAlreayExistis = await this.userRepository.findByEmail(email)

    if (emailAlreayExistis) {
      throw new Error("User already existis")
    }

    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
      username
    })
  }
}

export { CreateUserUseCase }