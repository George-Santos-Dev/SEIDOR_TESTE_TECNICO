import { NotFoundError } from "../../../../core/application";
import { VehicleUsageRepository } from "../../domain";
import { VehicleUsageDto, toVehicleUsageDto } from "../dtos/vehicle-usage-dto";

export interface FinishVehicleUsageInput {
  id: string;
  endedAt: Date;
}

export class FinishVehicleUsageUseCase {
  constructor(private readonly vehicleUsageRepository: VehicleUsageRepository) {}

  public async execute(input: FinishVehicleUsageInput): Promise<VehicleUsageDto> {
    const vehicleUsage = await this.vehicleUsageRepository.findById(input.id);

    if (!vehicleUsage) {
      throw new NotFoundError("Vehicle usage not found.");
    }

    vehicleUsage.finish(input.endedAt);
    await this.vehicleUsageRepository.update(vehicleUsage);

    return toVehicleUsageDto(vehicleUsage);
  }
}
