# SEIDOR Technical Test

REST API built with TypeScript and Express for managing drivers, automobiles, and vehicle usages. The project was structured with a strong focus on separation of responsibilities, explicit domain rules, and ease of maintenance.

## Overview

This application allows you to:

- create, list, retrieve, update, and delete drivers;
- create, list, retrieve, update, and delete automobiles;
- register the start of an automobile usage by a driver;
- finish a vehicle usage;
- query usage history with period-based filters;
- explore the API through Swagger UI.

Important: data is stored in memory. When the application restarts, the state is lost.

## Stack

- Node.js
- TypeScript
- Express
- Zod
- Jest
- Swagger UI
- Docker

## Architecture

The project follows a modular organization inspired by DDD and Clean Architecture:

- `core/`: base abstractions and domain/application building blocks.
- `modules/`: business modules separated by context.
- `domain/`: entities, value objects, rules, and repository contracts.
- `application/`: use cases and DTOs.
- `infra/`: HTTP adapters and in-memory repositories.

### Folder Structure

```text
src/
  core/
    application/
    domain/
  infra/
    http/
    in-memory/
  modules/
    automobiles/
      application/
      domain/
      infra/
    drivers/
      application/
      domain/
      infra/
    vehicle-usages/
      application/
      domain/
      infra/
  index.ts
  app.ts
```

## Requirements

- Node.js 22+ recommended
- npm 10+ recommended
- Docker 24+ optional, for containerized execution

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start in development mode

```bash
npm run dev
```

The API will be available at:

- `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/openapi.json`

### 3. Production build

```bash
npm run build
npm start
```

## Running with Docker

### Build the image

```bash
docker build -t seidor-teste-tecnico .
```

### Run the container

```bash
docker run --rm -p 3000:3000 seidor-teste-tecnico
```

If you want to customize the application's internal port:

```bash
docker run --rm -e PORT=3000 -p 3000:3000 seidor-teste-tecnico
```

## Available Scripts

- `npm run dev`: starts the API with automatic reload.
- `npm run build`: compiles the project into `dist/`.
- `npm start`: runs the compiled version.
- `npm run typecheck`: validates TypeScript typing.
- `npm run lint`: runs ESLint.
- `npm run lint:fix`: fixes supported lint issues.
- `npm run format`: formats the code with Prettier.
- `npm run format:check`: validates formatting.
- `npm run check`: runs typecheck, lint, and formatting validation.
- `npm test`: runs the test suite.
- `npm run test:watch`: runs tests in watch mode.
- `npm run test:coverage`: generates test coverage.

## API Documentation

The interactive documentation is available at `/docs` using Swagger UI.

You can also consume the OpenAPI JSON specification at `/openapi.json`, which makes integration easier with tools such as:

- Postman
- Insomnia
- Swagger Editor
- SDK generators

## Main Routes

### Health

- `GET /`

### Drivers

- `POST /drivers`
- `GET /drivers`
- `GET /drivers/:id`
- `PUT /drivers/:id`
- `DELETE /drivers/:id`

### Automobiles

- `POST /automobiles`
- `GET /automobiles`
- `GET /automobiles/:id`
- `PUT /automobiles/:id`
- `DELETE /automobiles/:id`

### Vehicle Usages

- `POST /vehicle-usages`
- `GET /vehicle-usages`
- `GET /vehicle-usages/:id`
- `PATCH /vehicle-usages/:id/finish`

## Quality and Tests

The project includes automated tests for:

- entities and value objects;
- use cases;
- HTTP schemas;
- controllers;
  To run them:

```bash
npm test
```
