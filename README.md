# QA Automation Assignment

This project contains automated API, E2E, and performance tests built with Playwright and TypeScript.  
It is configured to use ESLint and Prettier for code quality and automatic formatting.

## Requirements

- Node.js version 24 or higher  
- npm (included with Node.js)  
- Internet connection to install dependencies

## Project setup

Clone the repository and install all required dependencies.

1. Navigate to the project directory  
2. Run `npm install` to install all dependencies

The installation will set up:
- Playwright for functional and API tests  
- TypeScript compiler  
- ESLint with Prettier integration for code formatting and linting

## Running tests

Playwright tests can be executed using the npm scripts defined in `package.json`.

- Run all tests: `npm test`  
- Run only API tests: `npm run test:api`

Playwright configuration and test files are located in the `tests` folder.

## Code quality and formatting

The project uses ESLint (with the new flat config) and Prettier to enforce consistent code style.

- Check for lint errors: `npm run lint`  
- Automatically fix lint issues: `npm run lint:fix`  
- Reformat code with Prettier: `npm run format`

## Notes

- ESLint configuration is defined in `eslint.config.mjs`  
- Formatting rules are set in `.prettierrc`  
- TypeScript configuration is in `tsconfig.json`  
- Tests require Node.js environment variables defined in `.env` if applicable  

Ensure that your editor is configured to use the local ESLint and Prettier settings for the best developer experience.
