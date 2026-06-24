import { beforeEach, describe, expect, it } from "@jest/globals";

import { createDriverDtoMock } from "../../../../__mocks__/driver-dto.mock";
import { executeControllerRoute } from "../../../../__mocks__/http-controller.mock";
import { createHttpServicesMock, HttpServicesMock } from "../../../../__mocks__/http-services.mock";
import { NotFoundError } from "../../../../core/application";
import { createDriverController } from "./driver-controller";

describe("DriverController", () => {
  let services: HttpServicesMock;

  beforeEach(() => {
    services = createHttpServicesMock();
  });

  describe("POST /drivers", () => {
    it("should create a driver", async () => {
      const driver = createDriverDtoMock();
      services.drivers.create.execute.mockResolvedValue(driver);

      const { response } = await executeControllerRoute(createDriverController(), "post", "/", {
        services,
        body: { name: "Joao Silva" },
      });

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(driver);
      expect(services.drivers.create.execute).toHaveBeenCalledWith({ name: "Joao Silva" });
    });

    it("should return 400 when creating a driver with invalid input", async () => {
      const { response } = await executeControllerRoute(createDriverController(), "post", "/", {
        services,
        body: { name: "   " },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "name", message: "Driver name is required." }],
      });
      expect(services.drivers.create.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /drivers", () => {
    it("should list drivers using the optional name filter", async () => {
      const driver = createDriverDtoMock();
      services.drivers.list.execute.mockResolvedValue([driver]);

      const { response } = await executeControllerRoute(createDriverController(), "get", "/", {
        services,
        query: { name: "Joao" },
      });

      expect(response.json).toHaveBeenCalledWith([driver]);
      expect(services.drivers.list.execute).toHaveBeenCalledWith({ name: "Joao" });
    });

    it("should return 400 when the name filter is empty", async () => {
      const { response } = await executeControllerRoute(createDriverController(), "get", "/", {
        services,
        query: { name: "   " },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "name", message: "Too small: expected string to have >=1 characters" }],
      });
      expect(services.drivers.list.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /drivers/:id", () => {
    it("should get a driver by id", async () => {
      const driver = createDriverDtoMock();
      services.drivers.getById.execute.mockResolvedValue(driver);

      const { response } = await executeControllerRoute(createDriverController(), "get", "/:id", {
        services,
        params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
      });

      expect(response.json).toHaveBeenCalledWith(driver);
      expect(services.drivers.getById.execute).toHaveBeenCalledWith(
        "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
      );
    });

    it("should return 404 when the driver is not found", async () => {
      services.drivers.getById.execute.mockRejectedValue(new NotFoundError("Driver not found."));

      const { response } = await executeControllerRoute(createDriverController(), "get", "/:id", {
        services,
        params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
      });

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Driver not found." });
    });

    it("should return 400 when the driver id is invalid", async () => {
      const { response } = await executeControllerRoute(createDriverController(), "get", "/:id", {
        services,
        params: { id: "invalid-id" },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "id", message: "Invalid UUID" }],
      });
      expect(services.drivers.getById.execute).not.toHaveBeenCalled();
    });
  });

  describe("PUT /drivers/:id", () => {
    it("should update a driver", async () => {
      const driver = createDriverDtoMock({ name: "Joao Pedro Silva" });
      services.drivers.update.execute.mockResolvedValue(driver);

      const { response } = await executeControllerRoute(createDriverController(), "put", "/:id", {
        services,
        params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
        body: { name: "Joao Pedro Silva" },
      });

      expect(response.json).toHaveBeenCalledWith(driver);
      expect(services.drivers.update.execute).toHaveBeenCalledWith({
        id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
        name: "Joao Pedro Silva",
      });
    });

    it("should return 404 when updating a driver that does not exist", async () => {
      services.drivers.update.execute.mockRejectedValue(new NotFoundError("Driver not found."));

      const { response } = await executeControllerRoute(createDriverController(), "put", "/:id", {
        services,
        params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
        body: { name: "Joao Pedro Silva" },
      });

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Driver not found." });
    });

    it("should return 400 when updating a driver with invalid input", async () => {
      const { response } = await executeControllerRoute(createDriverController(), "put", "/:id", {
        services,
        params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
        body: { name: "   " },
      });

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "name", message: "Driver name is required." }],
      });
      expect(services.drivers.update.execute).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /drivers/:id", () => {
    it("should delete a driver", async () => {
      services.drivers.delete.execute.mockResolvedValue(undefined);

      const { response } = await executeControllerRoute(
        createDriverController(),
        "delete",
        "/:id",
        {
          services,
          params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(204);
      expect(response.send).toHaveBeenCalled();
      expect(services.drivers.delete.execute).toHaveBeenCalledWith(
        "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
      );
    });

    it("should return 404 when deleting a driver that does not exist", async () => {
      services.drivers.delete.execute.mockRejectedValue(new NotFoundError("Driver not found."));

      const { response } = await executeControllerRoute(
        createDriverController(),
        "delete",
        "/:id",
        {
          services,
          params: { id: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Driver not found." });
    });
  });
});
