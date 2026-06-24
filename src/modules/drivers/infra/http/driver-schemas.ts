import { z } from "zod";

export const driverIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createDriverBodySchema = z.object({
  name: z.string().trim().min(1, "Driver name is required."),
});

export const updateDriverBodySchema = createDriverBodySchema;

export const listDriversQuerySchema = z.object({
  name: z.string().trim().min(1).optional(),
});
