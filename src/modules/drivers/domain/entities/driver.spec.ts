import { describe, expect, it } from "@jest/globals";

import { Driver } from "./driver";

describe("Driver", () => {
  it("should create a driver with normalized name", () => {
    const createdAt = new Date("2026-06-23T10:00:00.000Z");
    const updatedAt = new Date("2026-06-23T11:00:00.000Z");

    const driver = Driver.create({
      id: "driver-1",
      name: " Joao Silva ",
      createdAt,
      updatedAt,
    });

    expect(driver.getId()).toBe("driver-1");
    expect(driver.name).toBe("Joao Silva");
    expect(driver.createdAt).toEqual(createdAt);
    expect(driver.updatedAt).toEqual(updatedAt);
  });

  it("should update driver name", () => {
    const driver = Driver.create({
      id: "driver-1",
      name: "Joao Silva",
      updatedAt: new Date("2026-06-23T10:00:00.000Z"),
    });

    driver.updateName(" Maria Souza ");

    expect(driver.name).toBe("Maria Souza");
    expect(driver.updatedAt.getTime()).toBeGreaterThan(
      new Date("2026-06-23T10:00:00.000Z").getTime(),
    );
  });
});
