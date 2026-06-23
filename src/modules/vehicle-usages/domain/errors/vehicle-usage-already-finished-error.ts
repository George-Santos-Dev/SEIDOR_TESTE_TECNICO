import { DomainError } from "../../../../core/domain/domain-error";

export class VehicleUsageAlreadyFinishedError extends DomainError {
  constructor() {
    super("Vehicle usage is already finished.");
  }
}
