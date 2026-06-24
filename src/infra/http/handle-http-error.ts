import { Response } from "express";
import { ZodError } from "zod";

import { ConflictError, NotFoundError } from "../../core/application";
import { DomainError } from "../../core/domain";

export function handleHttpError(error: unknown, response: Response): Response {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation failed.",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof NotFoundError) {
    return response.status(404).json({ message: error.message });
  }

  if (error instanceof ConflictError) {
    return response.status(409).json({ message: error.message });
  }

  if (error instanceof DomainError) {
    return response.status(400).json({ message: error.message });
  }

  console.error(error);

  return response.status(500).json({
    message: "Internal server error.",
  });
}
