import { describe, expect, it } from "@jest/globals";

import { DomainError } from "../../../../core/domain/domain-error";
import { AutomobileBrand } from "./automobile-brand";

describe("AutomobileBrand", () => {
  it("should create a normalized automobile brand", () => {
    const automobileBrand = AutomobileBrand.create(" Toyota ");

    expect(automobileBrand.getValue()).toBe("Toyota");
  });

  it("should throw when the automobile brand is empty", () => {
    expect(() => AutomobileBrand.create("   ")).toThrow(
      new DomainError("Automobile brand is required."),
    );
  });
});
