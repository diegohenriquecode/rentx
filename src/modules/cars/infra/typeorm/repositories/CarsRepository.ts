import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }


  async create({ brand,
     category_id,
     daily_rate,
     description,
     fine_amount,
     license_plate,
     name,
     specifications,
     id,
    }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand, category_id, daily_rate, description, fine_amount, license_plate, name
    })

    await this.repository.save(car)

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      license_plate
    })

    return car;
  }

  async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[] | undefined> {

    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(car_id)
    return car;
  }

}

export { CarsRepository }