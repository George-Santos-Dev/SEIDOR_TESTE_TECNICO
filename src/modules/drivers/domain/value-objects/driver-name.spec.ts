import { describe, expect, it } from "@jest/globals";

import { DomainError } from "../../../../core/domain/domain-error";
import { DriverName } from "./driver-name";

describe("DriverName", () => {
  it("should create a normalized driver name", () => {
    const driverName = DriverName.create(" Joao Silva ");

    expect(driverName.getValue()).toBe("Joao Silva");
  });

  it("should throw when the driver name is empty", () => {
    expect(() => DriverName.create("   ")).toThrow(new DomainError("Driver name is required."));
  });
});
