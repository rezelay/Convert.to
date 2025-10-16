import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Energy units', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "joule", targetUnit: "calorie", expected: 0.23901 },            // ≈ 0.239
    { inputValue: 1, currentUnit: "joule", targetUnit: "kilocalorie", expected: 0.00024 },         // ≈ 0.000239
    { inputValue: 1, currentUnit: "joule", targetUnit: "kilowatt_hour", expected: 0 },      // ≈ 2.7778e-7
    { inputValue: 1, currentUnit: "joule", targetUnit: "btu", expected: 0.00095 }
  ];

  expectations.forEach(({ currentUnit, targetUnit, inputValue, expected }) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'energy'
    }));
  })
});

