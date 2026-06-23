import { NotFoundError } from "../../../../core/application";
import { DriverRepository } from "../../domain";
import { DriverDto, toDriverDto } from "../dtos/driver-dto";

export class GetDriverByIdUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(id: string): Promise<DriverDto> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new NotFoundError("Driver not found.");
    }

    return toDriverDto(driver);
  }
}
