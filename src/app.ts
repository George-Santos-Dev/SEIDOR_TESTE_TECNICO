import express from "express";

import { createInMemoryServices } from "./infra/in-memory";
import { HttpServices } from "./infra/http/http-context";
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

  app.use("/drivers", createDriverController());
  app.use("/automobiles", createAutomobileController());
  app.use("/vehicle-usages", createVehicleUsageController());

  return app;
}
