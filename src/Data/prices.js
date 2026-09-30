// src/Data/prices.js

export const PRICES = {

  // ==========================================
  // 👔 ShoeStore.jsx — 8 منتجات
  // ==========================================
  'T-Shirt Urban Black':        { new_price: 100, old_price: 200 },
  'T-Shirt Football Pro':       { new_price: 80,  old_price: 130 },
  'T-Shirt Basketball Elite':   { new_price: 200, old_price: 300 },
  'T-Shirt Football Classic':   { new_price: 85,  old_price: 135 },
  'T-Shirt Football Vintage':   { new_price: 90,  old_price: 140 },
  'T-Shirt Football Premium':   { new_price: 95,  old_price: 145 },
  'T-Shirt Basketball Legend':  { new_price: 210, old_price: 310 },
  'T-Shirt Football Limited':   { new_price: 100, old_price: 150 },

  // ==========================================
  // 👟 ShoesCard.jsx — 8 منتجات
  // ==========================================
  'T-Shirt Urban White':        { new_price: 110, old_price: 160 },
  'T-Shirt Football Home':      { new_price: 85,  old_price: 135 },
  'T-Shirt Basketball Court':   { new_price: 205, old_price: 305 },
  'T-Shirt Football Away':      { new_price: 90,  old_price: 140 },
  'T-Shirt Football Third':     { new_price: 95,  old_price: 145 },
  'T-Shirt Football Retro':     { new_price: 100, old_price: 150 },
  'T-Shirt Basketball Street':  { new_price: 215, old_price: 315 },
  'T-Shirt Football Gold':      { new_price: 105, old_price: 155 },

  // ==========================================
  // 🌍 ProductGrid.jsx — 8 منتجات
  // ==========================================
  'MOROCCO':   { new_price: 45, old_price: 70 },
  'ARGENTINA': { new_price: 45, old_price: 70 },
  'BRAZIL':    { new_price: 45, old_price: 70 },
  'SPAIN':     { new_price: 45, old_price: 70 },
  'FRANCE':    { new_price: 45, old_price: 70 },
  'GERMANY':   { new_price: 45, old_price: 70 },
  'ENGLAND':   { new_price: 45, old_price: 70 },
  'ITALY':     { new_price: 45, old_price: 70 },

  // ==========================================
  // 🆕 NewShoeStore.jsx — 20 منتج
  // ==========================================
  'NIKE':           { new_price: 220, old_price: 330 },
  'ADIDAS':         { new_price: 220, old_price: 330 },
  'PUMA':           { new_price: 200, old_price: 300 },
  'NEW BALANCE':    { new_price: 240, old_price: 360 },
  'REEBOK':         { new_price: 180, old_price: 270 },
  'VANS':           { new_price: 190, old_price: 285 },
  'CONVERSE':       { new_price: 170, old_price: 255 },
  'ASICS':          { new_price: 230, old_price: 345 },
  'UNDER ARMOUR':   { new_price: 260, old_price: 390 },
  'LACOSTE':        { new_price: 280, old_price: 420 },
  'LE COQ SPORTIF': { new_price: 210, old_price: 315 },
  'KAPPA':          { new_price: 190, old_price: 285 },
  'MIZUNO':         { new_price: 220, old_price: 330 },
  'DIADORA':        { new_price: 200, old_price: 300 },
  'HUMAN MADE':     { new_price: 320, old_price: 480 },
  'KITH':           { new_price: 300, old_price: 450 },
  'FENDI':          { new_price: 500, old_price: 750 },
  'GUCCI':          { new_price: 520, old_price: 780 },
  'VERSACE':        { new_price: 480, old_price: 720 },
  'BURBERRY':       { new_price: 450, old_price: 675 },

  // ==========================================
  // 🧢 SimpleCard.jsx — 10 منتجات
  // ==========================================
  'Casquette structurée Futura': { new_price: 300, old_price: 450 },
  'Casquette Classic 99':        { new_price: 150, old_price: 225 },
  'Casquette Urban Style':       { new_price: 200, old_price: 300 },
  'Casquette Retro Sport':       { new_price: 150, old_price: 225 },
  'Casquette Sport Pro':         { new_price: 250, old_price: 375 },
  'Casquette Vintage Wash':      { new_price: 180, old_price: 270 },
  'Casquette Streetwear':        { new_price: 220, old_price: 330 },
  'Casquette Snapback':          { new_price: 160, old_price: 240 },
  'Casquette Trucker':           { new_price: 140, old_price: 210 },
  'Casquette Luxe':              { new_price: 280, old_price: 420 },
};

// ✅ دالة وحيدة
export const getProductPrice = (productName) => {
  return PRICES[productName] || { new_price: 30, old_price: 50 };
};