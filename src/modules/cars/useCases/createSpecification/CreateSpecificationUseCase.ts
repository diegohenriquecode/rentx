import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

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
      throw new AppError("Specification already exisist!")

    await this.specificationsRepository.create({
      name, description
    })
  }
}

export { CreateSpecificationUseCase }