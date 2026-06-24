import { Router } from "express";

import { handleHttpError } from "../../../../infra/http/handle-http-error";
import { getServices } from "../../../../infra/http/http-context";
import {
  createVehicleUsageBodySchema,
  finishVehicleUsageBodySchema,
  listVehicleUsagesQuerySchema,
  vehicleUsageIdParamsSchema,
} from "./vehicle-usage-schemas";

export function createVehicleUsageController(): Router {
  const router = Router();

  router.post("/", async (request, response) => {
    try {
      const body = createVehicleUsageBodySchema.parse(request.body);
      const vehicleUsage = await getServices(request).vehicleUsages.create.execute(body);

      return response.status(201).json(vehicleUsage);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/", async (request, response) => {
    try {
      const query = listVehicleUsagesQuerySchema.parse(request.query);
      const filters = {
        ...(query.startedAtFrom ? { startedAtFrom: query.startedAtFrom } : {}),
        ...(query.startedAtTo ? { startedAtTo: query.startedAtTo } : {}),
        ...(query.endedAtFrom ? { endedAtFrom: query.endedAtFrom } : {}),
        ...(query.endedAtTo ? { endedAtTo: query.endedAtTo } : {}),
      };
      const vehicleUsages = await getServices(request).vehicleUsages.list.execute(
        Object.keys(filters).length > 0 ? filters : undefined,
      );

      return response.json(vehicleUsages);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/:id", async (request, response) => {
    try {
      const { id } = vehicleUsageIdParamsSchema.parse(request.params);
      const vehicleUsage = await getServices(request).vehicleUsages.getById.execute(id);

      return response.json(vehicleUsage);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.patch("/:id/finish", async (request, response) => {
    try {
      const { id } = vehicleUsageIdParamsSchema.parse(request.params);
      const body = finishVehicleUsageBodySchema.parse(request.body);
      const vehicleUsage = await getServices(request).vehicleUsages.finish.execute({
        id,
        ...body,
      });

      return response.json(vehicleUsage);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  return router;
}
