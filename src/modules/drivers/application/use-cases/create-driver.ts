import { randomUUID } from "node:crypto";

import { Driver, DriverRepository } from "../../domain";
import { DriverDto, toDriverDto } from "../dtos/driver-dto";

export interface CreateDriverInput {
  name: string;
}

export class CreateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(input: CreateDriverInput): Promise<DriverDto> {
    const driver = Driver.create({
      id: randomUUID(),
      name: input.name,
    });

    await this.driverRepository.create(driver);

    return toDriverDto(driver);
  }
}
