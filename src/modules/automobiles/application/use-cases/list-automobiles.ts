import { AutomobileFilters, AutomobileRepository } from "../../domain";
import { AutomobileDto, toAutomobileDto } from "../dtos/automobile-dto";

export class ListAutomobilesUseCase {
  constructor(private readonly automobileRepository: AutomobileRepository) {}

  public async execute(filters?: AutomobileFilters): Promise<AutomobileDto[]> {
    const automobiles = await this.automobileRepository.findMany(filters);

    return automobiles.map(toAutomobileDto);
  }
}
