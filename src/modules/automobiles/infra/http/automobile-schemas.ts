import { z } from "zod";

export const automobileIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createAutomobileBodySchema = z.object({
  plate: z.string().trim().min(1, "Automobile plate is required."),
  color: z.string().trim().min(1, "Automobile color is required."),
  brand: z.string().trim().min(1, "Automobile brand is required."),
});

export const updateAutomobileBodySchema = createAutomobileBodySchema;

export const listAutomobilesQuerySchema = z.object({
  plate: z.string().trim().min(1).optional(),
  color: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1).optional(),
});
