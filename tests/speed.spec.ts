import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Speed units', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "meter_per_second", targetUnit: "kilometer_per_hour", expected: 3.5999971200023038 },
    { inputValue: 1, currentUnit: "meter_per_second", targetUnit: "mile_per_hour", expected: 2.2369362920544025 },
    { inputValue: 1, currentUnit: "meter_per_second", targetUnit: "knot", expected: 1.9438461717893492 },
  ];

  expectations.forEach(({ currentUnit, targetUnit, inputValue, expected }) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'speed'
    }));
  })
});

