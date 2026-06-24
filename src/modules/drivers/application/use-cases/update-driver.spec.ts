import { beforeEach, describe, expect, it } from "@jest/globals";

import { ConflictError, NotFoundError } from "../../../../core/application";
import {
  createDriverRepositoryMock,
  DriverRepositoryMock,
  makeDriver,
} from "./__mocks__/driver-use-case-test-helpers";
import { UpdateDriverUseCase } from "./update-driver";

describe("UpdateDriverUseCase", () => {
  let driverRepository: DriverRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
  });

  it("should update a driver", async () => {
    const driver = makeDriver();
    driverRepository.findById.mockResolvedValue(driver);
    driverRepository.findMany.mockResolvedValue([]);
    const useCase = new UpdateDriverUseCase(driverRepository);

    const result = await useCase.execute({ id: "driver-1", name: "Maria Souza" });

    expect(driverRepository.findById).toHaveBeenCalledWith("driver-1");
    expect(driverRepository.findMany).toHaveBeenCalledWith({ name: "Maria Souza" });
    expect(driverRepository.update).toHaveBeenCalledWith(driver);
    expect(result.name).toBe("Maria Souza");
  });

  it("should throw when the driver does not exist", async () => {
    driverRepository.findById.mockResolvedValue(null);
    const useCase = new UpdateDriverUseCase(driverRepository);

    await expect(useCase.execute({ id: "missing", name: "Maria Souza" })).rejects.toThrow(
      new NotFoundError("Driver not found."),
    );
  });

  it("should throw when updating to a duplicated driver name", async () => {
    const driver = makeDriver({ id: "driver-1", name: "Joao Silva" });
    driverRepository.findById.mockResolvedValue(driver);
    driverRepository.findMany.mockResolvedValue([
      makeDriver({ id: "driver-1", name: "Joao Silva" }),
      makeDriver({ id: "driver-2", name: "Maria Souza" }),
    ]);
    const useCase = new UpdateDriverUseCase(driverRepository);

    await expect(useCase.execute({ id: "driver-1", name: " maria souza " })).rejects.toThrow(
      new ConflictError("Driver with this name already exists."),
    );
  });
});
