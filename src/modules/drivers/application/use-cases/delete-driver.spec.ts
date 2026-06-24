import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError, NotFoundError } from "../../../../core/application";
import {
  createDriverRepositoryMock,
  createVehicleUsageRepositoryMock,
  DriverRepositoryMock,
  makeDriver,
  makeVehicleUsage,
  VehicleUsageRepositoryMock,
} from "./__mocks__/driver-use-case-test-helpers";
import { DeleteDriverUseCase } from "./delete-driver";

describe("DeleteDriverUseCase", () => {
  let driverRepository: DriverRepositoryMock;
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should delete a driver", async () => {
    driverRepository.findById.mockResolvedValue(makeDriver());
    vehicleUsageRepository.findActiveByDriverId.mockResolvedValue(null);
    const useCase = new DeleteDriverUseCase(driverRepository, vehicleUsageRepository);

    await useCase.execute("driver-1");

    expect(driverRepository.delete).toHaveBeenCalledWith("driver-1");
  });

  it("should throw when the driver does not exist", async () => {
    driverRepository.findById.mockResolvedValue(null);
    const useCase = new DeleteDriverUseCase(driverRepository, vehicleUsageRepository);

    await expect(useCase.execute("missing")).rejects.toThrow(
      new NotFoundError("Driver not found."),
    );
  });

  it("should throw when the driver is using an automobile", async () => {
    driverRepository.findById.mockResolvedValue(makeDriver());
    vehicleUsageRepository.findActiveByDriverId.mockResolvedValue(makeVehicleUsage());
    const useCase = new DeleteDriverUseCase(driverRepository, vehicleUsageRepository);

    await expect(useCase.execute("driver-1")).rejects.toThrow(
      new ConflictError("Driver is currently using an automobile."),
    );
  });
});
