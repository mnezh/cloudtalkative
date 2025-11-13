# QA Automation Assignment

This project contains implementation of the [assignment](ASSIGNMENT.md):
automated API, E2E, and performance tests built with Playwright and TypeScript.  

It is configured to use ESLint and Prettier for code quality and automatic formatting.

## Table of Contents

- [QA Automation Assignment](#qa-automation-assignment)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Requirements](#requirements)
  - [Project setup](#project-setup)
  - [Running the application](#running-the-application)
  - [Running tests and reports](#running-tests-and-reports)
    - [Docker Workflow (Recommended for CI)](#docker-workflow-recommended-for-ci)
    - [Host Workflow (Requires local dependencies)](#host-workflow-requires-local-dependencies)
    - [Viewing Reports](#viewing-reports)
  - [Code quality and formatting](#code-quality-and-formatting)
  - [Notes](#notes)

---

## Project Structure

- `src/`
  - `server.ts`: Node.js/Express proxy server with built-in retry logic for the external API.
  - `public/`
    - `index.html`: The minimal UI for the timestamp converter.
    - `main.js`: Client-side JavaScript for handling UI interactions and API calls.
- `tests/`
  - `api/`
    - `fixtures.ts`: Playwright fixtures for creating API request functions with custom retry logic.
    - `timestamp.spec.ts`: Playwright tests covering API endpoint functionality for date and timestamp conversion.
  - `e2e/`
    - `converter-ui.spec.ts`: Playwright End-to-End tests simulating user interaction with the public UI.
  - `data/`
    - `inputs.ts`: TypeScript array definitions of valid and invalid date/timestamp test inputs.
  - `load/`
    - `timestamp-load.test.js`: k6 script defining the load test scenario and performance thresholds.
    - `testdata.json`: JSON data file providing a list of test dates used by the k6 load test.
- `Dockerfile`: Defines the reproducible Docker environment for running functional tests.
- `Makefile`: Automation tool for building the Docker image and running all test suites (functional and load).
- `package.json`: Project dependencies and npm test/utility scripts.

## Requirements

- Node.js version 24 or higher
- npm (included with Node.js)
- Docker (required for running tests via Makefile or in CI)

## Project setup

Clone the repository and install all required dependencies.

1. Navigate to the project directory
2. Run `npm install` to install all dependencies

The installation will set up:

- Playwright for functional and API tests
- TypeScript compiler
- ESLint with Prettier integration for code formatting and linting

## Running the application

The application proxy server can be started using `ts-node`. This server routes requests from the UI to the external timestamp API and includes built-in retry logic to handle rate limiting.

- Start the development server: `npm run web`

## Running tests and reports

The test framework can be executed either directly on the host machine using npm scripts, or through the provided **Makefile** and **Docker** for a standardized Continuous Integration (CI) environment.

### Docker Workflow (Recommended for CI)

This workflow uses the `cloudtalkative` Docker image and the `Makefile` to ensure environment consistency. All reports are generated to the host machine's `./reports` directory via volume mounting.

- Build the project Docker image: `make build`
- Run all functional tests (API/E2E): `make test`
- Run load tests (uses the official `grafana/k6` image): `make test-load`

### Host Workflow (Requires local dependencies)

Functional, API, E2E, and Load tests can be executed using the npm scripts defined in `package.json`. The optional environment variable `REPORT_DIR` can be used to customize the output folder (defaults to `reports`).

- Run all Playwright tests (API and E2E): `npm test`
- Run only API tests: `npm run test:api`
- Run only E2E (End-to-End) tests: `npm run test:e2e`
- Run load (performance) tests with k6: `npm run test:load`

### Viewing Reports

Reports are generated to the local `./reports` directory regardless of the execution method.

- View Playwright HTML Report: `npm run report:pw`
- View k6 Load Test HTML Report: `npm run report:load`

Playwright configuration and test files are located in the `tests` folder.

## Code quality and formatting

The project uses ESLint and Prettier to enforce consistent code style.

- Check for lint errors: `npm run lint`
- Automatically fix lint issues: `npm run lint:fix`
- Reformat code with Prettier: `npm run format`

## Notes

- ESLint configuration is defined in `eslint.config.mjs`
- Formatting rules are set in `.prettierrc`
- TypeScript configuration is in `tsconfig.json`
- Tests require Node.js environment variables defined in `.env` if applicable

Ensure that your editor is configured to use the local ESLint and Prettier settings for the best developer experience.