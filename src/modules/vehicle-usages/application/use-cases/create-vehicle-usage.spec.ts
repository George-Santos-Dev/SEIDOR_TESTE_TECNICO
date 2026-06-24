import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError, NotFoundError } from "../../../../core/application";
import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  createDriverRepositoryMock,
  createVehicleUsageRepositoryMock,
  DriverRepositoryMock,
  makeAutomobile,
  makeDriver,
  makeVehicleUsage,
  VehicleUsageRepositoryMock,
} from "./__mocks__/vehicle-usage-use-case-test-helpers";
import { CreateVehicleUsageUseCase } from "./create-vehicle-usage";

describe("CreateVehicleUsageUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;
  let driverRepository: DriverRepositoryMock;
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
    driverRepository = createDriverRepositoryMock();
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should create a vehicle usage", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    driverRepository.findById.mockResolvedValue(makeDriver());
    vehicleUsageRepository.findActiveByAutomobileId.mockResolvedValue(null);
    vehicleUsageRepository.findActiveByDriverId.mockResolvedValue(null);
    const useCase = new CreateVehicleUsageUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    const result = await useCase.execute({
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: "Visit",
      startedAt: new Date("2026-06-23T10:00:00.000Z"),
    });

    expect(vehicleUsageRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        automobileId: "auto-1",
        driverId: "driver-1",
        reason: "Visit",
      }),
    );
    expect(result).toMatchObject({
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: "Visit",
      endedAt: null,
    });
  });

  it("should throw when the automobile does not exist", async () => {
    automobileRepository.findById.mockResolvedValue(null);
    const useCase = new CreateVehicleUsageUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    await expect(
      useCase.execute({
        automobileId: "missing",
        driverId: "driver-1",
        reason: "Visit",
        startedAt: new Date("2026-06-23T10:00:00.000Z"),
      }),
    ).rejects.toThrow(new NotFoundError("Automobile not found."));
  });

  it("should throw when the driver does not exist", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    driverRepository.findById.mockResolvedValue(null);
    const useCase = new CreateVehicleUsageUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    await expect(
      useCase.execute({
        automobileId: "auto-1",
        driverId: "missing",
        reason: "Visit",
        startedAt: new Date("2026-06-23T10:00:00.000Z"),
      }),
    ).rejects.toThrow(new NotFoundError("Driver not found."));
  });

  it("should throw when the automobile is already in use", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    driverRepository.findById.mockResolvedValue(
      makeDriver({ id: "driver-2", name: "Driver driver-2" }),
    );
    vehicleUsageRepository.findActiveByAutomobileId.mockResolvedValue(makeVehicleUsage());
    const useCase = new CreateVehicleUsageUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    await expect(
      useCase.execute({
        automobileId: "auto-1",
        driverId: "driver-2",
        reason: "Visit",
        startedAt: new Date("2026-06-23T11:00:00.000Z"),
      }),
    ).rejects.toThrow(new ConflictError("Automobile is already in use."));
  });

  it("should throw when the driver is already using another automobile", async () => {
    automobileRepository.findById.mockResolvedValue(
      makeAutomobile({ id: "auto-2", plate: "BRA2E45" }),
    );
    driverRepository.findById.mockResolvedValue(makeDriver());
    vehicleUsageRepository.findActiveByAutomobileId.mockResolvedValue(null);
    vehicleUsageRepository.findActiveByDriverId.mockResolvedValue(makeVehicleUsage());
    const useCase = new CreateVehicleUsageUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    await expect(
      useCase.execute({
        automobileId: "auto-2",
        driverId: "driver-1",
        reason: "Visit",
        startedAt: new Date("2026-06-23T11:00:00.000Z"),
      }),
    ).rejects.toThrow(new ConflictError("Driver is already using another automobile."));
  });
});
