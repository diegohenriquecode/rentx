import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "Some car's description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Some car's brand",
      category_id: "uuidv4 of category"
    })

    expect(car).toHaveProperty("id")
  })

  it("Should not be able to create a new car with license plate existent", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 00",
        description: "Some car's description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Some car's brand",
        category_id: "uuidv4 of category"
      })

      await createCarUseCase.execute({
        name: "Car 01",
        description: "Some car's description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Some car's brand",
        category_id: "uuidv4 of category"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to create a new car with avaliable true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 00",
      description: "Some car's description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Some car's brand",
      category_id: "uuidv4 of category"
    })

    expect(car.available).toBe(true)
  })
})