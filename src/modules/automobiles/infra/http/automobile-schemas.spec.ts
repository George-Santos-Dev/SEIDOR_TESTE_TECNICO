import { describe, expect, it } from "@jest/globals";

import {
  automobileIdParamsSchema,
  createAutomobileBodySchema,
  listAutomobilesQuerySchema,
  updateAutomobileBodySchema,
} from "./automobile-schemas";

describe("Automobile Schemas", () => {
  describe("automobileIdParamsSchema", () => {
    it("should parse valid params", () => {
      const result = automobileIdParamsSchema.parse({
        id: "de5d8441-7673-458e-9339-6ebd7e624f68",
      });

      expect(result).toEqual({
        id: "de5d8441-7673-458e-9339-6ebd7e624f68",
      });
    });

    it("should fail when the id is invalid", () => {
      const result = automobileIdParamsSchema.safeParse({ id: "invalid-id" });

      expect(result.success).toBe(false);
    });
  });

  describe("createAutomobileBodySchema", () => {
    it("should parse a valid body", () => {
      const result = createAutomobileBodySchema.parse({
        plate: " ABC1D23 ",
        color: " Branco ",
        brand: " Toyota ",
      });

      expect(result).toEqual({
        plate: "ABC1D23",
        color: "Branco",
        brand: "Toyota",
      });
    });

    it("should fail when the plate is empty", () => {
      const result = createAutomobileBodySchema.safeParse({
        plate: "   ",
        color: "Branco",
        brand: "Toyota",
      });

      expect(result.success).toBe(false);
    });

    it("should fail when the color is empty", () => {
      const result = createAutomobileBodySchema.safeParse({
        plate: "ABC1D23",
        color: "   ",
        brand: "Toyota",
      });

      expect(result.success).toBe(false);
    });

    it("should fail when the brand is empty", () => {
      const result = createAutomobileBodySchema.safeParse({
        plate: "ABC1D23",
        color: "Branco",
        brand: "   ",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("updateAutomobileBodySchema", () => {
    it("should parse a valid body", () => {
      const result = updateAutomobileBodySchema.parse({
        plate: " BRA2E45 ",
        color: " Preto ",
        brand: " Honda ",
      });

      expect(result).toEqual({
        plate: "BRA2E45",
        color: "Preto",
        brand: "Honda",
      });
    });

    it("should fail when the body is invalid", () => {
      const result = updateAutomobileBodySchema.safeParse({
        plate: "",
        color: "",
        brand: "",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("listAutomobilesQuerySchema", () => {
    it("should parse a valid query", () => {
      const result = listAutomobilesQuerySchema.parse({
        plate: " ABC1D23 ",
        color: " Branco ",
        brand: " Toyota ",
      });

      expect(result).toEqual({
        plate: "ABC1D23",
        color: "Branco",
        brand: "Toyota",
      });
    });

    it("should parse an empty query", () => {
      const result = listAutomobilesQuerySchema.parse({});

      expect(result).toEqual({});
    });

    it("should fail when a filter is empty", () => {
      const result = listAutomobilesQuerySchema.safeParse({ plate: "   " });

      expect(result.success).toBe(false);
    });
  });
});
