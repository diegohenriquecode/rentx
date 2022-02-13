import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { getRepository, Repository } from "typeorm"
import { User } from "../typeorm/entities/User"


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)

    return user
  }


  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne(email)

    return user
  }

  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    })

    await this.repository.save(user)
  }
}

export { IUsersRepository, UsersRepository }