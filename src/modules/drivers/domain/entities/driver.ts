import { Entity } from "../../../../core/domain/entity";
import { DriverName } from "../value-objects/driver-name";

export interface DriverProps {
  name: DriverName;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDriverProps {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Driver extends Entity<DriverProps> {
  private constructor(props: DriverProps, id?: string) {
    super(props, id);
  }

  public static create(props: CreateDriverProps): Driver {
    const now = new Date();

    return new Driver(
      {
        name: DriverName.create(props.name),
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      props.id,
    );
  }

  public updateName(name: string): void {
    this.props.name = DriverName.create(name);
    this.props.updatedAt = new Date();
  }

  public get name(): string {
    return this.props.name.getValue();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
