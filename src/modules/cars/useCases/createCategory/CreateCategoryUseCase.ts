import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { inject, injectable } from 'tsyringe'

interface IRquest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({ name, description }: IRquest): Promise<void> {

    const categoryAlreadyExistis = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExistis)
      throw new Error("Category already exisist!")

    this.categoriesRepository.create({ name, description })
  }
}


export { CreateCategoryUseCase }