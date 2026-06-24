import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError } from "../../../../core/application";
import {
  createDriverRepositoryMock,
  DriverRepositoryMock,
  makeDriver,
} from "./__mocks__/driver-use-case-test-helpers";
import { CreateDriverUseCase } from "./create-driver";

describe("CreateDriverUseCase", () => {
  let driverRepository: DriverRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
  });

  it("should create a driver", async () => {
    driverRepository.findMany.mockResolvedValue([]);
    const useCase = new CreateDriverUseCase(driverRepository);

    const result = await useCase.execute({ name: " Joao Silva " });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Joao Silva");
    expect(driverRepository.findMany).toHaveBeenCalledWith({ name: " Joao Silva " });
    expect(driverRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Joao Silva",
      }),
    );
  });

  it("should throw when the driver name already exists", async () => {
    driverRepository.findMany.mockResolvedValue([makeDriver({ name: "Joao Silva" })]);
    const useCase = new CreateDriverUseCase(driverRepository);

    await expect(useCase.execute({ name: " Joao Silva " })).rejects.toThrow(
      new ConflictError("Driver with this name already exists."),
    );
  });
});
