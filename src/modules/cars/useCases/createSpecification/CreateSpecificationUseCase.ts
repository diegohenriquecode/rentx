import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExistis = await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExistis)
      throw new Error("Specification already exisist!")

    await this.specificationsRepository.create({
      name, description
    })
  }
}

export { CreateSpecificationUseCase }