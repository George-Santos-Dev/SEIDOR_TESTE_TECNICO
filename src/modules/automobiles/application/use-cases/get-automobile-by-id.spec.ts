import { beforeEach, describe, expect, it } from "@jest/globals";

import { NotFoundError } from "../../../../core/application";
import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  makeAutomobile,
} from "./__mocks__/automobile-use-case-test-helpers";
import { GetAutomobileByIdUseCase } from "./get-automobile-by-id";

describe("GetAutomobileByIdUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
  });

  it("should get an automobile by id", async () => {
    automobileRepository.findById.mockResolvedValue(makeAutomobile());
    const useCase = new GetAutomobileByIdUseCase(automobileRepository);

    const result = await useCase.execute("auto-1");

    expect(automobileRepository.findById).toHaveBeenCalledWith("auto-1");
    expect(result).toMatchObject({
      id: "auto-1",
      plate: "ABC1D23",
    });
  });

  it("should throw when the automobile does not exist", async () => {
    automobileRepository.findById.mockResolvedValue(null);
    const useCase = new GetAutomobileByIdUseCase(automobileRepository);

    await expect(useCase.execute("missing")).rejects.toThrow(
      new NotFoundError("Automobile not found."),
    );
  });
});
