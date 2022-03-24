import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  })

  it("Should not be able to add a new specification to a non-existent the car", async () => {
    expect(async () => {
      const car_id = "012389";
      const specifications_id = ["9q8w74"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Some car's description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Some car's brand",
      category_id: "uuidv4 of category"
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Test",
      name: "Name Test"
    })

    const specifications_id = [specification.id as string];

    const specificationCars = await createCarSpecificationUseCase.execute({ 
      car_id: car.id, 
      specifications_id 
    })

    expect(specificationCars).toHaveProperty("specifications")
    expect(specificationCars.specifications.length).toBe(1)
  })
})