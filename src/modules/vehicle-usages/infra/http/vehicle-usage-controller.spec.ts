import { beforeEach, describe, expect, it } from "@jest/globals";

import {
  createDetailedVehicleUsageDtoMock,
  createVehicleUsageDtoMock,
} from "../../../../__mocks__/vehicle-usage-dto.mock";
import { executeControllerRoute } from "../../../../__mocks__/http-controller.mock";
import { createHttpServicesMock, HttpServicesMock } from "../../../../__mocks__/http-services.mock";
import { NotFoundError } from "../../../../core/application";
import { DomainError } from "../../../../core/domain";
import { createVehicleUsageController } from "./vehicle-usage-controller";

describe("VehicleUsageController", () => {
  let services: HttpServicesMock;

  beforeEach(() => {
    services = createHttpServicesMock();
  });

  describe("POST /vehicle-usages", () => {
    it("should create a vehicle usage and parse the date", async () => {
      const vehicleUsage = createVehicleUsageDtoMock();
      services.vehicleUsages.create.execute.mockResolvedValue(vehicleUsage);

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "post",
        "/",
        {
          services,
          body: {
            automobileId: "de5d8441-7673-458e-9339-6ebd7e624f68",
            driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
            reason: "Visita a cliente",
            startedAt: "2026-06-23T10:00:00.000Z",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(vehicleUsage);
      expect(services.vehicleUsages.create.execute).toHaveBeenCalledWith({
        automobileId: "de5d8441-7673-458e-9339-6ebd7e624f68",
        driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
        reason: "Visita a cliente",
        startedAt: new Date("2026-06-23T10:00:00.000Z"),
      });
    });

    it("should return 400 when creating a vehicle usage with an invalid body", async () => {
      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "post",
        "/",
        {
          services,
          body: {
            automobileId: "invalid-id",
            driverId: "7d5d1f1a-d8f5-4db6-aeea-c2c78f6fe901",
            reason: "   ",
            startedAt: "invalid-date",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [
          { path: "automobileId", message: "Invalid UUID" },
          { path: "reason", message: "Usage reason is required." },
          { path: "startedAt", message: "Invalid ISO datetime" },
        ],
      });
      expect(services.vehicleUsages.create.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /vehicle-usages", () => {
    it("should list vehicle usages using date filters", async () => {
      const vehicleUsage = createDetailedVehicleUsageDtoMock();
      services.vehicleUsages.list.execute.mockResolvedValue([vehicleUsage]);

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "get",
        "/",
        {
          services,
          query: {
            startedAtFrom: "2026-06-01T00:00:00.000Z",
            startedAtTo: "2026-06-30T23:59:59.999Z",
          },
        },
      );

      expect(response.json).toHaveBeenCalledWith([vehicleUsage]);
      expect(services.vehicleUsages.list.execute).toHaveBeenCalledWith({
        startedAtFrom: new Date("2026-06-01T00:00:00.000Z"),
        startedAtTo: new Date("2026-06-30T23:59:59.999Z"),
      });
    });

    it("should return 400 when the date filters are invalid", async () => {
      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "get",
        "/",
        {
          services,
          query: {
            startedAtFrom: "not-a-date",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "startedAtFrom", message: "Invalid ISO datetime" }],
      });
      expect(services.vehicleUsages.list.execute).not.toHaveBeenCalled();
    });
  });

  describe("GET /vehicle-usages/:id", () => {
    it("should get a vehicle usage by id", async () => {
      const vehicleUsage = createVehicleUsageDtoMock();
      services.vehicleUsages.getById.execute.mockResolvedValue(vehicleUsage);

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "get",
        "/:id",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
        },
      );

      expect(response.json).toHaveBeenCalledWith(vehicleUsage);
    });

    it("should return 404 when a vehicle usage is not found", async () => {
      services.vehicleUsages.getById.execute.mockRejectedValue(
        new NotFoundError("Vehicle usage not found."),
      );

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "get",
        "/:id",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Vehicle usage not found." });
    });

    it("should return 400 when the vehicle usage id is invalid", async () => {
      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "get",
        "/:id",
        {
          services,
          params: { id: "invalid-id" },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "id", message: "Invalid UUID" }],
      });
      expect(services.vehicleUsages.getById.execute).not.toHaveBeenCalled();
    });
  });

  describe("PATCH /vehicle-usages/:id/finish", () => {
    it("should finish a vehicle usage", async () => {
      const vehicleUsage = createVehicleUsageDtoMock({
        endedAt: new Date("2026-06-23T18:00:00.000Z"),
      });
      services.vehicleUsages.finish.execute.mockResolvedValue(vehicleUsage);

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "patch",
        "/:id/finish",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
          body: {
            endedAt: "2026-06-23T18:00:00.000Z",
          },
        },
      );

      expect(response.json).toHaveBeenCalledWith(vehicleUsage);
      expect(services.vehicleUsages.finish.execute).toHaveBeenCalledWith({
        id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617",
        endedAt: new Date("2026-06-23T18:00:00.000Z"),
      });
    });

    it("should return 404 when finishing a vehicle usage that does not exist", async () => {
      services.vehicleUsages.finish.execute.mockRejectedValue(
        new NotFoundError("Vehicle usage not found."),
      );

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "patch",
        "/:id/finish",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
          body: {
            endedAt: "2026-06-23T18:00:00.000Z",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: "Vehicle usage not found." });
    });

    it("should return 400 when finishing with an invalid domain rule", async () => {
      services.vehicleUsages.finish.execute.mockRejectedValue(
        new DomainError("Vehicle usage end date cannot be before start date."),
      );

      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "patch",
        "/:id/finish",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
          body: {
            endedAt: "2026-06-23T08:00:00.000Z",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Vehicle usage end date cannot be before start date.",
      });
    });

    it("should return 400 when finishing with an invalid body", async () => {
      const { response } = await executeControllerRoute(
        createVehicleUsageController(),
        "patch",
        "/:id/finish",
        {
          services,
          params: { id: "8dbbab24-f9e5-42b6-bec8-b1478f4a7617" },
          body: {
            endedAt: "invalid-date",
          },
        },
      );

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        issues: [{ path: "endedAt", message: "Invalid ISO datetime" }],
      });
      expect(services.vehicleUsages.finish.execute).not.toHaveBeenCalled();
    });
  });
});
