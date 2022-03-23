import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({ brand, category_id, daily_rate, name, description, license_plate, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand, category_id, daily_rate, name, description, license_plate
    })

    this.cars.push(car);

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[] | undefined> {
    const cars = this.cars.filter((car) => {
      if (car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name))
        return car

      return null
    });

    return cars;
  }

  async findById(car_id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === car_id)
  }
}

export { CarsRepositoryInMemory }