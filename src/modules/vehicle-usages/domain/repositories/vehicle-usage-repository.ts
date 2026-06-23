import { VehicleUsage } from "../entities/vehicle-usage";

export interface VehicleUsageFilters {
  startedAtFrom?: Date;
  startedAtTo?: Date;
  endedAtFrom?: Date;
  endedAtTo?: Date;
}

export interface VehicleUsageRepository {
  create(vehicleUsage: VehicleUsage): Promise<void>;
  update(vehicleUsage: VehicleUsage): Promise<void>;
  findById(id: string): Promise<VehicleUsage | null>;
  findMany(filters?: VehicleUsageFilters): Promise<VehicleUsage[]>;
  findActiveByAutomobileId(automobileId: string): Promise<VehicleUsage | null>;
  findActiveByDriverId(driverId: string): Promise<VehicleUsage | null>;
}
