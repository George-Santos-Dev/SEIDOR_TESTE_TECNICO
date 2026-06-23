import { NotFoundError } from "../../../../core/application";
import { VehicleUsageRepository } from "../../domain";
import { VehicleUsageDto, toVehicleUsageDto } from "../dtos/vehicle-usage-dto";

export class GetVehicleUsageByIdUseCase {
  constructor(private readonly vehicleUsageRepository: VehicleUsageRepository) {}

  public async execute(id: string): Promise<VehicleUsageDto> {
    const vehicleUsage = await this.vehicleUsageRepository.findById(id);

    if (!vehicleUsage) {
      throw new NotFoundError("Vehicle usage not found.");
    }

    return toVehicleUsageDto(vehicleUsage);
  }
}
