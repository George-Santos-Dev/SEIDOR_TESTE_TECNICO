import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { jest } from "@jest/globals";

import { HttpServices } from "../infra/http/http-context";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type RouterLayer = {
  route?: {
    path: string;
    methods: Record<string, boolean>;
    stack: Array<{
      handle: RequestHandler;
    }>;
  };
};

export interface ControllerTestRequest {
  body?: Request["body"];
  params?: Request["params"];
  query?: Request["query"];
  services: HttpServices;
}

export interface ResponseMock {
  status: jest.MockedFunction<(code: number) => ResponseMock>;
  json: jest.MockedFunction<(body: unknown) => ResponseMock>;
  send: jest.MockedFunction<(body?: unknown) => ResponseMock>;
}

export function createResponseMock(): ResponseMock {
  const response: ResponseMock = {
    status: jest.fn<(code: number) => ResponseMock>(),
    json: jest.fn<(body: unknown) => ResponseMock>(),
    send: jest.fn<(body?: unknown) => ResponseMock>(),
  };

  response.status.mockReturnValue(response);
  response.json.mockReturnValue(response);
  response.send.mockReturnValue(response);

  return response;
}

function createRequestMock(input: ControllerTestRequest): Request {
  return {
    body: input.body ?? {},
    params: input.params ?? {},
    query: input.query ?? {},
    app: {
      locals: {
        services: input.services,
      },
    },
  } as unknown as Request;
}

function getRouteHandler(router: Router, method: HttpMethod, path: string): RequestHandler {
  const layer = ((router as unknown as { stack: RouterLayer[] }).stack ?? []).find(
    (stackLayer) => stackLayer.route?.path === path && stackLayer.route.methods[method],
  );

  if (!layer?.route?.stack[0]?.handle) {
    throw new Error(`Route handler not found for ${method.toUpperCase()} ${path}.`);
  }

  return layer.route.stack[0].handle;
}

export async function executeControllerRoute(
  router: Router,
  method: HttpMethod,
  path: string,
  input: ControllerTestRequest,
) {
  const request = createRequestMock(input);
  const response = createResponseMock();
  const next = jest.fn() as unknown as NextFunction;
  const handler = getRouteHandler(router, method, path);

  await handler(request, response as unknown as Response, next);

  return {
    request,
    response,
    next,
  };
}
