// ============================================
//  API Service - ربط Frontend مع Backend
// ============================================

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ============================================
//  📦 PRODUCTS API
// ============================================

// ✅ جلب جميع المنتجات
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// ✅ جلب منتج محدد
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// ✅ إضافة منتج جديد (Admin فقط)
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// ✅ تحديث منتج (Admin فقط)
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

// ✅ حذف منتج (Admin فقط)
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    return null;
  }
};

// ============================================
//  👤 USERS API
// ============================================

// ✅ تسجيل مستخدم جديد
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

// ✅ تسجيل الدخول
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

// ✅ تسجيل الخروج
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ✅ جلب معلومات المستخدم
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to get profile');
    return await response.json();
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

// ============================================
//  🛒 CART API
// ============================================



// ✅ جلب السلة
export const getCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};

// ✅ تحديث كمية منتج في السلة
export const updateCartItem = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return await response.json();
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
};

// ✅ حذف منتج من السلة
export const removeFromCartAPI = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
};

// ✅ تفريغ السلة
export const clearCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return await response.json();
  } catch (error) {
    console.error('Error clearing cart:', error);
    return null;
  }
};

// ============================================
//  📦 ORDERS API
// ============================================

// ✅ إنشاء طلب جديد
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

// ✅ جلب جميع الطلبات (Admin)
export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// ✅ جلب طلبات المستخدم
export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    const response = await fetch(`${API_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

// ✅ جلب طلب محدد
export const getOrderById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Order not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

// ✅ تحديث حالة الطلب (Admin)
export const updateOrderStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
};

// ============================================
//  📤 UPLOAD API
// ============================================

// ✅ رفع صورة
export const uploadImage = async (file) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// ============================================
//  🔍 SEARCH API
// ============================================

// ✅ البحث عن منتجات
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// ============================================
//  🏷️ CATEGORIES API
// ============================================

// ✅ جلب المنتجات حسب الفئة
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};