import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Length units', () => {
  test.beforeEach(async ( { page }) => {
    await page.goto('/popup');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "meter", targetUnit: "kilometer", expected: 0.001 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "centimeter", expected: 100 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "millimeter", expected: 1000 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "mile", expected: 0.0006213727366498068 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "yard", expected: 1.0936132983377078 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "foot", expected: 3.280839895013123 },
    { inputValue: 1, currentUnit: "meter", targetUnit: "inch", expected: 39.37007874015748 },
  ];

  expectations.forEach(({currentUnit, targetUnit, inputValue, expected}) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'length'
    }));
  })
});

