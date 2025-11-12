import { test as baseTest, expect } from '@playwright/test';

type ConverterFixtures = {
  converter: (input: string | number) => Promise<string>;
  toTimeStamp: (input: string) => Promise<number>;
  toDateString: (input: number) => Promise<string>;
};

const BASE_ENDPOINT = '/api/unix-timestamp-converter/?cached&s=';
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

export const test = baseTest.extend<ConverterFixtures>({
  converter: async ({ request }, use) => {
    const converterFn = async (input: string | number): Promise<string> => {
      const sanitizedInput = String(input).replace(' ', '%20');
      const endpoint = `${BASE_ENDPOINT}${sanitizedInput}`;

      for (let i = 0; i < MAX_RETRIES; i++) {
        const response = await request.get(endpoint);
        const status = response.status();

        if (status === 200) {
          return response.text();
        }

        if (status !== 429) {
          expect(status, `API response status for input: ${input}`).toBe(200);
        }

        if (i < MAX_RETRIES - 1) {
          const retryAfterHeader = response.headers()['retry-after'];
          let delayMs = 0;

          if (retryAfterHeader) {
            const retrySeconds = parseInt(retryAfterHeader, 10);
            if (!isNaN(retrySeconds)) {
              delayMs = retrySeconds * 1000;
            }
          }

          if (delayMs === 0) {
            delayMs = INITIAL_DELAY_MS * Math.pow(2, i);
            console.warn(
              `[API-RETRY] Rate limit hit (429) without Retry-After. Delaying with exponential backoff: ${delayMs}ms before attempt ${i + 2} for input: ${input}`,
            );
          } else {
            console.log(
              `[API-RETRY] Rate limit hit (429). Delaying based on Retry-After: ${delayMs}ms before attempt ${i + 2} for input: ${input}`,
            );
          }
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      // Final Failure: If loop completes, all attempts failed due to 429.
      throw new Error(
        `API request failed after ${MAX_RETRIES} retries due to persistent 429 error for input: ${input}.`,
      );
    };
    await use(converterFn);
  },

  toTimeStamp: async ({ converter }, use) => {
    await use(
      async (input: string): Promise<number> =>
        parseInt(await converter(input)),
    );
  },

  toDateString: async ({ converter }, use) => {
    const dateStringFn = async (input: number): Promise<string> => {
      const response = await converter(input);
      expectValidDateString(response);
      return response.slice(1, -1);
    };
    await use(dateStringFn);
  },
});

function expectValidDateString(responseString: string): void {
  // Regex for: "YYYY-MM-DD HH:MM:SS"
  expect(responseString).toMatch(/"\d{4}-\d{2}-\d{2}\s(\d{2}):(\d{2}):\d{2}"$/);
}

export function dateSeconds(dateString: string): number {
  return Date.parse(dateString) / 1000;
}

export function dateYmdHis(dateStr: string) {
  const date = new Date(dateStr);
  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const D = String(date.getDate()).padStart(2, '0');
  const H = date.getHours();
  // Calculate the 12-hour format 'h':
  // 0 (midnight) or 12 (noon) should be 12. Other hours are modulo 12.
  const h = String(H % 12 || 12).padStart(2, '0');
  const i = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${i}:${s}`;
}
