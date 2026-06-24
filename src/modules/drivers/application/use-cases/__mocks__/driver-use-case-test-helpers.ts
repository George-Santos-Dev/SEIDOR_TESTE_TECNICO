import { jest } from "@jest/globals";

import { Driver, DriverRepository } from "../../../domain";
import { CreateDriverProps } from "../../../domain/entities/driver";
import { VehicleUsage, VehicleUsageRepository } from "../../../../vehicle-usages/domain";
import { CreateVehicleUsageProps } from "../../../../vehicle-usages/domain/entities/vehicle-usage";

export type DriverRepositoryMock = jest.Mocked<DriverRepository>;
export type VehicleUsageRepositoryMock = jest.Mocked<VehicleUsageRepository>;

export function makeDriverOverrides(overrides: Partial<CreateDriverProps> = {}): CreateDriverProps {
  return {
    id: "driver-1",
    name: "Joao Silva",
    ...overrides,
  };
}

export function makeDriver(overrides: Partial<CreateDriverProps> = {}): Driver {
  return Driver.create(makeDriverOverrides(overrides));
}

export function createDriverRepositoryMock(
  overrides: Partial<DriverRepositoryMock> = {},
): DriverRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
    ...overrides,
  };
}

export function makeVehicleUsageOverrides(
  overrides: Partial<CreateVehicleUsageProps> = {},
): CreateVehicleUsageProps {
  return {
    id: "usage-1",
    automobileId: "auto-1",
    driverId: "driver-1",
    reason: "Visit",
    startedAt: new Date("2026-06-23T10:00:00.000Z"),
    ...overrides,
  };
}

export function makeVehicleUsage(overrides: Partial<CreateVehicleUsageProps> = {}): VehicleUsage {
  return VehicleUsage.create(makeVehicleUsageOverrides(overrides));
}

export function createVehicleUsageRepositoryMock(
  overrides: Partial<VehicleUsageRepositoryMock> = {},
): VehicleUsageRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
    findActiveByAutomobileId: jest.fn(),
    findActiveByDriverId: jest.fn(),
    ...overrides,
  };
}
