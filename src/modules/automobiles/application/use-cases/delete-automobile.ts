import { ConflictError, NotFoundError } from "../../../../core/application";
import { AutomobileRepository } from "../../domain";
import { VehicleUsageRepository } from "../../../vehicle-usages/domain";

export class DeleteAutomobileUseCase {
  constructor(
    private readonly automobileRepository: AutomobileRepository,
    private readonly vehicleUsageRepository: VehicleUsageRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const automobile = await this.automobileRepository.findById(id);

    if (!automobile) {
      throw new NotFoundError("Automobile not found.");
    }

    const activeVehicleUsage = await this.vehicleUsageRepository.findActiveByAutomobileId(id);

    if (activeVehicleUsage) {
      throw new ConflictError("Automobile is currently in use.");
    }

    await this.automobileRepository.delete(id);
  }
}
