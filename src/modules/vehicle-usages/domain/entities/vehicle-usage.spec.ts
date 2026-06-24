import { describe, expect, it } from "@jest/globals";

import { VehicleUsageAlreadyFinishedError } from "../errors/vehicle-usage-already-finished-error";
import { VehicleUsageEndDateBeforeStartDateError } from "../errors/vehicle-usage-end-date-before-start-date-error";
import { VehicleUsage } from "./vehicle-usage";

describe("VehicleUsage", () => {
  it("should create a vehicle usage with normalized reason", () => {
    const startedAt = new Date("2026-06-23T10:00:00.000Z");
    const createdAt = new Date("2026-06-23T10:00:00.000Z");
    const updatedAt = new Date("2026-06-23T11:00:00.000Z");

    const vehicleUsage = VehicleUsage.create({
      id: "usage-1",
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: " Visit ",
      startedAt,
      createdAt,
      updatedAt,
    });

    expect(vehicleUsage.getId()).toBe("usage-1");
    expect(vehicleUsage.automobileId).toBe("auto-1");
    expect(vehicleUsage.driverId).toBe("driver-1");
    expect(vehicleUsage.reason).toBe("Visit");
    expect(vehicleUsage.startedAt).toEqual(startedAt);
    expect(vehicleUsage.endedAt).toBeNull();
    expect(vehicleUsage.createdAt).toEqual(createdAt);
    expect(vehicleUsage.updatedAt).toEqual(updatedAt);
    expect(vehicleUsage.isActive()).toBe(true);
  });

  it("should throw when created with end date before start date", () => {
    expect(() =>
      VehicleUsage.create({
        automobileId: "auto-1",
        driverId: "driver-1",
        reason: "Visit",
        startedAt: new Date("2026-06-23T10:00:00.000Z"),
        endedAt: new Date("2026-06-23T09:00:00.000Z"),
      }),
    ).toThrow(new VehicleUsageEndDateBeforeStartDateError());
  });

  it("should finish a vehicle usage", () => {
    const vehicleUsage = VehicleUsage.create({
      id: "usage-1",
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: "Visit",
      startedAt: new Date("2026-06-23T10:00:00.000Z"),
      updatedAt: new Date("2026-06-23T11:00:00.000Z"),
    });

    vehicleUsage.finish(new Date("2026-06-23T18:00:00.000Z"));

    expect(vehicleUsage.endedAt).toEqual(new Date("2026-06-23T18:00:00.000Z"));
    expect(vehicleUsage.isActive()).toBe(false);
    expect(vehicleUsage.updatedAt.getTime()).toBeGreaterThan(
      new Date("2026-06-23T11:00:00.000Z").getTime(),
    );
  });

  it("should throw when finishing an already finished usage", () => {
    const vehicleUsage = VehicleUsage.create({
      id: "usage-1",
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: "Visit",
      startedAt: new Date("2026-06-23T10:00:00.000Z"),
      endedAt: new Date("2026-06-23T12:00:00.000Z"),
    });

    expect(() => vehicleUsage.finish(new Date("2026-06-23T18:00:00.000Z"))).toThrow(
      new VehicleUsageAlreadyFinishedError(),
    );
  });

  it("should throw when finishing with end date before start date", () => {
    const vehicleUsage = VehicleUsage.create({
      id: "usage-1",
      automobileId: "auto-1",
      driverId: "driver-1",
      reason: "Visit",
      startedAt: new Date("2026-06-23T10:00:00.000Z"),
    });

    expect(() => vehicleUsage.finish(new Date("2026-06-23T09:00:00.000Z"))).toThrow(
      new VehicleUsageEndDateBeforeStartDateError(),
    );
  });
});
