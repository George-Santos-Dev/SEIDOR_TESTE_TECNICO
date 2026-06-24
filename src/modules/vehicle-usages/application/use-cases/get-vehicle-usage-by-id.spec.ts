import { beforeEach, describe, expect, it } from "@jest/globals";

import { NotFoundError } from "../../../../core/application";
import {
  createVehicleUsageRepositoryMock,
  makeVehicleUsage,
  VehicleUsageRepositoryMock,
} from "./__mocks__/vehicle-usage-use-case-test-helpers";
import { GetVehicleUsageByIdUseCase } from "./get-vehicle-usage-by-id";

describe("GetVehicleUsageByIdUseCase", () => {
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should get a vehicle usage by id", async () => {
    vehicleUsageRepository.findById.mockResolvedValue(makeVehicleUsage());
    const useCase = new GetVehicleUsageByIdUseCase(vehicleUsageRepository);

    const result = await useCase.execute("usage-1");

    expect(vehicleUsageRepository.findById).toHaveBeenCalledWith("usage-1");
    expect(result).toMatchObject({
      id: "usage-1",
      automobileId: "auto-1",
      driverId: "driver-1",
    });
  });

  it("should throw when the vehicle usage does not exist", async () => {
    vehicleUsageRepository.findById.mockResolvedValue(null);
    const useCase = new GetVehicleUsageByIdUseCase(vehicleUsageRepository);

    await expect(useCase.execute("missing")).rejects.toThrow(
      new NotFoundError("Vehicle usage not found."),
    );
  });
});
