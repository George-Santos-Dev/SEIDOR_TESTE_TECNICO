import { ConflictError, normalizeString, NotFoundError } from "../../../../core/application";
import { DriverRepository } from "../../domain";
import { DriverDto, toDriverDto } from "../dtos/driver-dto";

export interface UpdateDriverInput {
  id: string;
  name: string;
}

export class UpdateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(input: UpdateDriverInput): Promise<DriverDto> {
    const driver = await this.driverRepository.findById(input.id);

    if (!driver) {
      throw new NotFoundError("Driver not found.");
    }

    const driversWithSameName = await this.driverRepository.findMany({ name: input.name });
    const hasDuplicatedName = driversWithSameName.some(
      (item) =>
        item.getId() !== input.id && normalizeString(item.name) === normalizeString(input.name),
    );

    if (hasDuplicatedName) {
      throw new ConflictError("Driver with this name already exists.");
    }

    driver.updateName(input.name);
    await this.driverRepository.update(driver);

    return toDriverDto(driver);
  }
}
