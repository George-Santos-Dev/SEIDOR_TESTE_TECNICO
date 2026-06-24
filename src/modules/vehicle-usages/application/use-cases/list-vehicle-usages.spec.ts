import { beforeEach, describe, expect, it } from "@jest/globals";

import { NotFoundError } from "../../../../core/application";
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
import { ListVehicleUsagesUseCase } from "./list-vehicle-usages";

describe("ListVehicleUsagesUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;
  let driverRepository: DriverRepositoryMock;
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
    driverRepository = createDriverRepositoryMock();
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should list vehicle usages with detailed relations", async () => {
    vehicleUsageRepository.findMany.mockResolvedValue([makeVehicleUsage()]);
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    driverRepository.findById.mockResolvedValue(makeDriver());
    const useCase = new ListVehicleUsagesUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    const result = await useCase.execute({
      startedAtFrom: new Date("2026-06-23T00:00:00.000Z"),
    });

    expect(vehicleUsageRepository.findMany).toHaveBeenCalledWith({
      startedAtFrom: new Date("2026-06-23T00:00:00.000Z"),
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "usage-1",
      driverName: "Driver driver-1",
      automobile: {
        id: "auto-1",
        plate: "ABC1D23",
      },
    });
  });

  it("should throw when the usage relationship is inconsistent", async () => {
    vehicleUsageRepository.findMany.mockResolvedValue([
      makeVehicleUsage({
        automobileId: "missing-auto",
        driverId: "missing-driver",
      }),
    ]);
    automobileRepository.findById.mockResolvedValue(null);
    driverRepository.findById.mockResolvedValue(null);
    const useCase = new ListVehicleUsagesUseCase(
      vehicleUsageRepository,
      automobileRepository,
      driverRepository,
    );

    await expect(useCase.execute()).rejects.toThrow(
      new NotFoundError("Vehicle usage relationship is inconsistent."),
    );
  });
});
