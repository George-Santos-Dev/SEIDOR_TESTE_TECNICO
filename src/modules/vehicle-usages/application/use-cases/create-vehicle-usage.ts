import { randomUUID } from "node:crypto";

import { ConflictError, NotFoundError } from "../../../../core/application";
import { AutomobileRepository } from "../../../automobiles/domain";
import { DriverRepository } from "../../../drivers/domain";
import { VehicleUsage, VehicleUsageRepository } from "../../domain";
import { VehicleUsageDto, toVehicleUsageDto } from "../dtos/vehicle-usage-dto";

export interface CreateVehicleUsageInput {
  automobileId: string;
  driverId: string;
  reason: string;
  startedAt: Date;
}

export class CreateVehicleUsageUseCase {
  constructor(
    private readonly vehicleUsageRepository: VehicleUsageRepository,
    private readonly automobileRepository: AutomobileRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(input: CreateVehicleUsageInput): Promise<VehicleUsageDto> {
    const automobile = await this.automobileRepository.findById(input.automobileId);

    if (!automobile) {
      throw new NotFoundError("Automobile not found.");
    }

    const driver = await this.driverRepository.findById(input.driverId);

    if (!driver) {
      throw new NotFoundError("Driver not found.");
    }

    const activeAutomobileUsage = await this.vehicleUsageRepository.findActiveByAutomobileId(
      input.automobileId,
    );

    if (activeAutomobileUsage) {
      throw new ConflictError("Automobile is already in use.");
    }

    const activeDriverUsage = await this.vehicleUsageRepository.findActiveByDriverId(
      input.driverId,
    );

    if (activeDriverUsage) {
      throw new ConflictError("Driver is already using another automobile.");
    }

    const vehicleUsage = VehicleUsage.create({
      id: randomUUID(),
      automobileId: input.automobileId,
      driverId: input.driverId,
      reason: input.reason,
      startedAt: input.startedAt,
    });

    await this.vehicleUsageRepository.create(vehicleUsage);

    return toVehicleUsageDto(vehicleUsage);
  }
}
