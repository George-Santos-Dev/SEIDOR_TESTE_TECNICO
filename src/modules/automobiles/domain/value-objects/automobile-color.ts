import { DomainError } from "../../../../core/domain/domain-error";
import { ValueObject } from "../../../../core/domain/value-object";

export class AutomobileColor extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): AutomobileColor {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new DomainError("Automobile color is required.");
    }

    return new AutomobileColor(normalizedValue);
  }
}
