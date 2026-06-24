import { Router } from "express";

import { handleHttpError } from "../../../../infra/http/handle-http-error";
import { getServices } from "../../../../infra/http/http-context";
import {
  automobileIdParamsSchema,
  createAutomobileBodySchema,
  listAutomobilesQuerySchema,
  updateAutomobileBodySchema,
} from "./automobile-schemas";

export function createAutomobileController(): Router {
  const router = Router();

  router.post("/", async (request, response) => {
    try {
      const body = createAutomobileBodySchema.parse(request.body);
      const automobile = await getServices(request).automobiles.create.execute(body);

      return response.status(201).json(automobile);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/", async (request, response) => {
    try {
      const query = listAutomobilesQuerySchema.parse(request.query);
      const filters = {
        ...(query.plate ? { plate: query.plate } : {}),
        ...(query.color ? { color: query.color } : {}),
        ...(query.brand ? { brand: query.brand } : {}),
      };
      const automobiles = await getServices(request).automobiles.list.execute(
        Object.keys(filters).length > 0 ? filters : undefined,
      );

      return response.json(automobiles);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.get("/:id", async (request, response) => {
    try {
      const { id } = automobileIdParamsSchema.parse(request.params);
      const automobile = await getServices(request).automobiles.getById.execute(id);

      return response.json(automobile);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.put("/:id", async (request, response) => {
    try {
      const { id } = automobileIdParamsSchema.parse(request.params);
      const body = updateAutomobileBodySchema.parse(request.body);
      const automobile = await getServices(request).automobiles.update.execute({
        id,
        ...body,
      });

      return response.json(automobile);
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  router.delete("/:id", async (request, response) => {
    try {
      const { id } = automobileIdParamsSchema.parse(request.params);

      await getServices(request).automobiles.delete.execute(id);

      return response.status(204).send();
    } catch (error) {
      return handleHttpError(error, response);
    }
  });

  return router;
}
