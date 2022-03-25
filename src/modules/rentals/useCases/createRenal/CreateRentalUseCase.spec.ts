import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayJsDateProvider"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider)
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "010101",
      car_id: "889911",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new two rentals to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "diferent_car_id",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new two rentals to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "diferent_user_id",
        car_id: "car_id",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError)
  })
})