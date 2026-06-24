import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError, NotFoundError } from "../../../../core/application";
import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  createVehicleUsageRepositoryMock,
  makeAutomobile,
  makeVehicleUsage,
  VehicleUsageRepositoryMock,
} from "./__mocks__/automobile-use-case-test-helpers";
import { DeleteAutomobileUseCase } from "./delete-automobile";

describe("DeleteAutomobileUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;
  let vehicleUsageRepository: VehicleUsageRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
    vehicleUsageRepository = createVehicleUsageRepositoryMock();
  });

  it("should delete an automobile", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    vehicleUsageRepository.findActiveByAutomobileId.mockResolvedValue(null);
    const useCase = new DeleteAutomobileUseCase(automobileRepository, vehicleUsageRepository);

    await useCase.execute("auto-1");

    expect(automobileRepository.delete).toHaveBeenCalledWith("auto-1");
  });

  it("should throw when the automobile does not exist", async () => {
    automobileRepository.findById.mockResolvedValue(null);
    const useCase = new DeleteAutomobileUseCase(automobileRepository, vehicleUsageRepository);

    await expect(useCase.execute("missing")).rejects.toThrow(
      new NotFoundError("Automobile not found."),
    );
  });

  it("should throw when the automobile is in use", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    vehicleUsageRepository.findActiveByAutomobileId.mockResolvedValue(makeVehicleUsage());
    const useCase = new DeleteAutomobileUseCase(automobileRepository, vehicleUsageRepository);

    await expect(useCase.execute("auto-1")).rejects.toThrow(
      new ConflictError("Automobile is currently in use."),
    );
  });
});
