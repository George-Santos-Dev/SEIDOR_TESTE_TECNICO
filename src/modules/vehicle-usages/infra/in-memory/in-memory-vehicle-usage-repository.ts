import { VehicleUsage, VehicleUsageFilters, VehicleUsageRepository } from "../../domain";

export class InMemoryVehicleUsageRepository implements VehicleUsageRepository {
  private readonly vehicleUsages = new Map<string, VehicleUsage>();

  public async create(vehicleUsage: VehicleUsage): Promise<void> {
    this.vehicleUsages.set(this.getRequiredId(vehicleUsage), vehicleUsage);
  }

  public async update(vehicleUsage: VehicleUsage): Promise<void> {
    this.vehicleUsages.set(this.getRequiredId(vehicleUsage), vehicleUsage);
  }

  public async findById(id: string): Promise<VehicleUsage | null> {
    return this.vehicleUsages.get(id) ?? null;
  }

  public async findMany(filters?: VehicleUsageFilters): Promise<VehicleUsage[]> {
    return Array.from(this.vehicleUsages.values()).filter((vehicleUsage) => {
      if (filters?.startedAtFrom && vehicleUsage.startedAt < filters.startedAtFrom) {
        return false;
      }

      if (filters?.startedAtTo && vehicleUsage.startedAt > filters.startedAtTo) {
        return false;
      }

      if (
        filters?.endedAtFrom &&
        (!vehicleUsage.endedAt || vehicleUsage.endedAt < filters.endedAtFrom)
      ) {
        return false;
      }

      if (
        filters?.endedAtTo &&
        (!vehicleUsage.endedAt || vehicleUsage.endedAt > filters.endedAtTo)
      ) {
        return false;
      }

      return true;
    });
  }

  public async findActiveByAutomobileId(automobileId: string): Promise<VehicleUsage | null> {
    return (
      Array.from(this.vehicleUsages.values()).find(
        (vehicleUsage) => vehicleUsage.automobileId === automobileId && vehicleUsage.isActive(),
      ) ?? null
    );
  }

  public async findActiveByDriverId(driverId: string): Promise<VehicleUsage | null> {
    return (
      Array.from(this.vehicleUsages.values()).find(
        (vehicleUsage) => vehicleUsage.driverId === driverId && vehicleUsage.isActive(),
      ) ?? null
    );
  }

  private getRequiredId(vehicleUsage: VehicleUsage): string {
    const id = vehicleUsage.getId();

    if (!id) {
      throw new Error("Vehicle usage ID is required.");
    }

    return id;
  }
}
