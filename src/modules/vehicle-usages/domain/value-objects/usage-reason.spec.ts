import { describe, expect, it } from "@jest/globals";

import { DomainError } from "../../../../core/domain/domain-error";
import { UsageReason } from "./usage-reason";

describe("UsageReason", () => {
  it("should create a normalized usage reason", () => {
    const usageReason = UsageReason.create(" Visit ");

    expect(usageReason.getValue()).toBe("Visit");
  });

  it("should throw when the usage reason is empty", () => {
    expect(() => UsageReason.create("   ")).toThrow(new DomainError("Usage reason is required."));
  });
});
