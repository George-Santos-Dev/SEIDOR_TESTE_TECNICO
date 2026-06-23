import { DomainError } from "../../../../core/domain/domain-error";

export class VehicleUsageEndDateBeforeStartDateError extends DomainError {
  constructor() {
    super("Vehicle usage end date cannot be before start date.");
  }
}
