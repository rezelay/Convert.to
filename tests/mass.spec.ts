import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Mass units', () => {
  test.beforeEach(async ( { page }) => {
    await page.goto('/');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "kilogram", targetUnit: "gram", expected: 1000 },
    { inputValue: 1, currentUnit: "kilogram", targetUnit: "milligram", expected: 1000000 },
    { inputValue: 1, currentUnit: "kilogram", targetUnit: "tonne", expected: 0.001 },
    { inputValue: 1, currentUnit: "kilogram", targetUnit: "pound", expected: 2.2046244201837775 },
    { inputValue: 1, currentUnit: "kilogram", targetUnit: "ounce", expected: 35.27399072294044 },
  ];

  expectations.forEach(({currentUnit, targetUnit, inputValue, expected}) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'mass'
    }));
  })
});

