import { describe, expect, it } from "@jest/globals";

import {
  createVehicleUsageBodySchema,
  finishVehicleUsageBodySchema,
  listVehicleUsagesQuerySchema,
  vehicleUsageIdParamsSchema,
} from "./vehicle-usage-schemas";

describe("Vehicle Usage Schemas", () => {
  describe("vehicleUsageIdParamsSchema", () => {
    it("should parse valid params", () => {
      const result = vehicleUsageIdParamsSchema.parse({
        id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617",
      });

      expect(result).toEqual({
        id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617",
      });
    });

    it("should fail when the id is invalid", () => {
      const result = vehicleUsageIdParamsSchema.safeParse({ id: "invalid-id" });

      expect(result.success).toBe(false);
    });
  });

  describe("createVehicleUsageBodySchema", () => {
    it("should parse a valid body", () => {
      const result = createVehicleUsageBodySchema.parse({
        automobileId: "de5d8441-7673-458e-9339-6ebd7e624f68",
        driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
        reason: " Visita a cliente ",
        startedAt: "2026-06-23T10:00:00.000Z",
      });

      expect(result).toEqual({
        automobileId: "de5d8441-7673-458e-9339-6ebd7e624f68",
        driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
        reason: "Visita a cliente",
        startedAt: new Date("2026-06-23T10:00:00.000Z"),
      });
    });

    it("should fail when the body is invalid", () => {
      const result = createVehicleUsageBodySchema.safeParse({
        automobileId: "invalid-id",
        driverId: "invalid-id",
        reason: "   ",
        startedAt: "invalid-date",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("finishVehicleUsageBodySchema", () => {
    it("should parse a valid body", () => {
      const result = finishVehicleUsageBodySchema.parse({
        endedAt: "2026-06-23T18:00:00.000Z",
      });

      expect(result).toEqual({
        endedAt: new Date("2026-06-23T18:00:00.000Z"),
      });
    });

    it("should fail when endedAt is invalid", () => {
      const result = finishVehicleUsageBodySchema.safeParse({
        endedAt: "invalid-date",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("listVehicleUsagesQuerySchema", () => {
    it("should parse a valid query", () => {
      const result = listVehicleUsagesQuerySchema.parse({
        startedAtFrom: "2026-06-01T00:00:00.000Z",
        startedAtTo: "2026-06-30T23:59:59.999Z",
        endedAtFrom: "2026-06-10T00:00:00.000Z",
        endedAtTo: "2026-06-20T23:59:59.999Z",
      });

      expect(result).toEqual({
        startedAtFrom: new Date("2026-06-01T00:00:00.000Z"),
        startedAtTo: new Date("2026-06-30T23:59:59.999Z"),
        endedAtFrom: new Date("2026-06-10T00:00:00.000Z"),
        endedAtTo: new Date("2026-06-20T23:59:59.999Z"),
      });
    });

    it("should parse an empty query", () => {
      const result = listVehicleUsagesQuerySchema.parse({});

      expect(result).toEqual({});
    });

    it("should fail when a date filter is invalid", () => {
      const result = listVehicleUsagesQuerySchema.safeParse({
        startedAtFrom: "invalid-date",
      });

      expect(result.success).toBe(false);
    });
  });
});
