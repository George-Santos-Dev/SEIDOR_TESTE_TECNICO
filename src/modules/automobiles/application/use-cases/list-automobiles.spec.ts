import { beforeEach, describe, expect, it } from "@jest/globals";

import {
  AutomobileRepositoryMock,
  createAutomobileRepositoryMock,
  makeAutomobile,
} from "./__mocks__/automobile-use-case-test-helpers";
import { ListAutomobilesUseCase } from "./list-automobiles";

describe("ListAutomobilesUseCase", () => {
  let automobileRepository: AutomobileRepositoryMock;

  beforeEach(() => {
    automobileRepository = createAutomobileRepositoryMock();
  });

  it("should list automobiles using filters", async () => {
    automobileRepository.findMany.mockResolvedValue([makeAutomobile()]);
    const useCase = new ListAutomobilesUseCase(automobileRepository);

    const result = await useCase.execute({ brand: "toyota", color: "branco" });

    expect(automobileRepository.findMany).toHaveBeenCalledWith({
      brand: "toyota",
      color: "branco",
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "auto-1", plate: "ABC1D23" });
  });
});
