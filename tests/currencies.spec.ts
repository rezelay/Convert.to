import { test } from '@playwright/test';
import { ConvertTest, Unit, TestScenario } from './common';

test.describe('Currencies', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/currencies.min.json', async route => {
        const json = { 
            brl: "Brazilian Real", 
            usd: "US Dollars", 
            jpy: "Japanese Yen",
            eur: "Euro",
            gbp: "British Pound"
        };
        await route.fulfill({ json });
    });

    await page.route('**/currencies/usd.min.json', async route => {
        const json = { 
            date: "2025-11-09",
            usd: { brl: 5 }
        };
        await route.fulfill({ json });
    });

    await page.route('**/currencies/eur.min.json', async route => {
        const json = { 
            date: "2025-11-09",
            eur: { brl: 6 }
        };
        await route.fulfill({ json });
    });

    await page.route('**/currencies/gbp.min.json', async route => {
        const json = { 
            date: "2025-11-09",
            gbp: { brl: 7 }
        };

        await route.fulfill({ json });
    });

    await page.route('**/currencies/jpy.min.json', async route => {
        const json = { 
            date: "2025-11-09",
            jpy: { brl: 0.035 }
        };;
        await route.fulfill({ json });
    });

    await page.goto('/popup');
  });

  const expectations: Partial<TestScenario>[] = [
    { inputValue: 1, currentUnit: "usd", targetUnit: "brl", expected: 5 },
    { inputValue: 1, currentUnit: "eur", targetUnit: "brl", expected: 6 },
    { inputValue: 1, currentUnit: "gbp", targetUnit: "brl", expected: 7 },
    { inputValue: 1, currentUnit: "jpy", targetUnit: "brl", expected: 0.035 }
  ];

  expectations.forEach(({ currentUnit, targetUnit, inputValue, expected }) => {
    test(`convert from ${currentUnit} to ${targetUnit}`, async ({ page }) => ConvertTest({
      page,
      inputValue: inputValue!,
      currentUnit: currentUnit as Unit,
      targetUnit: targetUnit as Unit,
      expected: expected!,
      type: 'currencies'
    }));
  })
});
