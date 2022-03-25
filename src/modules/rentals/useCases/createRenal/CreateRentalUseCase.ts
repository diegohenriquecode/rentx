
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (carUnavaliable) {
      throw new AppError("Car is unvaliable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenrentalByUser(user_id)
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user");
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if (compare < minimumHour) {
      throw new AppError("Invalid return time")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental;
  }
}

export { CreateRentalUseCase }