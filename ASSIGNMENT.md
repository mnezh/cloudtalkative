Next Gen Business Calling Software
Fully Remote / Bratislava / Praha / Málaga

Hello! We hope you enjoy working on this assignment for QA Automation Engineer

Here is a simple public API for converting Unix epoch time to a human-readable format: https://helloacm.com/tools/unix-timestamp-converter/

## Task

Create a test suite for this API. Assume this is a **mission-critical production service publicly exposed over the Internet**.

You can use any programming language, tooling, and frameworks you typically rely on for test automation.

The expected deliverable is a **Git repository** we can clone from GitHub (or similar), with:

- API-level automated tests
- UI E2E automation (see below)
- Basic performance/load test
- Documentation on how to run everything from the command line

## Scope

Your goal is to demonstrate the following:

### API Testing

- **Clean, maintainable test automation** for HTTP APIs
- **Thoughtful test design** (positive, negative, edge cases)
- Reusability and good structure

### UI E2E Testing

Since the API has no frontend, please either:

1.  **Create a simple mock UI** (e.g., basic form or static app) that consumes the API and write E2E tests for it;
2.  **OR, if you don't want to build a UI, provide a well-structured test plan and E2E test architecture** (e.g., tooling, coverage strategy, CI approach) as if you were to automate a real UI on top of this API.

We recommend **Playwright or Cypress**, but feel free to use anything you're comfortable with.

### Performance Testing

- Provide a **minimal performance test** using a tool like **k6, Gatling**, or similar
- Simulate concurrent requests and explain what metrics you'd track (latency, throughput, error rate, etc.)

## Bonus: Strategy & Improvements

Include a short doc describing your approach to:

- Scaling test automation across services
- Avoiding flakiness and ensuring test reliability
- Balancing unit/integration/E2E tests
- Ensuring smart test coverage in a growing org

Suggest how this API could be improved from a testing or reliability point of view.

---

## Summary of What to Deliver

- Git repo with your API, E2E, and performance test code
- Instructions on how to run everything
- A test strategy or architecture write-up
- (Optional) Suggestions on improving the API or testing setup

Good luck, and thanks for taking the time!
