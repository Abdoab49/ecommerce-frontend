// src/api/index.js

// ============================================
//  📦 PRODUCTS API (بيانات محلية)
// ============================================

// ✅ بيانات المنتجات المحلية
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
//  📦 PRODUCTS API
// ============================================

// ✅ جلب جميع المنتجات (محلي)
export const getProducts = async () => {
  return localProducts;
};

// ✅ جلب منتج محدد (محلي)
export const getProductById = async (id) => {
  return localProducts.find(p => p.id === id) || null;
};

// ✅ إضافة منتج جديد (محلي)
export const addProduct = async (productData) => {
  const newProduct = { id: Date.now(), ...productData };
  localProducts.push(newProduct);
  return newProduct;
};

// ✅ تحديث منتج (محلي)
export const updateProduct = async (id, productData) => {
  const index = localProducts.findIndex(p => p.id === id);
  if (index === -1) return null;
  localProducts[index] = { ...localProducts[index], ...productData };
  return localProducts[index];
};

// ✅ حذف منتج (محلي)
export const deleteProduct = async (id) => {
  const index = localProducts.findIndex(p => p.id === id);
  if (index === -1) return null;
  localProducts.splice(index, 1);
  return { success: true };
};

// ============================================
//  👤 USERS API (محلي)
// ============================================

// ✅ تسجيل مستخدم جديد (محلي)
export const registerUser = async (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) throw new Error('User already exists');
  
  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  const token = 'local-token-' + Date.now();
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(newUser));
  return { token, ...newUser };
};

// ✅ تسجيل الدخول (محلي)
export const loginUser = async (credentials) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
  if (!user) throw new Error('Invalid credentials');
  
  const token = 'local-token-' + Date.now();
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { token, ...user };
};

// ✅ تسجيل الخروج (محلي)
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ✅ جلب معلومات المستخدم (محلي)
export const getUserProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user;
};

// ============================================
//  🛒 CART API (محلي)
// ============================================

// ✅ جلب السلة (محلي)
export const getCart = async () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

// ✅ إضافة إلى السلة (محلي)
export const addToCart = async (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// ✅ تحديث كمية منتج في السلة (محلي)
export const updateCartItem = async (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// ✅ حذف منتج من السلة (محلي)
export const removeFromCartAPI = async (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const index = cart.findIndex(i => i.productId === productId);
  if (index !== -1) cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// ✅ تفريغ السلة (محلي)
export const clearCart = async () => {
  localStorage.removeItem('cart');
  return [];
};

// ============================================
//  📦 ORDERS API (محلي)
// ============================================

// ✅ إنشاء طلب جديد (محلي)
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

// ✅ جلب جميع الطلبات (محلي)
export const getAllOrders = async () => {
  return JSON.parse(localStorage.getItem('orders') || '[]');
};

// ✅ جلب طلبات المستخدم (محلي)
export const getUserOrders = async () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return [];
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter(o => o.userId === user.id);
};

// ✅ جلب طلب محدد (محلي)
export const getOrderById = async (id) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.find(o => o.id === id) || null;
};

// ✅ تحديث حالة الطلب (محلي)
export const updateOrderStatus = async (id, status) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find(o => o.id === id);
  if (order) order.status = status;
  localStorage.setItem('orders', JSON.stringify(orders));
  return order;
};

// ============================================
//  📤 UPLOAD API (محلي)
// ============================================

// ✅ رفع صورة (محلي - يحاكي الرفع)
export const uploadImage = async (file) => {
  // ✅ محاكاة رفع الصورة
  return { 
    success: true, 
    image_url: URL.createObjectURL(file) 
  };
};

// ============================================
//  🔍 SEARCH API (محلي)
// ============================================

// ✅ البحث عن منتجات (محلي)
export const searchProducts = async (query) => {
  return localProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};

// ============================================
//  🏷️ CATEGORIES API (محلي)
// ============================================

// ✅ جلب المنتجات حسب الفئة (محلي)
export const getProductsByCategory = async (category) => {
  return localProducts.filter(p => p.category === category);
};