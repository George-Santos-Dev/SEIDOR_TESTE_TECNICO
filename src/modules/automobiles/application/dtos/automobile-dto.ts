import { Automobile } from "../../domain";

export interface AutomobileDto {
  id: string;
  plate: string;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toAutomobileDto(automobile: Automobile): AutomobileDto {
  return {
    id: automobile.getId() as string,
    plate: automobile.plate,
    color: automobile.color,
    brand: automobile.brand,
    createdAt: automobile.createdAt,
    updatedAt: automobile.updatedAt,
  };
}
