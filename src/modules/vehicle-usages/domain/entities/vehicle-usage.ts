import { Entity } from "../../../../core/domain/entity";
import { VehicleUsageAlreadyFinishedError } from "../errors/vehicle-usage-already-finished-error";
import { VehicleUsageEndDateBeforeStartDateError } from "../errors/vehicle-usage-end-date-before-start-date-error";
import { UsageReason } from "../value-objects/usage-reason";

export interface VehicleUsageProps {
  automobileId: string;
  driverId: string;
  reason: UsageReason;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleUsageProps {
  id?: string;
  automobileId: string;
  driverId: string;
  reason: string;
  startedAt: Date;
  endedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class VehicleUsage extends Entity<VehicleUsageProps> {
  private constructor(props: VehicleUsageProps, id?: string) {
    super(props, id);
  }

  public static create(props: CreateVehicleUsageProps): VehicleUsage {
    const now = new Date();
    const endedAt = props.endedAt ?? null;

    if (endedAt && endedAt < props.startedAt) {
      throw new VehicleUsageEndDateBeforeStartDateError();
    }

    return new VehicleUsage(
      {
        automobileId: props.automobileId,
        driverId: props.driverId,
        reason: UsageReason.create(props.reason),
        startedAt: props.startedAt,
        endedAt,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      props.id,
    );
  }

  public finish(endedAt: Date): void {
    if (this.props.endedAt) {
      throw new VehicleUsageAlreadyFinishedError();
    }

    if (endedAt < this.props.startedAt) {
      throw new VehicleUsageEndDateBeforeStartDateError();
    }

    this.props.endedAt = endedAt;
    this.props.updatedAt = new Date();
  }

  public isActive(): boolean {
    return this.props.endedAt === null;
  }

  public get automobileId(): string {
    return this.props.automobileId;
  }

  public get driverId(): string {
    return this.props.driverId;
  }

  public get reason(): string {
    return this.props.reason.getValue();
  }

  public get startedAt(): Date {
    return this.props.startedAt;
  }

  public get endedAt(): Date | null {
    return this.props.endedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
