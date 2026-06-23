import { ConflictError, NotFoundError } from "../../../../core/application";
import { AutomobileRepository } from "../../domain";
import { AutomobileDto, toAutomobileDto } from "../dtos/automobile-dto";

export interface UpdateAutomobileInput {
  id: string;
  plate: string;
  color: string;
  brand: string;
}

export class UpdateAutomobileUseCase {
  constructor(private readonly automobileRepository: AutomobileRepository) {}

  public async execute(input: UpdateAutomobileInput): Promise<AutomobileDto> {
    const automobile = await this.automobileRepository.findById(input.id);

    if (!automobile) {
      throw new NotFoundError("Automobile not found.");
    }

    const automobilesWithSamePlate = await this.automobileRepository.findMany({
      plate: input.plate,
    });
    const hasDuplicatedPlate = automobilesWithSamePlate.some((item) => item.getId() !== input.id);

    if (hasDuplicatedPlate) {
      throw new ConflictError("Automobile with this plate already exists.");
    }

    automobile.updateDetails({
      plate: input.plate,
      color: input.color,
      brand: input.brand,
    });

    await this.automobileRepository.update(automobile);

    return toAutomobileDto(automobile);
  }
}
