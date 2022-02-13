import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRespositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

  beforeEach(() => {
    categoriesRespositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRespositoryInMemory)
  })

  it("Should be albe to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description Test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRespositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id")
  })

  it("Shoud not be able to create two categories with the same name", async () => {

    expect(async () => {
      const category = {
        name: "Sedan",
        description: "Whit large trunk"
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

    }).rejects.toBeInstanceOf(AppError)
  })
})