import { DriverFilters, DriverRepository } from "../../domain";
import { DriverDto, toDriverDto } from "../dtos/driver-dto";

export class ListDriversUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(filters?: DriverFilters): Promise<DriverDto[]> {
    const drivers = await this.driverRepository.findMany(filters);

    return drivers.map(toDriverDto);
  }
}
