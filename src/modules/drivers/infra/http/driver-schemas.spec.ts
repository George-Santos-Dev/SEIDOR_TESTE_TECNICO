import { describe, expect, it } from "@jest/globals";

import {
  createDriverBodySchema,
  driverIdParamsSchema,
  listDriversQuerySchema,
  updateDriverBodySchema,
} from "./driver-schemas";

describe("Driver Schemas", () => {
  describe("driverIdParamsSchema", () => {
    it("should parse valid params", () => {
      const result = driverIdParamsSchema.parse({
        id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
      });

      expect(result).toEqual({
        id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
      });
    });

    it("should fail when the id is invalid", () => {
      const result = driverIdParamsSchema.safeParse({ id: "invalid-id" });

      expect(result.success).toBe(false);
    });
  });

  describe("createDriverBodySchema", () => {
    it("should parse a valid body", () => {
      const result = createDriverBodySchema.parse({ name: " Joao Silva " });

      expect(result).toEqual({ name: "Joao Silva" });
    });

    it("should fail when the name is empty", () => {
      const result = createDriverBodySchema.safeParse({ name: "   " });

      expect(result.success).toBe(false);
    });
  });

  describe("updateDriverBodySchema", () => {
    it("should parse a valid body", () => {
      const result = updateDriverBodySchema.parse({ name: " Maria Souza " });

      expect(result).toEqual({ name: "Maria Souza" });
    });

    it("should fail when the name is empty", () => {
      const result = updateDriverBodySchema.safeParse({ name: "" });

      expect(result.success).toBe(false);
    });
  });

  describe("listDriversQuerySchema", () => {
    it("should parse a valid query", () => {
      const result = listDriversQuerySchema.parse({ name: " Joao " });

      expect(result).toEqual({ name: "Joao" });
    });

    it("should parse an empty query", () => {
      const result = listDriversQuerySchema.parse({});

      expect(result).toEqual({});
    });

    it("should fail when the name filter is empty", () => {
      const result = listDriversQuerySchema.safeParse({ name: "   " });

      expect(result.success).toBe(false);
    });
  });
});
