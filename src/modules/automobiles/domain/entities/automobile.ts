import { Entity } from "../../../../core/domain/entity";
import { AutomobileBrand } from "../value-objects/automobile-brand";
import { AutomobileColor } from "../value-objects/automobile-color";
import { LicensePlate } from "../value-objects/license-plate";

export interface AutomobileProps {
  plate: LicensePlate;
  color: AutomobileColor;
  brand: AutomobileBrand;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAutomobileProps {
  id?: string;
  plate: string;
  color: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Automobile extends Entity<AutomobileProps> {
  private constructor(props: AutomobileProps, id?: string) {
    super(props, id);
  }

  public static create(props: CreateAutomobileProps): Automobile {
    const now = new Date();

    return new Automobile(
      {
        plate: LicensePlate.create(props.plate),
        color: AutomobileColor.create(props.color),
        brand: AutomobileBrand.create(props.brand),
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      props.id,
    );
  }

  public updateDetails(props: Pick<CreateAutomobileProps, "plate" | "color" | "brand">): void {
    this.props.plate = LicensePlate.create(props.plate);
    this.props.color = AutomobileColor.create(props.color);
    this.props.brand = AutomobileBrand.create(props.brand);
    this.props.updatedAt = new Date();
  }

  public get plate(): string {
    return this.props.plate.getValue();
  }

  public get color(): string {
    return this.props.color.getValue();
  }

  public get brand(): string {
    return this.props.brand.getValue();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
