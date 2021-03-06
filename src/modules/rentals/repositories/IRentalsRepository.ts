import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenrentalByUser(user_id: string): Promise<Rental | undefined>;
  create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental>
}

export {IRentalsRepository}