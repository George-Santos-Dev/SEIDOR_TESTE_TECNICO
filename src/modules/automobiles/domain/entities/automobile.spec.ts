import { describe, expect, it } from "@jest/globals";

import { Automobile } from "./automobile";

describe("Automobile", () => {
  it("should create an automobile with normalized value objects", () => {
    const createdAt = new Date("2026-06-23T10:00:00.000Z");
    const updatedAt = new Date("2026-06-23T11:00:00.000Z");

    const automobile = Automobile.create({
      id: "auto-1",
      plate: " abc1d23 ",
      color: " Branco ",
      brand: " Toyota ",
      createdAt,
      updatedAt,
    });

    expect(automobile.getId()).toBe("auto-1");
    expect(automobile.plate).toBe("ABC1D23");
    expect(automobile.color).toBe("Branco");
    expect(automobile.brand).toBe("Toyota");
    expect(automobile.createdAt).toEqual(createdAt);
    expect(automobile.updatedAt).toEqual(updatedAt);
  });

  it("should update automobile details", () => {
    const automobile = Automobile.create({
      id: "auto-1",
      plate: "ABC1D23",
      color: "Branco",
      brand: "Toyota",
      updatedAt: new Date("2026-06-23T10:00:00.000Z"),
    });

    automobile.updateDetails({
      plate: " bra2e45 ",
      color: " Preto ",
      brand: " Honda ",
    });

    expect(automobile.plate).toBe("BRA2E45");
    expect(automobile.color).toBe("Preto");
    expect(automobile.brand).toBe("Honda");
    expect(automobile.updatedAt.getTime()).toBeGreaterThan(
      new Date("2026-06-23T10:00:00.000Z").getTime(),
    );
  });
});
