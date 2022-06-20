import { inject, injectable } from "tsyringe";

import { deleteFile } from "@utils/file";
import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) { }

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    if (user?.avatar) user.avatar = avatarFile;

    if (user) await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }