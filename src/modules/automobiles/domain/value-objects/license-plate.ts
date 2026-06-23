import { DomainError } from "../../../../core/domain/domain-error";
import { ValueObject } from "../../../../core/domain/value-object";

export class LicensePlate extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): LicensePlate {
    const normalizedValue = value.trim().toUpperCase();
    const platePattern = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

    if (!platePattern.test(normalizedValue)) {
      throw new DomainError("Invalid license plate.");
    }

    return new LicensePlate(normalizedValue);
  }
}
