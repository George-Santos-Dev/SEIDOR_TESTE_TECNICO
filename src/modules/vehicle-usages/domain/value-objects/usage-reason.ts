import { DomainError } from "../../../../core/domain/domain-error";
import { ValueObject } from "../../../../core/domain/value-object";

export class UsageReason extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): UsageReason {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new DomainError("Usage reason is required.");
    }

    return new UsageReason(normalizedValue);
  }
}
