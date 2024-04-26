import { test, expect } from '@playwright/test';

test.describe('Tool - Torrent to magnet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/torrent-to-magnet');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Torrent to magnet - IT Tools');
  });

  test('', async ({ page }) => {

  });
});