import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}


interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[] | undefined>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }