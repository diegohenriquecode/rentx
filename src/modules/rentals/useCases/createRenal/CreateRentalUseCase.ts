import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ) { }

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<void> {
    const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (carUnavaliable) {
      throw new AppError("Car is unvaliable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenrentalByUser(user_id)
    if (carUnavaliable) {
      throw new AppError("User unvaliable to do a new rental");
    }

  }
}

export { CreateRentalUseCase }