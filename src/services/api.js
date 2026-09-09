const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRate = async (fromCurrency) => {
  const response = await fetch(`${BASE_URL}/${fromCurrency}`);
  const data = await response.json();
  return data;
};