import { Driver } from "../../domain";

export interface DriverDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toDriverDto(driver: Driver): DriverDto {
  return {
    id: driver.getId() as string,
    name: driver.name,
    createdAt: driver.createdAt,
    updatedAt: driver.updatedAt,
  };
}
