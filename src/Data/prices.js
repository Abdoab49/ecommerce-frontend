// src/Data/prices.js

// ✅ أسعار ShoeStore
export const shoeStorePrices = {
  'NIKE': { new_price: 100, old_price: 150 },
  'T-shirt football': { new_price: 80, old_price: 130 },
  'T-shirt basketball': { new_price: 200, old_price: 300 },
  'Supreme': { new_price: 90, old_price: 140 },
};

// ✅ أسعار MEN (كأس العالم)
export const menPrices = {
  'MOROCCO': { new_price: 45, old_price: 70 },
  'ARGENTINA': { new_price: 45, old_price: 70 },
  'BRAZIL': { new_price: 45, old_price: 70 },
  'SPAIN': { new_price: 45, old_price: 70 },
  'FRANCE': { new_price: 45, old_price: 70 },
  'GERMANY': { new_price: 45, old_price: 70 },
  'ENGLAND': { new_price: 45, old_price: 70 },
  'ITALY': { new_price: 45, old_price: 70 },
};

export const getProductPrice = (productName) => {
  if (shoeStorePrices[productName]) {
    return shoeStorePrices[productName];
  }
  if (menPrices[productName]) {
    return menPrices[productName];
  }
  return { new_price: 30, old_price: 50 };
};