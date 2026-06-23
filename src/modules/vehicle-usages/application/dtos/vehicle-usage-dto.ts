import { VehicleUsage } from "../../domain";

export interface VehicleUsageDto {
  id: string;
  automobileId: string;
  driverId: string;
  reason: string;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailedVehicleUsageDto extends VehicleUsageDto {
  driverName: string;
  automobile: {
    id: string;
    plate: string;
    color: string;
    brand: string;
  };
}

export function toVehicleUsageDto(vehicleUsage: VehicleUsage): VehicleUsageDto {
  return {
    id: vehicleUsage.getId() as string,
    automobileId: vehicleUsage.automobileId,
    driverId: vehicleUsage.driverId,
    reason: vehicleUsage.reason,
    startedAt: vehicleUsage.startedAt,
    endedAt: vehicleUsage.endedAt,
    createdAt: vehicleUsage.createdAt,
    updatedAt: vehicleUsage.updatedAt,
  };
}
