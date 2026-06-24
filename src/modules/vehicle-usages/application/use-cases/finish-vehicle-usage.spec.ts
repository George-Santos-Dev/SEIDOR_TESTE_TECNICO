import { beforeEach, describe, expect, it } from "@jest/globals";

import { NotFoundError } from "../../../../core/application";
import { DomainError } from "../../../../core/domain";
import {
  createVehicleUsageRepositoryMock,
  makeVehicleUsage,
  VehicleUsageRepositoryMock,
} from "./__mocks__/vehicle-usage-use-case-test-helpers";
import { FinishVehicleUsageUseCase } from "./finish-vehicle-usage";

describe("FinishVehicleUsageUseCase", () => {
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should finish a vehicle usage", async () => {
    const vehicleUsage = makeVehicleUsage();
    vehicleUsageRepository.findById.mockResolvedValue(vehicleUsage);
    const useCase = new FinishVehicleUsageUseCase(vehicleUsageRepository);

    const result = await useCase.execute({
      id: "usage-1",
      endedAt: new Date("2026-06-23T18:00:00.000Z"),
    });

    expect(vehicleUsageRepository.update).toHaveBeenCalledWith(vehicleUsage);
    expect(result.endedAt).toEqual(new Date("2026-06-23T18:00:00.000Z"));
  });

  it("should throw when the vehicle usage does not exist", async () => {
    vehicleUsageRepository.findById.mockResolvedValue(null);
    const useCase = new FinishVehicleUsageUseCase(vehicleUsageRepository);

    await expect(
      useCase.execute({
        id: "missing",
        endedAt: new Date("2026-06-23T18:00:00.000Z"),
      }),
    ).rejects.toThrow(new NotFoundError("Vehicle usage not found."));
  });

  it("should throw when the usage is already finished", async () => {
    vehicleUsageRepository.findById.mockResolvedValue(
      makeVehicleUsage({
        endedAt: new Date("2026-06-23T12:00:00.000Z"),
      }),
    );
    const useCase = new FinishVehicleUsageUseCase(vehicleUsageRepository);

    await expect(
      useCase.execute({
        id: "usage-1",
        endedAt: new Date("2026-06-23T18:00:00.000Z"),
      }),
    ).rejects.toThrow(new DomainError("Vehicle usage is already finished."));
  });
});
