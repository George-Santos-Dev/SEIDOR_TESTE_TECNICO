import { describe, expect, it } from "@jest/globals";

import { DomainError } from "../../../../core/domain/domain-error";
import { AutomobileColor } from "./automobile-color";

describe("AutomobileColor", () => {
  it("should create a normalized automobile color", () => {
    const automobileColor = AutomobileColor.create(" Branco ");

    expect(automobileColor.getValue()).toBe("Branco");
  });

  it("should throw when the automobile color is empty", () => {
    expect(() => AutomobileColor.create("   ")).toThrow(
      new DomainError("Automobile color is required."),
    );
  });
});
