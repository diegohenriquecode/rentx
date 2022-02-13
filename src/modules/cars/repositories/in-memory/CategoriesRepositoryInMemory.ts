import { response } from "express";
import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name)

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = this.categories;

    return categories
  }
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}

export { CategoriesRepositoryInMemory }