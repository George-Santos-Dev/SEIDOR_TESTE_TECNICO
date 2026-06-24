import { Request } from "express";

import { createInMemoryServices } from "../in-memory";

export type AppServices = ReturnType<typeof createInMemoryServices>;
type ExecutableOnly<T extends Record<string, { execute: unknown }>> = {
  [Key in keyof T]: Pick<T[Key], "execute">;
};

export interface HttpServices {
  automobiles: ExecutableOnly<AppServices["automobiles"]>;
  drivers: ExecutableOnly<AppServices["drivers"]>;
  vehicleUsages: ExecutableOnly<AppServices["vehicleUsages"]>;
}

export function getServices(request: Request): HttpServices {
  return (request.app.locals as { services: HttpServices }).services;
}
