import { randomUUID } from "node:crypto";

import { ConflictError } from "../../../../core/application";
import { Automobile, AutomobileRepository } from "../../domain";
import { AutomobileDto, toAutomobileDto } from "../dtos/automobile-dto";

export interface CreateAutomobileInput {
  plate: string;
  color: string;
  brand: string;
}

export class CreateAutomobileUseCase {
  constructor(private readonly automobileRepository: AutomobileRepository) {}

  public async execute(input: CreateAutomobileInput): Promise<AutomobileDto> {
    const existingAutomobile = await this.automobileRepository.findMany({ plate: input.plate });

    if (existingAutomobile.length > 0) {
      throw new ConflictError("Automobile with this plate already exists.");
    }

    const automobile = Automobile.create({
      id: randomUUID(),
      plate: input.plate,
      color: input.color,
      brand: input.brand,
    });

    await this.automobileRepository.create(automobile);

    return toAutomobileDto(automobile);
  }
}
