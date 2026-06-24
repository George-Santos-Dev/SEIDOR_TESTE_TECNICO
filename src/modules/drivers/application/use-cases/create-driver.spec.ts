import { beforeEach, describe, expect, it } from "@jest/globals";

import {
  createDriverRepositoryMock,
  DriverRepositoryMock,
} from "./__mocks__/driver-use-case-test-helpers";
import { CreateDriverUseCase } from "./create-driver";

describe("CreateDriverUseCase", () => {
  let driverRepository: DriverRepositoryMock;

  beforeEach(() => {
    driverRepository = createDriverRepositoryMock();
  });

  it("should create a driver", async () => {
    const useCase = new CreateDriverUseCase(driverRepository);

    const result = await useCase.execute({ name: " Joao Silva " });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Joao Silva");
    expect(driverRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Joao Silva",
      }),
    );
  });
});
