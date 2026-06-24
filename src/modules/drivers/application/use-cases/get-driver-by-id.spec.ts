import { beforeEach, describe, expect, it } from "@jest/globals";

import { NotFoundError } from "../../../../core/application";
import {
  createDriverRepositoryMock,
  DriverRepositoryMock,
  makeDriver,
} from "./__mocks__/driver-use-case-test-helpers";
import { GetDriverByIdUseCase } from "./get-driver-by-id";

describe("GetDriverByIdUseCase", () => {
  let driverRepository: DriverRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
  });

  it("should get a driver by id", async () => {
    driverRepository.findById.mockResolvedValue(makeDriver());
    const useCase = new GetDriverByIdUseCase(driverRepository);

    const result = await useCase.execute("driver-1");

    expect(driverRepository.findById).toHaveBeenCalledWith("driver-1");
    expect(result).toMatchObject({
      id: "driver-1",
      name: "Joao Silva",
    });
  });

  it("should throw when the driver does not exist", async () => {
    driverRepository.findById.mockResolvedValue(null);
    const useCase = new GetDriverByIdUseCase(driverRepository);

    await expect(useCase.execute("missing")).rejects.toThrow(
      new NotFoundError("Driver not found."),
    );
  });
});
