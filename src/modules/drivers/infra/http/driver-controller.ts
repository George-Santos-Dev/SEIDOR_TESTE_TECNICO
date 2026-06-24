import { Router } from "express";

import { handleHttpError } from "../../../../infra/http/handle-http-error";
import { getServices } from "../../../../infra/http/http-context";
import {
  createDriverBodySchema,
  driverIdParamsSchema,
  listDriversQuerySchema,
  updateDriverBodySchema,
} from "./driver-schemas";

export function createDriverController(): Router {
  const router = Router();

  router.post("/", async (request, response) => {
    try {
      const body = createDriverBodySchema.parse(request.body);
      const driver = await getServices(request).drivers.create.execute(body);

      return response.status(201).json(driver);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/", async (request, response) => {
    try {
      const query = listDriversQuerySchema.parse(request.query);
      const filters = query.name ? { name: query.name } : undefined;
      const drivers = await getServices(request).drivers.list.execute(filters);

      return response.json(drivers);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/:id", async (request, response) => {
    try {
      const { id } = driverIdParamsSchema.parse(request.params);
      const driver = await getServices(request).drivers.getById.execute(id);

      return response.json(driver);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.put("/:id", async (request, response) => {
    try {
      const { id } = driverIdParamsSchema.parse(request.params);
      const body = updateDriverBodySchema.parse(request.body);
      const driver = await getServices(request).drivers.update.execute({
        id,
        ...body,
      });

      return response.json(driver);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.delete("/:id", async (request, response) => {
    try {
      const { id } = driverIdParamsSchema.parse(request.params);

      await getServices(request).drivers.delete.execute(id);

      return response.status(204).send();
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  return router;
}
