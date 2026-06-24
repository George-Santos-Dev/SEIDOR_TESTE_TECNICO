import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError, NotFoundError } from "../../../../core/application";
import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  makeAutomobile,
} from "./__mocks__/automobile-use-case-test-helpers";
import { UpdateAutomobileUseCase } from "./update-automobile";

describe("UpdateAutomobileUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
  });

  it("should update an automobile", async () => {
    const automobile = makeAutomobile();
    automobileRepository.findById.mockResolvedValue(automobile);
    automobileRepository.findMany.mockResolvedValue([]);
    const useCase = new UpdateAutomobileUseCase(automobileRepository);

    const result = await useCase.execute({
      id: "auto-1",
      plate: "BRA2E45",
      color: "Preto",
      brand: "Honda",
    });

    expect(automobileRepository.findById).toHaveBeenCalledWith("auto-1");
    expect(automobileRepository.findMany).toHaveBeenCalledWith({ plate: "BRA2E45" });
    expect(automobileRepository.update).toHaveBeenCalledWith(automobile);
    expect(result).toMatchObject({
      id: "auto-1",
      plate: "BRA2E45",
      color: "Preto",
      brand: "Honda",
    });
  });

  it("should throw when the automobile does not exist", async () => {
    automobileRepository.findById.mockResolvedValue(null);
    const useCase = new UpdateAutomobileUseCase(automobileRepository);

    await expect(
      useCase.execute({
        id: "missing",
        plate: "BRA2E45",
        color: "Preto",
        brand: "Honda",
      }),
    ).rejects.toThrow(new NotFoundError("Automobile not found."));
  });

  it("should throw when updating to a duplicated plate", async () => {
    automobileRepository.findById.mockResolvedValue(
      makeAutomobile({
        id: "auto-2",
        plate: "BRA2E45",
        color: "Preto",
        brand: "Honda",
      }),
    );
    automobileRepository.findMany.mockResolvedValue([makeAutomobile()]);
    const useCase = new UpdateAutomobileUseCase(automobileRepository);

    await expect(
      useCase.execute({
        id: "auto-2",
        plate: "ABC1D23",
        color: "Preto",
        brand: "Honda",
      }),
    ).rejects.toThrow(new ConflictError("Automobile with this plate already exists."));
  });
});
