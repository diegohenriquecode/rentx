import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase

describe("Create Rental", () => {

  beforeEach(() => {
    createRentalUseCase = new CreateRentalUseCase()
  })

  it("should be able to create a new rental", async () => {
    await createRentalUseCase.execute();
  })
})