

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenrentalByUser(user_id: string): Promise<Rental>;
}