import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase {
  constructor(
    private carsRepository: ICarsRepository
  ) { }
  async execute(): Promise<Car[] | undefined> {
    const cars = await this.carsRepository.findAvailable()

    return cars;
  }
}

export { ListCarsUseCase }