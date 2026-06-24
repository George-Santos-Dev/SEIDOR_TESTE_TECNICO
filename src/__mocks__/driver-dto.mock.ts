import { DriverDto } from "../modules/drivers/application";

export function createDriverDtoMock(overrides: Partial<DriverDto> = {}): DriverDto {
  return {
    id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
    name: "Joao Silva",
    createdAt: new Date("2026-06-23T10:00:00.000Z"),
    updatedAt: new Date("2026-06-23T10:00:00.000Z"),
    ...overrides,
  };
}
