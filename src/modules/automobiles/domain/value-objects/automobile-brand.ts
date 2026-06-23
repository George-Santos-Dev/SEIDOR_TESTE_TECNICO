import { DomainError } from "../../../../core/domain/domain-error";
import { ValueObject } from "../../../../core/domain/value-object";

export class AutomobileBrand extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): AutomobileBrand {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new DomainError("Automobile brand is required.");
    }

    return new AutomobileBrand(normalizedValue);
  }
}
