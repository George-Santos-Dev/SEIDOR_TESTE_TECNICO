import { NotFoundError } from "../../../../core/application";
import { AutomobileRepository } from "../../domain";
import { AutomobileDto, toAutomobileDto } from "../dtos/automobile-dto";

export class GetAutomobileByIdUseCase {
  constructor(private readonly automobileRepository: AutomobileRepository) {}

  public async execute(id: string): Promise<AutomobileDto> {
    const automobile = await this.automobileRepository.findById(id);

    if (!automobile) {
      throw new NotFoundError("Automobile not found.");
    }

    return toAutomobileDto(automobile);
  }
}
