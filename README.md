# QA Automation Assignment

This project contains implementation of the [assignment](ASSIGNMENT.md):
automated API, E2E, and performance tests built with Playwright and TypeScript.  

It is configured to use ESLint and Prettier for code quality and automatic formatting.

## Requirements

- Node.js version 24 or higher
- npm (included with Node.js)
- k6 Load Testing Tool (See [Installation Instructions](https://grafana.com/docs/k6/latest/set-up/install-k6/))

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

Functional, API, E2E, and Load tests can be executed using the npm scripts defined in `package.json`. The optional environment variable `REPORT_DIR` can be used to customize the output folder (defaults to `reports`).

- Run all Playwright tests (API and E2E): `npm test`
- Run only API tests: `npm run test:api`
- Run only E2E (End-to-End) tests: `npm run test:e2e`
- Run load (performance) tests with k6: `npm run test:load`

### Viewing Reports

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