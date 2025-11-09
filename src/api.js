// const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const baseUrl = "https://latest.currency-api.pages.dev/v1";


async function getCurrencies() {
  try {
    const response = await fetch(`${baseUrl}/currencies.min.json`)
    if (!response.ok) throw new Error(`HTTP ${res.status}`);

    return await response.json();
  } catch (err) {
    console.error("Fetch failed: ", err);
  }
}

async function getExchangeRates(baseCurrency) {
  try {
    const response = await fetch(`${baseUrl}/currencies/${baseCurrency}.min.json`)
    if (!response.ok) throw new Error(`HTTP ${res.status}`);

    return await response.json();
  } catch (err) {
    console.error("Fetch failed: ", err);
  }
}

async function currencyConvert(value, fromUnit, toUnit) {
  const rates = await getExchangeRates(fromUnit);
  return {
    lastUpdated: rates.date || "Offline",
    result: value * rates[fromUnit][toUnit] || "-"
  };
}