import express from "express";
import swaggerUi from "swagger-ui-express";

import { createInMemoryServices } from "./infra/in-memory";
import { HttpServices } from "./infra/http/http-context";
import { openApiDocument } from "./infra/http/swagger";
import { createAutomobileController } from "./modules/automobiles/infra/http/automobile-controller";
import { createDriverController } from "./modules/drivers/infra/http/driver-controller";
import { createVehicleUsageController } from "./modules/vehicle-usages/infra/http/vehicle-usage-controller";

export function createApp(services: HttpServices = createInMemoryServices()) {
  const app = express();

  app.locals.services = services;
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("API rodando com TypeScript + Express");
  });

  app.get("/openapi.json", (_req, res) => {
    res.json(openApiDocument);
  });

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      explorer: true,
      customSiteTitle: "SEIDOR Teste Tecnico API Docs",
      swaggerOptions: {
        url: "/openapi.json",
      },
    }),
  );

  app.use("/drivers", createDriverController());
  app.use("/automobiles", createAutomobileController());
  app.use("/vehicle-usages", createVehicleUsageController());

  return app;
}
