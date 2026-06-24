import { jest } from "@jest/globals";

import { Automobile, AutomobileRepository } from "../../../../automobiles/domain";
import { CreateAutomobileProps } from "../../../../automobiles/domain/entities/automobile";
import { Driver, DriverRepository } from "../../../../drivers/domain";
import { CreateDriverProps } from "../../../../drivers/domain/entities/driver";
import { VehicleUsage, VehicleUsageRepository } from "../../../domain";
import { CreateVehicleUsageProps } from "../../../domain/entities/vehicle-usage";

export type AutomobileRepositoryMock = jest.Mocked<AutomobileRepository>;
export type DriverRepositoryMock = jest.Mocked<DriverRepository>;
export type VehicleUsageRepositoryMock = jest.Mocked<VehicleUsageRepository>;

export function makeAutomobileOverrides(
  overrides: Partial<CreateAutomobileProps> = {},
): CreateAutomobileProps {
  return {
    id: "auto-1",
    plate: "ABC1D23",
    color: "Branco",
    brand: "Toyota",
    ...overrides,
  };
}

export function makeAutomobile(overrides: Partial<CreateAutomobileProps> = {}): Automobile {
  return Automobile.create(makeAutomobileOverrides(overrides));
}

export function createAutomobileRepositoryMock(
  overrides: Partial<AutomobileRepositoryMock> = {},
): AutomobileRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
    ...overrides,
  };
}

export function makeDriverOverrides(overrides: Partial<CreateDriverProps> = {}): CreateDriverProps {
  return {
    id: "driver-1",
    name: "Driver driver-1",
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
