import { jest } from "@jest/globals";

import { HttpServices } from "../infra/http/http-context";

type MockExecutable<T> = T extends { execute: (...args: infer Args) => infer Result }
  ? {
      execute: jest.MockedFunction<(...args: Args) => Result>;
    }
  : never;

export type HttpServicesMock = {
  [Key in keyof HttpServices]: {
    [NestedKey in keyof HttpServices[Key]]: MockExecutable<HttpServices[Key][NestedKey]>;
  };
};

export interface HttpServicesMockOverrides {
  automobiles?: Partial<HttpServicesMock["automobiles"]>;
  drivers?: Partial<HttpServicesMock["drivers"]>;
  vehicleUsages?: Partial<HttpServicesMock["vehicleUsages"]>;
}

export function createHttpServicesMock(
  overrides: HttpServicesMockOverrides = {},
): HttpServicesMock {
  const baseMock: HttpServicesMock = {
    automobiles: {
      create: { execute: jest.fn() },
      update: { execute: jest.fn() },
      delete: { execute: jest.fn() },
      getById: { execute: jest.fn() },
      list: { execute: jest.fn() },
    },
    drivers: {
      create: { execute: jest.fn() },
      update: { execute: jest.fn() },
      delete: { execute: jest.fn() },
      getById: { execute: jest.fn() },
      list: { execute: jest.fn() },
    },
    vehicleUsages: {
      create: { execute: jest.fn() },
      finish: { execute: jest.fn() },
      getById: { execute: jest.fn() },
      list: { execute: jest.fn() },
    },
  };

  return {
    automobiles: {
      ...baseMock.automobiles,
      ...overrides.automobiles,
    },
    drivers: {
      ...baseMock.drivers,
      ...overrides.drivers,
    },
    vehicleUsages: {
      ...baseMock.vehicleUsages,
      ...overrides.vehicleUsages,
    },
  };
}
