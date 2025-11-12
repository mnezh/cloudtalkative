// playwright.config.ts
import { defineConfig } from "@playwright/test";
import "dotenv/config"; // Crucial for loading environment variables
import "process";

/**
 * Read environment variables from .env.default or .env file.
 */
const API_BASE_URL = process.env.API_BASE_URL || "https://helloacm.com";

export default defineConfig({
  testDir: "./tests", // Look for tests in the 'tests' directory
  fullyParallel: true,
  reporter: "html",

  projects: [
    {
      name: "API_Tests",
      testDir: "./tests/api/", // Only look in the 'api' subdirectory
      use: {
        // Use the 'request' fixture for API testing
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          Accept: "application/json",
        },
      },
    },
    // E2E_Tests project will go here later...
  ],
});
