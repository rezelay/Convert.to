import { Page, expect } from '@playwright/test';

type ConvertType = "length" | "mass" | "speed" | "volume" | "temperature" | "energy" | "pressure";
export type Unit = LengthUnit | MassUnit | SpeedUnit | VolumeUnit | TemperatureUnit | EnergyUnit | PressureUnit;

type LengthUnit = "meter" | "kilometer" | "centimeter" | "millimeter" | "mile" | "yard" | "foot" | "inch";
type MassUnit = "kilogram" | "gram" | "milligram" | "tonne" | "pound" | "ounce";
type SpeedUnit = "meter_per_second" | "kilometer_per_hour" | "mile_per_hour" | "knot";
type VolumeUnit = "liter" | "milliliter" | "cubic_meter" | "cubic_centimeter" | "gallon_us" | "gallon_uk" | "cup";
type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";
type EnergyUnit= "joule" | "calorie" | "kilocalorie" | "kilowatt_hour" | "btu";
type PressureUnit = "pascal" | "bar" | "atm" | "psi" | "mmHg";


export interface TestScenario {
  page: Page,
  type: ConvertType,
  inputValue: Number,
  currentUnit: Unit,
  targetUnit: Unit,
  expected: Number   
}

export const ConvertTest = async ({ page, type, inputValue, currentUnit, targetUnit, expected }: TestScenario) => {
  const [
    conversionTypeInput,
    quantityInput,
    currentUnitInput,
    targetUnitInput,
    resultDisplay,
    convertButton
  ] = await Promise.all([
    page.getByTestId("conversionTypeInput"),
    page.getByTestId("quantityInput"),
    page.getByTestId("currentUnitInput"),
    page.getByTestId("targetUnitInput"),
    page.getByTestId("resultDisplay"),
    page.getByTestId("convertBtn"),
  ]);

  await conversionTypeInput.selectOption(type);
  await currentUnitInput.selectOption(currentUnit);
  await targetUnitInput.selectOption(targetUnit);
  await quantityInput.fill(inputValue.toString());

  await convertButton.click();

  expect(Number.parseFloat(await resultDisplay.innerHTML())).toEqual(expected);
}