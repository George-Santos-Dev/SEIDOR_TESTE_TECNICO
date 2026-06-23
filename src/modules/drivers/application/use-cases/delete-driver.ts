import { ConflictError, NotFoundError } from "../../../../core/application";
import { DriverRepository } from "../../domain";
import { VehicleUsageRepository } from "../../../vehicle-usages/domain";

export class DeleteDriverUseCase {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly vehicleUsageRepository: VehicleUsageRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new NotFoundError("Driver not found.");
    }

    const activeVehicleUsage = await this.vehicleUsageRepository.findActiveByDriverId(id);

    if (activeVehicleUsage) {
      throw new ConflictError("Driver is currently using an automobile.");
    }

    await this.driverRepository.delete(id);
  }
}
