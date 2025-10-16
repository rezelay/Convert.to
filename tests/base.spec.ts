import { test, expect } from '@playwright/test';

test('Page load', async ({ page }) => {
  await page.goto('http://localhost/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Convert to/);
});

test('Swap button', async ({ page }) => {
  await page.goto('http://localhost/');

  const [swapBtn, currentUnitInput, targetUnitInput] = await Promise.all([
    page.getByTestId("swapBtn"),
    page.getByTestId("currentUnitInput"),
    page.getByTestId("targetUnitInput")
  ]);

  const [previousTarget, previousCurrent] = await Promise.all([targetUnitInput.inputValue(), currentUnitInput.inputValue()]);

  await swapBtn.click();
  await expect(targetUnitInput).toHaveValue(previousCurrent);
  await expect(currentUnitInput).toHaveValue(previousTarget);
})