import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError } from "../../../../core/application";
import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  makeAutomobile,
} from "./__mocks__/automobile-use-case-test-helpers";
import { CreateAutomobileUseCase } from "./create-automobile";

describe("CreateAutomobileUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
  });

  it("should create an automobile", async () => {
    automobileRepository.findMany.mockResolvedValue([]);
    const useCase = new CreateAutomobileUseCase(automobileRepository);

    const result = await useCase.execute({
      plate: "ABC1D23",
      color: "Branco",
      brand: "Toyota",
    });

    expect(result.id).toBeDefined();
    expect(result.plate).toBe("ABC1D23");
    expect(automobileRepository.findMany).toHaveBeenCalledWith({ plate: "ABC1D23" });
    expect(automobileRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        plate: "ABC1D23",
        color: "Branco",
        brand: "Toyota",
      }),
    );
  });

  it("should throw when the plate already exists", async () => {
    automobileRepository.findMany.mockResolvedValue([makeAutomobile()]);
    const useCase = new CreateAutomobileUseCase(automobileRepository);

    await expect(
      useCase.execute({
        plate: "ABC1D23",
        color: "Preto",
        brand: "Honda",
      }),
    ).rejects.toThrow(new ConflictError("Automobile with this plate already exists."));
  });
});
