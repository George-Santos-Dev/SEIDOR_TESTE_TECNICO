export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "SEIDOR Technical Test API",
    version: "1.0.0",
    description: "REST API for managing drivers, automobiles, and vehicle usages.",
  },
  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],
  tags: [
    { name: "Health", description: "Simple application health check" },
    { name: "Drivers", description: "Driver registration and retrieval operations" },
    { name: "Automobiles", description: "Automobile registration and retrieval operations" },
    {
      name: "Vehicle Usages",
      description: "Operations to register and finish automobile usage",
    },
  ],
  components: {
    schemas: {
      Driver: {
        type: "object",
        required: ["id", "name", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string", format: "uuid", example: "0f8fad5b-d9cb-469f-a165-70867728950e" },
          name: { type: "string", example: "Maria Oliveira" },
          createdAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
        },
      },
      CreateDriverInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Maria Oliveira" },
        },
      },
      Automobile: {
        type: "object",
        required: ["id", "plate", "color", "brand", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string", format: "uuid", example: "a6c4c2b6-b9de-4a4d-b2bb-1791f7a182f0" },
          plate: { type: "string", example: "BRA2E19" },
          color: { type: "string", example: "Silver" },
          brand: { type: "string", example: "Toyota" },
          createdAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
        },
      },
      CreateAutomobileInput: {
        type: "object",
        required: ["plate", "color", "brand"],
        properties: {
          plate: { type: "string", example: "BRA2E19" },
          color: { type: "string", example: "Silver" },
          brand: { type: "string", example: "Toyota" },
        },
      },
      VehicleUsage: {
        type: "object",
        required: [
          "id",
          "automobileId",
          "driverId",
          "reason",
          "startedAt",
          "endedAt",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string", format: "uuid", example: "f0476f85-04cb-40d0-a573-99ac823cdf15" },
          automobileId: {
            type: "string",
            format: "uuid",
            example: "a6c4c2b6-b9de-4a4d-b2bb-1791f7a182f0",
          },
          driverId: {
            type: "string",
            format: "uuid",
            example: "0f8fad5b-d9cb-469f-a165-70867728950e",
          },
          reason: { type: "string", example: "Technical visit to client" },
          startedAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
          endedAt: {
            anyOf: [{ type: "string", format: "date-time" }, { type: "null" }],
            example: null,
          },
          createdAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
        },
      },
      DetailedVehicleUsage: {
        allOf: [
          { $ref: "#/components/schemas/VehicleUsage" },
          {
            type: "object",
            required: ["driverName", "automobile"],
            properties: {
              driverName: { type: "string", example: "Maria Oliveira" },
              automobile: {
                type: "object",
                required: ["id", "plate", "color", "brand"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "a6c4c2b6-b9de-4a4d-b2bb-1791f7a182f0",
                  },
                  plate: { type: "string", example: "BRA2E19" },
                  color: { type: "string", example: "Silver" },
                  brand: { type: "string", example: "Toyota" },
                },
              },
            },
          },
        ],
      },
      CreateVehicleUsageInput: {
        type: "object",
        required: ["automobileId", "driverId", "reason", "startedAt"],
        properties: {
          automobileId: {
            type: "string",
            format: "uuid",
            example: "a6c4c2b6-b9de-4a4d-b2bb-1791f7a182f0",
          },
          driverId: {
            type: "string",
            format: "uuid",
            example: "0f8fad5b-d9cb-469f-a165-70867728950e",
          },
          reason: { type: "string", example: "Technical visit to client" },
          startedAt: { type: "string", format: "date-time", example: "2026-06-24T12:00:00.000Z" },
        },
      },
      FinishVehicleUsageInput: {
        type: "object",
        required: ["endedAt"],
        properties: {
          endedAt: { type: "string", format: "date-time", example: "2026-06-24T18:00:00.000Z" },
        },
      },
      ValidationError: {
        type: "object",
        required: ["message", "issues"],
        properties: {
          message: { type: "string", example: "Validation failed." },
          issues: {
            type: "array",
            items: {
              type: "object",
              required: ["path", "message"],
              properties: {
                path: { type: "string", example: "name" },
                message: { type: "string", example: "Driver name is required." },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string", example: "Driver not found." },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "API status",
        responses: {
          "200": {
            description: "Application is running",
            content: {
              "text/plain": {
                schema: { type: "string", example: "API running with TypeScript + Express" },
              },
            },
          },
        },
      },
    },
    "/drivers": {
      post: {
        tags: ["Drivers"],
        summary: "Create a driver",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateDriverInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Driver created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Driver" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
      get: {
        tags: ["Drivers"],
        summary: "List drivers",
        parameters: [
          {
            in: "query",
            name: "name",
            schema: { type: "string" },
            description: "Filter by name",
          },
        ],
        responses: {
          "200": {
            description: "List of drivers",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Driver" },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
    },
    "/drivers/{id}": {
      get: {
        tags: ["Drivers"],
        summary: "Get a driver by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Driver found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Driver" },
              },
            },
          },
          "404": {
            description: "Driver not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      put: {
        tags: ["Drivers"],
        summary: "Update a driver",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateDriverInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Driver updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Driver" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Driver not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Drivers"],
        summary: "Delete a driver",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "204": {
            description: "Driver deleted",
          },
          "404": {
            description: "Driver not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/automobiles": {
      post: {
        tags: ["Automobiles"],
        summary: "Create an automobile",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAutomobileInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Automobile created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Automobile" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
      get: {
        tags: ["Automobiles"],
        summary: "List automobiles",
        parameters: [
          {
            in: "query",
            name: "plate",
            schema: { type: "string" },
            description: "Filter by plate",
          },
          {
            in: "query",
            name: "color",
            schema: { type: "string" },
            description: "Filter by color",
          },
          {
            in: "query",
            name: "brand",
            schema: { type: "string" },
            description: "Filter by brand",
          },
        ],
        responses: {
          "200": {
            description: "List of automobiles",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Automobile" },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
    },
    "/automobiles/{id}": {
      get: {
        tags: ["Automobiles"],
        summary: "Get an automobile by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Automobile found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Automobile" },
              },
            },
          },
          "404": {
            description: "Automobile not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      put: {
        tags: ["Automobiles"],
        summary: "Update an automobile",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAutomobileInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Automobile updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Automobile" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Automobile not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Automobiles"],
        summary: "Delete an automobile",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "204": {
            description: "Automobile deleted",
          },
          "404": {
            description: "Automobile not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/vehicle-usages": {
      post: {
        tags: ["Vehicle Usages"],
        summary: "Register an automobile usage",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateVehicleUsageInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Usage registered successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VehicleUsage" },
              },
            },
          },
          "400": {
            description: "Validation or domain rule error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Related resource not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "409": {
            description: "Vehicle or driver usage conflict",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      get: {
        tags: ["Vehicle Usages"],
        summary: "List vehicle usages",
        parameters: [
          {
            in: "query",
            name: "startedAtFrom",
            schema: { type: "string", format: "date-time" },
            description: "Filter by minimum start date",
          },
          {
            in: "query",
            name: "startedAtTo",
            schema: { type: "string", format: "date-time" },
            description: "Filter by maximum start date",
          },
          {
            in: "query",
            name: "endedAtFrom",
            schema: { type: "string", format: "date-time" },
            description: "Filter by minimum end date",
          },
          {
            in: "query",
            name: "endedAtTo",
            schema: { type: "string", format: "date-time" },
            description: "Filter by maximum end date",
          },
        ],
        responses: {
          "200": {
            description: "Detailed usage list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/DetailedVehicleUsage" },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
    },
    "/vehicle-usages/{id}": {
      get: {
        tags: ["Vehicle Usages"],
        summary: "Get a vehicle usage by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Usage found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VehicleUsage" },
              },
            },
          },
          "404": {
            description: "Usage not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/vehicle-usages/{id}/finish": {
      patch: {
        tags: ["Vehicle Usages"],
        summary: "Finish a vehicle usage",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FinishVehicleUsageInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Usage finished successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VehicleUsage" },
              },
            },
          },
          "400": {
            description: "Validation or domain rule error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Usage not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
} as const;
