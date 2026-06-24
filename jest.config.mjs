import { createDefaultPreset } from "ts-jest";

const tsJestPreset = createDefaultPreset({
  tsconfig: "<rootDir>/tsconfig.jest.json",
});

/** @type {import("jest").Config} */
const config = {
  ...tsJestPreset,
  testEnvironment: "node",
  clearMocks: true,
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/**/*.d.ts"],
};

export default config;
