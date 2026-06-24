import { beforeEach, describe, expect, it } from "@jest/globals";

import {
  createDriverRepositoryMock,
  DriverRepositoryMock,
  makeDriver,
} from "./__mocks__/driver-use-case-test-helpers";
import { ListDriversUseCase } from "./list-drivers";

describe("ListDriversUseCase", () => {
  let driverRepository: DriverRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
  });

  it("should list drivers using filters", async () => {
    driverRepository.findMany.mockResolvedValue([makeDriver()]);
    const useCase = new ListDriversUseCase(driverRepository);

    const result = await useCase.execute({ name: "joao" });

    expect(driverRepository.findMany).toHaveBeenCalledWith({ name: "joao" });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "driver-1", name: "Joao Silva" });
  });
});
