import { randomUUID } from "node:crypto";

import { ConflictError, normalizeString } from "../../../../core/application";
import { Driver, DriverRepository } from "../../domain";
import { DriverDto, toDriverDto } from "../dtos/driver-dto";

export interface CreateDriverInput {
  name: string;
}

export class CreateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(input: CreateDriverInput): Promise<DriverDto> {
    const existingDrivers = await this.driverRepository.findMany({ name: input.name });
    const hasDuplicatedName = existingDrivers.some(
      (driver) => normalizeString(driver.name) === normalizeString(input.name),
    );

    if (hasDuplicatedName) {
      throw new ConflictError("Driver with this name already exists.");
    }

    const driver = Driver.create({
      id: randomUUID(),
      name: input.name,
    });

    await this.driverRepository.create(driver);

    return toDriverDto(driver);
  }
}
