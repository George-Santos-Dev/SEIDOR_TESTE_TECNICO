import { DomainError } from "../../../../core/domain/domain-error";
import { ValueObject } from "../../../../core/domain/value-object";

export class DriverName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): DriverName {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new DomainError("Driver name is required.");
    }

    return new DriverName(normalizedValue);
  }
}
