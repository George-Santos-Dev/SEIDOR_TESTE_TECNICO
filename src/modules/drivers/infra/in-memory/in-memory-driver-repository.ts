import { Driver, DriverFilters, DriverRepository } from "../../domain";

export class InMemoryDriverRepository implements DriverRepository {
  private readonly drivers = new Map<string, Driver>();

  public async create(driver: Driver): Promise<void> {
    this.drivers.set(this.getRequiredId(driver), driver);
  }

  public async update(driver: Driver): Promise<void> {
    this.drivers.set(this.getRequiredId(driver), driver);
  }

  public async delete(id: string): Promise<void> {
    this.drivers.delete(id);
  }

  public async findById(id: string): Promise<Driver | null> {
    return this.drivers.get(id) ?? null;
  }

  public async findMany(filters?: DriverFilters): Promise<Driver[]> {
    return Array.from(this.drivers.values()).filter((driver) => {
      if (filters?.name) {
        return driver.name.toLowerCase().includes(filters.name.toLowerCase());
      }

      return true;
    });
  }

  private getRequiredId(driver: Driver): string {
    const id = driver.getId();

    if (!id) {
      throw new Error("Driver ID is required.");
    }

    return id;
  }
}
