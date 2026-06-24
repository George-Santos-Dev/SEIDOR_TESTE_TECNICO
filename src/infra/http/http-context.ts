import { Request } from "express";

import { createInMemoryServices } from "../in-memory";

export type AppServices = ReturnType<typeof createInMemoryServices>;

export function getServices(request: Request): AppServices {
  return (request.app.locals as { services: AppServices }).services;
}
