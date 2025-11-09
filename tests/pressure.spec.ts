import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Pressure units', () => {
  test.beforeEach(async ( { page }) => {
    await page.goto('/popup');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "pascal", targetUnit: "bar", expected: 0.00001 },
    { inputValue: 1, currentUnit: "pascal", targetUnit: "atm", expected: 0.00000987 },
    { inputValue: 1, currentUnit: "pascal", targetUnit: "psi", expected: 0.000145 },
    { inputValue: 1, currentUnit: "pascal", targetUnit: "mmHg", expected: 0.0075 },
  ];

  expectations.forEach(({currentUnit, targetUnit, inputValue, expected}) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'pressure'
    }));
  })
});

