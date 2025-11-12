// tests/api/timestamp.spec.ts

import { expect } from '@playwright/test';

import { test, dateSeconds, dateYmdHis } from './fixtures.js';
import { valid24HDate, invalidInput, shouldFail } from '../data/inputs.js';

test.describe('Converter API', () => {
  valid24HDate.forEach(([inputDate, scenarioName]) => {
    test(`date string "${inputDate}" to timestamp (${scenarioName})`, async ({
      toTimeStamp,
    }) => {
      const expectedTimestamp = dateSeconds(`${inputDate} UTC`);
      const response = await toTimeStamp(inputDate);
      expect(response, `Response body for ${scenarioName}`).toBe(
        expectedTimestamp,
      );
    });

    test(`timestamp to 12h date string "${inputDate}" (${scenarioName})`, async ({
      toDateString,
    }) => {
      const inputTimestamp = dateSeconds(`${inputDate} UTC`);
      const response = await toDateString(inputTimestamp);
      expect(response, `Response body for ${scenarioName} ${response}`).toBe(
        dateYmdHis(inputDate),
      );
    });
  });

  invalidInput.forEach(([inputDate, scenarioName]) => {
    test(`invalid input: ${scenarioName} ${inputDate}`, async ({
      converter,
    }) => {
      const response = await converter(inputDate);
      expect(response, `Response body for ${scenarioName} ${response}`).toBe(
        'false',
      );
    });
  });

  shouldFail.forEach(([inputDate, scenarioName]) => {
    test.fail(
      `known bug: ${scenarioName} ${inputDate}`,
      async ({ converter }) => {
        const response = await converter(inputDate);
        expect(response, `Response body for ${scenarioName} ${response}`).toBe(
          'false',
        );
      },
    );
  });
});
