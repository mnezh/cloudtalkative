import { test, expect } from '@playwright/test';

// The UI is very trivial, so are the tests
test.describe('Timestamp Converter UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('converts Unix timestamp to Date string', async ({ page }) => {
    await page.fill('#inputValue', '1451613802');
    await page.click('#convertBtn');
    await expect(page.locator('#resultLabel')).toContainText(
      '2016-01-01 02:03:22',
    );
  });

  test('converts Date string to Unix timestamp', async ({ page }) => {
    await page.fill('#inputValue', '2016-01-01 02:03:22');
    await page.click('#convertBtn');
    await expect(page.locator('#resultLabel')).toContainText('1451613802');
  });
});
