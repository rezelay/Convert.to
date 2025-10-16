import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Temperature units', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 0, currentUnit: "celsius", targetUnit: "fahrenheit", expected: 32 },
    { inputValue: 0, currentUnit: "celsius", targetUnit: "kelvin", expected: 273.15 },
  ];

  expectations.forEach(({ currentUnit, targetUnit, inputValue, expected }) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'temperature'
    }));
  })
});

