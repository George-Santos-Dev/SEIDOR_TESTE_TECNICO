import { jest } from "@jest/globals";

import { Automobile, AutomobileRepository } from "../../../domain";
import { CreateAutomobileProps } from "../../../domain/entities/automobile";
import { VehicleUsage, VehicleUsageRepository } from "../../../../vehicle-usages/domain";
import { CreateVehicleUsageProps } from "../../../../vehicle-usages/domain/entities/vehicle-usage";

export type AutomobileRepositoryMock = jest.Mocked<AutomobileRepository>;
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
