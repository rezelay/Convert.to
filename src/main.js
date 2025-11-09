const conversionTypeInput = document.getElementById('conversionTypeInput');
const quantityInput = document.getElementById('quantityInput');
const shortUnitSpan = document.getElementById('shortUnitSpan');
const currentUnitInput = document.getElementById('currentUnitInput');
const targetUnitInput = document.getElementById('targetUnitInput');
const swapBtn = document.getElementById('swapBtn');
const resultDisplay = document.getElementById('resultDisplay');
const convertBtn = document.getElementById('convertBtn');
const lastUpdatedHeading = document.getElementById('lastUpdatedHeading');

const units = {
  length: [
    { name: "Meter", value: "meter", abbr: "m" },
    { name: "Kilometer", value: "kilometer", abbr: "km" },
    { name: "Centimeter", value: "centimeter", abbr: "cm" },
    { name: "Millimeter", value: "millimeter", abbr: "mm" },
    { name: "Mile", value: "mile", abbr: "mi" },
    { name: "Yard", value: "yard", abbr: "yd" },
    { name: "Foot", value: "foot", abbr: "ft" },
    { name: "Inch", value: "inch", abbr: "in" }
  ],
  mass: [
    { name: "Kilogram", value: "kilogram", abbr: "kg" },
    { name: "Gram", value: "gram", abbr: "g" },
    { name: "Milligram", value: "milligram", abbr: "mg" },
    { name: "Tonne", value: "tonne", abbr: "t" },
    { name: "Pound", value: "pound", abbr: "lb" },
    { name: "Ounce", value: "ounce", abbr: "oz" }
  ],
  speed: [
    { name: "Meter per second", value: "meter_per_second", abbr: "m/s" },
    { name: "Kilometer per hour", value: "kilometer_per_hour", abbr: "km/h" },
    { name: "Mile per hour", value: "mile_per_hour", abbr: "mph" },
    { name: "Knot", value: "knot", abbr: "kn" }
  ],
  volume: [
    { name: "Liter", value: "liter", abbr: "L" },
    { name: "Milliliter", value: "milliliter", abbr: "mL" },
    { name: "Cubic meter", value: "cubic_meter", abbr: "m³" },
    { name: "Cubic centimeter", value: "cubic_centimeter", abbr: "cm³" },
    { name: "Gallon (US)", value: "gallon_us", abbr: "gal (US)" },
    { name: "Gallon (UK)", value: "gallon_uk", abbr: "gal (UK)" },
    { name: "Cup", value: "cup", abbr: "cup" }
  ],
  temperature: [
    { name: "Celsius", value: "celsius", abbr: "°C" },
    { name: "Fahrenheit", value: "fahrenheit", abbr: "°F" },
    { name: "Kelvin", value: "kelvin", abbr: "K" }
  ],
  energy: [
    { name: "Joule", value: "joule", abbr: "J" },
    { name: "Calorie", value: "calorie", abbr: "cal" },
    { name: "Kilocalorie", value: "kilocalorie", abbr: "kcal" },
    { name: "Kilowatt-hour", value: "kilowatt_hour", abbr: "kWh" },
    { name: "British thermal unit", value: "btu", abbr: "BTU" }
  ],
  pressure: [
    { name: "Pascal", value: "pascal", abbr: "Pa" },
    { name: "Bar", value: "bar", abbr: "bar" },
    { name: "Atmosphere", value: "atm", abbr: "atm" },
    { name: "Pound per square inch", value: "psi", abbr: "psi" },
    { name: "Millimeter of mercury", value: "mmHg", abbr: "mmHg" }
  ],
};

const abbreviations = {
  meter: "m",
  kilometer: "km",
  centimeter: "cm",
  millimeter: "mm",
  mile: "mi",
  yard: "yd",
  foot: "ft",
  inch: "in",
  kilogram: "kg",
  gram: "g",
  milligram: "mg",
  tonne: "t",
  pound: "lb",
  ounce: "oz",
  meter_per_second: "m/s",
  kilometer_per_hour: "km/h",
  mile_per_hour: "mph",
  knot: "kn",
  liter: "L",
  milliliter: "mL",
  cubic_meter: "m³",
  cubic_centimeter: "cm³",
  gallon_us: "gal (US)",
  gallon_uk: "gal (UK)",
  cup: "cup",
  celsius: "°C",
  fahrenheit: "°F",
  kelvin: "K",
  joule: "J",
  calorie: "cal",
  kilocalorie: "kcal",
  kilowatt_hour: "kWh",
  btu: "BTU",
  pascal: "Pa",
  bar: "bar",
  atm: "atm",
  psi: "psi",
  mmHg: "mmHg"
};

const conversionData = {
  length: {
    base: "meter",
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254
    }
  },
  mass: {
    base: "kilogram",
    units: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      tonne: 1000,
      pound: 0.453592,
      ounce: 0.0283495
    }
  },
  volume: {
    base: "liter",
    units: {
      liter: 1,
      milliliter: 0.001,
      cubic_meter: 1000,
      cubic_centimeter: 0.001,
      gallon_us: 3.78541,
      gallon_uk: 4.54609,
      cup: 0.24
    }
  },
  area: {
    base: "square_meter",
    units: {
      square_meter: 1,
      square_kilometer: 1e6,
      hectare: 10000,
      acre: 4046.86,
      square_foot: 0.092903,
      square_inch: 0.00064516
    }
  },
  speed: {
    base: "meter_per_second",
    units: {
      meter_per_second: 1,
      kilometer_per_hour: 0.277778,
      mile_per_hour: 0.44704,
      knot: 0.514444
    }
  },
  energy: {
    base: "joule",
    units: {
      joule: 1,
      calorie: 4.184,
      kilocalorie: 4184,
      kilowatt_hour: 3.6e6,
      btu: 1055.06
    }
  },
  pressure: {
    base: "pascal",
    units: {
      pascal: 1,
      bar: 100000,
      atm: 101325,
      psi: 6894.76,
      mmHg: 133.322
    }
  },
  temperature: {
    base: "celsius",
    convert: function (value, from, to) {
      if (from === to) return value;

      let celsius;

      // Converte para Celsius primeiro
      if (from === "celsius") celsius = value;
      if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
      if (from === "kelvin") celsius = value - 273.15;

      // Converte de Celsius para a unidade final
      if (to === "celsius") return celsius;
      if (to === "fahrenheit") return (celsius * 9 / 5) + 32;
      if (to === "kelvin") return celsius + 273.15;
    }
  }
};

const convert = (value, fromUnit, toUnit, category) => {
  if (category === "temperature") {
    return conversionData.temperature.convert(value, fromUnit, toUnit);
  }
  if (category === "currencies") {
    return currencyConvert(value, fromUnit, toUnit);
  }

  const factorFrom = conversionData[category].units[fromUnit];
  const factorTo = conversionData[category].units[toUnit];

  return (value * factorFrom) / factorTo;
}

const updateCurrenciesOnSelects = async () => {
  currentUnitInput.innerHTML = "";
  targetUnitInput.innerHTML = "";

  const currencies = await getCurrencies();
  
  for (const [code, name] of Object.entries(currencies)) {
    if (!name) { continue; }
    
    const currentOption = document.createElement("option");
    currentOption.value = code;
    currentOption.textContent = `${code.toUpperCase()} - ${name}`;

    const targetOption = document.createElement("option");
    targetOption.value = code;
    targetOption.textContent = `${code.toUpperCase()} - ${name}`;

    currentUnitInput.appendChild(currentOption);
    targetUnitInput.appendChild(targetOption);
  };

  if (Object.entries(currencies).length > 0) {
    currentUnitInput.value = "usd";
    updateUnitAbbr(currentUnitInput.value.toUpperCase());
  }
  if (Object.entries(currencies).length > 1) {
    targetUnitInput.value = "brl";
  }
}

const updateUnitsOnSelects = (type) => {
  if (type === 'currencies') { return updateCurrenciesOnSelects(); } 
  const options = units[type];

  currentUnitInput.innerHTML = "";
  targetUnitInput.innerHTML = "";

  options.forEach((unit) => {
    const currentOption = document.createElement("option");
    currentOption.value = unit.value;
    currentOption.textContent = `${unit.name} (${unit.abbr})`;

    const targetOption = document.createElement("option");
    targetOption.value = unit.value;
    targetOption.textContent = `${unit.name} (${unit.abbr})`;

    currentUnitInput.appendChild(currentOption);
    targetUnitInput.appendChild(targetOption);
  });

  if (options.length > 0) {
    currentUnitInput.selectedIndex = 0;
    updateUnitAbbr(currentUnitInput.value);
  }
  if (options.length > 1) {
    targetUnitInput.selectedIndex = 1;
  }
}

const updateUnitAbbr = (unit) => {
  const abbr = abbreviations[unit];
  if (!abbr) {
    shortUnitSpan.innerHTML = unit.toUpperCase();
    return;
  }

  shortUnitSpan.innerHTML = abbr;  
}

const limitNumberPrecision = (input) => {
  let value = input.value;
  if (value.includes('.')) {
    const [intPart, decPart] = value.split('.');
    if (decPart.length > 2) { // Limita as casas decimais
      input.value = `${intPart}.${decPart.slice(0,2)}`;
    }
  }
}

swapBtn.addEventListener('click', () => {
  const temp = currentUnitInput.value;

  currentUnitInput.value = targetUnitInput.value;
  targetUnitInput.value = temp;

  updateUnitAbbr(currentUnitInput.value);
});

quantityInput.addEventListener('input', () => {
  limitNumberPrecision(quantityInput);
});

conversionTypeInput.addEventListener('change', (event) => {
  updateUnitsOnSelects(event.target.value);
});

currentUnitInput.addEventListener('change', (event) => {
  updateUnitAbbr(event.target.value);
})

convertBtn.addEventListener('click', () => {
  if (!quantityInput.value) { return ; }
  const result = convert(
    Number.parseFloat(quantityInput.value),
    currentUnitInput.value,
    targetUnitInput.value, 
    conversionTypeInput.value
  );

  if (result instanceof Promise) {
    result.then((r) => {
      resultDisplay.innerHTML = r.result;
      lastUpdatedHeading.innerHTML = `Last updated at: ${new Date(r.lastUpdated).toLocaleDateString()}`;
    })
  } else {
    resultDisplay.innerHTML = result;
  }
});

updateUnitsOnSelects(conversionTypeInput.value);