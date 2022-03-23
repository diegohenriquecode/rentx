import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";

class ListAvaliableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvaliableCarsUseCase = container.resolve(ListAvaliableCarsUseCase);
    const cars = await listAvaliableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListAvaliableCarsController }