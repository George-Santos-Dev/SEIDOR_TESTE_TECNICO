import { z } from "zod";

const isoDateSchema = z.iso.datetime().transform((value) => new Date(value));

export const vehicleUsageIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createVehicleUsageBodySchema = z.object({
  automobileId: z.uuid(),
  driverId: z.uuid(),
  reason: z.string().trim().min(1, "Usage reason is required."),
  startedAt: isoDateSchema,
});

export const finishVehicleUsageBodySchema = z.object({
  endedAt: isoDateSchema,
});

export const listVehicleUsagesQuerySchema = z.object({
  startedAtFrom: isoDateSchema.optional(),
  startedAtTo: isoDateSchema.optional(),
  endedAtFrom: isoDateSchema.optional(),
  endedAtTo: isoDateSchema.optional(),
});
