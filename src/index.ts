import express from "express";

import { createAutomobileController } from "./modules/automobiles/infra/http/automobile-controller";
import { createDriverController } from "./modules/drivers/infra/http/driver-controller";
import { createVehicleUsageController } from "./modules/vehicle-usages/infra/http/vehicle-usage-controller";
import { createInMemoryServices } from "./infra/in-memory";

const app = express();
const port = 3000;
const services = createInMemoryServices();

app.locals.services = services;
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API rodando com TypeScript + Express");
});

app.use("/drivers", createDriverController());
app.use("/automobiles", createAutomobileController());
app.use("/vehicle-usages", createVehicleUsageController());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
