import { Automobile, AutomobileFilters, AutomobileRepository } from "../../domain";

export class InMemoryAutomobileRepository implements AutomobileRepository {
  private readonly automobiles = new Map<string, Automobile>();

  public async create(automobile: Automobile): Promise<void> {
    this.automobiles.set(this.getRequiredId(automobile), automobile);
  }

  public async update(automobile: Automobile): Promise<void> {
    this.automobiles.set(this.getRequiredId(automobile), automobile);
  }

  public async delete(id: string): Promise<void> {
    this.automobiles.delete(id);
  }

  public async findById(id: string): Promise<Automobile | null> {
    return this.automobiles.get(id) ?? null;
  }

  public async findMany(filters?: AutomobileFilters): Promise<Automobile[]> {
    return Array.from(this.automobiles.values()).filter((automobile) => {
      if (filters?.color && automobile.color.toLowerCase() !== filters.color.toLowerCase()) {
        return false;
      }

      if (filters?.brand && automobile.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      if (filters?.plate && automobile.plate !== filters.plate.trim().toUpperCase()) {
        return false;
      }

      return true;
    });
  }

  private getRequiredId(automobile: Automobile): string {
    const id = automobile.getId();

    if (!id) {
      throw new Error("Automobile ID is required.");
    }

    return id;
  }
}
