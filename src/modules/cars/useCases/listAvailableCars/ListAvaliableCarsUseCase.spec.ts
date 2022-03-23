import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase"

let listAvaliableCarsUseCase: ListAvaliableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('List Cars', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi",
      description: "Carro com espaço",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Audi",
      category_id: ""
    })

    const cars = await listAvaliableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  });

  it("should be able to list all avaliable car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi2",
      description: "Carro com espaço2",
      daily_rate: 110.0,
      license_plate: "DEF-12342",
      fine_amount: 40,
      brand: "Audi21",
      category_id: ""
    })

    const cars = await listAvaliableCarsUseCase.execute({
      brand: "Audi21"
    })


    expect(cars).toEqual([car])
  })

  it("should be able to list all avaliable car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi2",
      description: "Carro com espaço2",
      daily_rate: 110.0,
      license_plate: "DEF-12342",
      fine_amount: 40,
      brand: "Audi21",
      category_id: ""
    })

    const cars = await listAvaliableCarsUseCase.execute({
      name: "Audi2"
    })


    expect(cars).toEqual([car])
  })

  it("should be able to list all avaliable car by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi2",
      description: "Carro com espaço2",
      daily_rate: 110.0,
      license_plate: "DEF-12342",
      fine_amount: 40,
      brand: "Audi21",
      category_id: "123"
    })

    const cars = await listAvaliableCarsUseCase.execute({
      category_id: "123"
    })


    expect(cars).toEqual([car])
  })
})