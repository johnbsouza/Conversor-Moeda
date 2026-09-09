export function convertCurrency(amount, rate) {
  const converted = parseFloat(amount) * rate;
  return converted.toFixed(2);
}