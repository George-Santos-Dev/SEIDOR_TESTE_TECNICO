import { AutomobileDto } from "../modules/automobiles/application";

export function createAutomobileDtoMock(overrides: Partial<AutomobileDto> = {}): AutomobileDto {
  return {
    id: "de5d8441-7673-458e-9339-6ebd7e624f68",
    plate: "ABC1D23",
    color: "Branco",
    brand: "Toyota",
    createdAt: new Date("2026-06-23T10:00:00.000Z"),
    updatedAt: new Date("2026-06-23T10:00:00.000Z"),
    ...overrides,
  };
}
