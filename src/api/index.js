// src/api/index.js

// ✅ ✅ ✅ بيانات المنتجات المحلية (بدون Backend)
const localProducts = [
  // ===== منتجات ShoeStore =====
  { id: 1, name: 'NIKE', category: 'men', image: '/Assets/ShoeStore/tshirt1.png', price: 100, old_price: 150 },
  { id: 2, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt2.png', price: 80, old_price: 130 },
  { id: 3, name: 'T-shirt basketball', category: 'men', image: '/Assets/ShoeStore/tshirt3.png', price: 200, old_price: 300 },
  { id: 4, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt4.png', price: 80, old_price: 130 },
  { id: 5, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt5.png', price: 80, old_price: 130 },
  { id: 6, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt6.png', price: 80, old_price: 130 },
  { id: 7, name: 'T-shirt basketball', category: 'men', image: '/Assets/ShoeStore/tshirt7.png', price: 200, old_price: 300 },
  { id: 8, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt8.png', price: 80, old_price: 130 },

  // ===== منتجات MEN (كأس العالم) =====
  { id: 45, name: 'MOROCCO', category: 'men', image: '/Assets/tshirt/tshirt1.png', price: 45, old_price: 70 },
  { id: 46, name: 'ARGENTINA', category: 'men', image: '/Assets/tshirt/tshirt2.png', price: 45, old_price: 70 },
  { id: 47, name: 'BRAZIL', category: 'men', image: '/Assets/tshirt/tshirt3.png', price: 45, old_price: 70 },
  { id: 48, name: 'SPAIN', category: 'men', image: '/Assets/tshirt/tshirt4.png', price: 45, old_price: 70 },
  { id: 49, name: 'FRANCE', category: 'men', image: '/Assets/tshirt/tshirt5.png', price: 45, old_price: 70 },
  { id: 50, name: 'GERMANY', category: 'men', image: '/Assets/tshirt/tshirt6.png', price: 45, old_price: 70 },
  { id: 51, name: 'ENGLAND', category: 'men', image: '/Assets/tshirt/tshirt7.png', price: 45, old_price: 70 },
  { id: 52, name: 'ITALY', category: 'men', image: '/Assets/tshirt/tshirt8.png', price: 45, old_price: 70 },

  // ===== منتجات WOMEN =====
  { id: 9, name: 'Women Air Max', category: 'women', image: '/Assets/women/product1.png', price: 120, old_price: 160 },
  { id: 10, name: 'Women Court', category: 'women', image: '/Assets/women/product2.png', price: 90, old_price: 130 },

  // ===== منتجات KIDS =====
  { id: 11, name: 'Kids Air Max', category: 'kid', image: '/Assets/kids/product1.png', price: 60, old_price: 90 },
  { id: 12, name: 'Kids Court', category: 'kid', image: '/Assets/kids/product2.png', price: 50, old_price: 75 },
];

// ============================================
//  📦 EXPORT FUNCTIONS
// ============================================

// ✅ جلب جميع المنتجات (محلي)
export const getProducts = async () => {
  return localProducts;
};

// ✅ جلب منتج محدد
export const getProductById = async (id) => {
  return localProducts.find(p => p.id === id) || null;
};

// ✅ إنشاء طلب جديد (يحفظ في localStorage)
export const createOrder = async (orderData) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const newOrder = {
    id: Date.now().toString(),
    ...orderData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  return newOrder;
};

// ✅ جلب جميع الطلبات
export const getAllOrders = async () => {
  return JSON.parse(localStorage.getItem('orders') || '[]');
};

// ✅ البحث عن منتجات
export const searchProducts = async (query) => {
  return localProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};

// ✅ جلب المنتجات حسب الفئة
export const getProductsByCategory = async (category) => {
  return localProducts.filter(p => p.category === category);
};