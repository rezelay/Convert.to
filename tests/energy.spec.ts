import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Energy units', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/popup');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "joule", targetUnit: "calorie", expected: 0.2390057361376673 },            // ≈ 0.239
    { inputValue: 1, currentUnit: "joule", targetUnit: "kilocalorie", expected: 0.0002390057361376673 },         // ≈ 0.000239
    { inputValue: 1, currentUnit: "joule", targetUnit: "kilowatt_hour", expected: 2.7777777777777776e-7 },      // ≈ 2.7778e-7
    { inputValue: 1, currentUnit: "joule", targetUnit: "btu", expected: 0.0009478133944988911 }
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

