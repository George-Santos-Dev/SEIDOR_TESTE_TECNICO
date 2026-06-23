import { Automobile } from "../entities/automobile";

export interface AutomobileFilters {
  color?: string;
  brand?: string;
  plate?: string;
}

export interface AutomobileRepository {
  create(automobile: Automobile): Promise<void>;
  update(automobile: Automobile): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Automobile | null>;
  findMany(filters?: AutomobileFilters): Promise<Automobile[]>;
}
