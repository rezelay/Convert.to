import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Volume units', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "liter", targetUnit: "milliliter", expected: 1000 },
    { inputValue: 1, currentUnit: "liter", targetUnit: "cubic_meter", expected: 0.001 },
    { inputValue: 1, currentUnit: "liter", targetUnit: "cubic_centimeter", expected: 1000 },
    { inputValue: 1, currentUnit: "liter", targetUnit: "gallon_us", expected: 0.26417217685798894 },
    { inputValue: 1, currentUnit: "liter", targetUnit: "gallon_uk", expected: 0.21996924829908776 },
    { inputValue: 1, currentUnit: "liter", targetUnit: "cup", expected: 4.166666666666667 }
  ];

  expectations.forEach(({ currentUnit, targetUnit, inputValue, expected }) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'volume'
    }));
  })
});

