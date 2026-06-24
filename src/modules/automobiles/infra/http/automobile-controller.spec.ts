import { beforeEach, describe, expect, it } from "@jest/globals";

import { createAutomobileDtoMock } from "../../../../__mocks__/automobile-dto.mock";
import { executeControllerRoute } from "../../../../__mocks__/http-controller.mock";
import { createHttpServicesMock, HttpServicesMock } from "../../../../__mocks__/http-services.mock";
import { ConflictError, NotFoundError } from "../../../../core/application";
import { createAutomobileController } from "./automobile-controller";

describe("AutomobileController", () => {
  let services: HttpServicesMock;

  beforeEach(() => {
    services = createHttpServicesMock();
  });

  describe("POST /automobiles", () => {
    it("should create an automobile", async () => {
      const automobile = createAutomobileDtoMock();
      services.automobiles.create.execute.mockResolvedValue(automobile);

      const { response } = await executeControllerRoute(createAutomobileController(), "post", "/", {
        services,
        body: {
          plate: "abc1d23",
          color: "Branco",
          brand: "Toyota",
        },
      });

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(automobile);
      expect(services.automobiles.create.execute).toHaveBeenCalledWith({
        plate: "abc1d23",
        color: "Branco",
        brand: "Toyota",
      });
    });

    it("should return 409 when creating an automobile with an existing plate", async () => {
      services.automobiles.create.execute.mockRejectedValue(
        new ConflictError("Automobile with this plate already exists."),
      );

      const { response } = await executeControllerRoute(createAutomobileController(), "post", "/", {
        services,
        body: {
          plate: "abc1d23",
          color: "Branco",
          brand: "Toyota",
        },
      });

      expect(response.status).toHaveBeenCalledWith(409);
      expect(response.json).toHaveBeenCalledWith({
        message: "Automobile with this plate already exists.",
      });
    });

    it("should return 400 when the plate is empty", async () => {
      const { response } = await executeControllerRoute(createAutomobileController(), "post", "/", {
        services,
        body: {
          plate: "   ",
          color: "Branco",
          brand: "Toyota",
        },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "plate", message: "Automobile plate is required." }],
      });
      expect(services.automobiles.create.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /automobiles", () => {
    it("should list automobiles using query filters", async () => {
      const automobile = createAutomobileDtoMock();
      services.automobiles.list.execute.mockResolvedValue([automobile]);

      const { response } = await executeControllerRoute(createAutomobileController(), "get", "/", {
        services,
        query: { color: "Branco", brand: "Toyota", plate: "abc1d23" },
      });

      expect(response.json).toHaveBeenCalledWith([automobile]);
      expect(services.automobiles.list.execute).toHaveBeenCalledWith({
        color: "Branco",
        brand: "Toyota",
        plate: "abc1d23",
      });
    });

    it("should return 400 when the brand filter is empty", async () => {
      const { response } = await executeControllerRoute(createAutomobileController(), "get", "/", {
        services,
        query: { brand: "   " },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "brand", message: "Too small: expected string to have >=1 characters" }],
      });
      expect(services.automobiles.list.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /automobiles/:id", () => {
    it("should get an automobile by id", async () => {
      const automobile = createAutomobileDtoMock();
      services.automobiles.getById.execute.mockResolvedValue(automobile);

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "get",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
        },
      );

      expect(response.json).toHaveBeenCalledWith(automobile);
    });

    it("should return 404 when the automobile is not found", async () => {
      services.automobiles.getById.execute.mockRejectedValue(
        new NotFoundError("Automobile not found."),
      );

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "get",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Automobile not found." });
    });
  });

  describe("PUT /automobiles/:id", () => {
    it("should update an automobile", async () => {
      const automobile = createAutomobileDtoMock({ plate: "BRA2E45", brand: "Honda" });
      services.automobiles.update.execute.mockResolvedValue(automobile);

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "put",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
          body: {
            plate: "bra2e45",
            color: "Preto",
            brand: "Honda",
          },
        },
      );

      expect(response.json).toHaveBeenCalledWith(automobile);
      expect(services.automobiles.update.execute).toHaveBeenCalledWith({
        id: "de5d8441-7673-458e-9339-6ebd7e624f68",
        plate: "bra2e45",
        color: "Preto",
        brand: "Honda",
      });
    });

    it("should return 404 when updating an automobile that does not exist", async () => {
      services.automobiles.update.execute.mockRejectedValue(
        new NotFoundError("Automobile not found."),
      );

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "put",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
          body: {
            plate: "bra2e45",
            color: "Preto",
            brand: "Honda",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Automobile not found." });
    });

    it("should return 400 when updating an automobile with an empty color", async () => {
      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "put",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
          body: {
            plate: "bra2e45",
            color: "   ",
            brand: "Honda",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "color", message: "Automobile color is required." }],
      });
      expect(services.automobiles.update.execute).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /automobiles/:id", () => {
    it("should delete an automobile", async () => {
      services.automobiles.delete.execute.mockResolvedValue(undefined);

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "delete",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(204);
      expect(response.send).toHaveBeenCalled();
      expect(services.automobiles.delete.execute).toHaveBeenCalledWith(
        "de5d8441-7673-458e-9339-6ebd7e624f68",
      );
    });

    it("should return 409 when deleting an automobile that is in use", async () => {
      services.automobiles.delete.execute.mockRejectedValue(
        new ConflictError("Automobile is currently in use."),
      );

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "delete",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(409);
      expect(response.json).toHaveBeenCalledWith({
        message: "Automobile is currently in use.",
      });
    });

    it("should return 404 when deleting an automobile that does not exist", async () => {
      services.automobiles.delete.execute.mockRejectedValue(
        new NotFoundError("Automobile not found."),
      );

      const { response } = await executeControllerRoute(
        createAutomobileController(),
        "delete",
        "/:id",
        {
          services,
          params: { id: "de5d8441-7673-458e-9339-6ebd7e624f68" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Automobile not found." });
    });
  });
});
