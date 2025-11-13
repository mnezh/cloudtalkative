// playwright.config.ts
import { defineConfig } from '@playwright/test';
import 'dotenv/config';
import 'process';

/**
 * Read environment variables from .env.default or .env file.
 */
const API_BASE_URL = process.env.API_BASE_URL || 'https://helloacm.com';
const E2E_BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

const REPORT_DIR = process.env.REPORT_DIR || 'reports';
const OUTPUT_DIR = `${REPORT_DIR}/functional`;

export default defineConfig({
  fullyParallel: true,
  outputDir: OUTPUT_DIR,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: `${OUTPUT_DIR}/html` }],
    ['junit', { outputFile: `${OUTPUT_DIR}/test-results.xml` }],
  ],
  projects: [
    {
      name: 'api',
      testDir: './tests/api/', // Only look in the 'api' subdirectory
      use: {
        baseURL: API_BASE_URL,
      },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e/', // Only look in the 'e2e' subdirectory
      use: {
        baseURL: E2E_BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
      },
    },
  ],
  webServer: {
    command: 'npm run web',
    url: E2E_BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
