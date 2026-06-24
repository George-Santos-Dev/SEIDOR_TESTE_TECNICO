import { DetailedVehicleUsageDto, VehicleUsageDto } from "../modules/vehicle-usages/application";

export function createVehicleUsageDtoMock(
  overrides: Partial<VehicleUsageDto> = {},
): VehicleUsageDto {
  return {
    id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617",
    automobileId: "de5d8441-7673-458e-9339-6ebd7e624f68",
    driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
    reason: "Visita a cliente",
    startedAt: new Date("2026-06-23T10:00:00.000Z"),
    endedAt: null,
    createdAt: new Date("2026-06-23T10:00:00.000Z"),
    updatedAt: new Date("2026-06-23T10:00:00.000Z"),
    ...overrides,
  };
}

export function createDetailedVehicleUsageDtoMock(
  overrides: Partial<DetailedVehicleUsageDto> & {
    automobile?: Partial<DetailedVehicleUsageDto["automobile"]>;
  } = {},
): DetailedVehicleUsageDto {
  const { automobile, ...restOverrides } = overrides;

  return {
    ...createVehicleUsageDtoMock(),
    driverName: "Joao Silva",
    automobile: {
      id: "de5d8441-7673-458e-9339-6ebd7e624f68",
      plate: "ABC1D23",
      color: "Branco",
      brand: "Toyota",
      ...automobile,
    },
    ...restOverrides,
  };
}
