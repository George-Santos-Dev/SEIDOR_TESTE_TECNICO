import { describe, expect, it } from "@jest/globals";

import { DomainError } from "../../../../core/domain/domain-error";
import { LicensePlate } from "./license-plate";

describe("LicensePlate", () => {
  it("should create a normalized license plate", () => {
    const licensePlate = LicensePlate.create(" abc1d23 ");

    expect(licensePlate.getValue()).toBe("ABC1D23");
  });

  it("should throw when the license plate is invalid", () => {
    expect(() => LicensePlate.create("invalid")).toThrow(new DomainError("Invalid license plate."));
  });
});
