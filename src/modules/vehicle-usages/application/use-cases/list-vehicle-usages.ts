import { NotFoundError } from "../../../../core/application";
import { AutomobileRepository } from "../../../automobiles/domain";
import { DriverRepository } from "../../../drivers/domain";
import { VehicleUsageFilters, VehicleUsageRepository } from "../../domain";
import { DetailedVehicleUsageDto, toVehicleUsageDto } from "../dtos/vehicle-usage-dto";

export class ListVehicleUsagesUseCase {
  constructor(
    private readonly vehicleUsageRepository: VehicleUsageRepository,
    private readonly automobileRepository: AutomobileRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(filters?: VehicleUsageFilters): Promise<DetailedVehicleUsageDto[]> {
    const vehicleUsages = await this.vehicleUsageRepository.findMany(filters);

    return Promise.all(
      vehicleUsages.map(async (vehicleUsage) => {
        const [automobile, driver] = await Promise.all([
          this.automobileRepository.findById(vehicleUsage.automobileId),
          this.driverRepository.findById(vehicleUsage.driverId),
        ]);

        if (!automobile || !driver) {
          throw new NotFoundError("Vehicle usage relationship is inconsistent.");
        }

        return {
          ...toVehicleUsageDto(vehicleUsage),
          driverName: driver.name,
          automobile: {
            id: automobile.getId() as string,
            plate: automobile.plate,
            color: automobile.color,
            brand: automobile.brand,
          },
        };
      }),
    );
  }
}
