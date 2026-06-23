import { Driver } from "../entities/driver";

export interface DriverFilters {
  name?: string;
}

export interface DriverRepository {
  create(driver: Driver): Promise<void>;
  update(driver: Driver): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Driver | null>;
  findMany(filters?: DriverFilters): Promise<Driver[]>;
}
