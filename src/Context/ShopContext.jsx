// src/Context/ShopContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../api';

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // ===== تحميل المنتجات =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setAllProduct(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===== تحميل السلة =====
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        const count = Object.values(parsed).reduce((sum, qty) => sum + qty, 0);
        setCartCount(count);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // ===== إضافة إلى السلة =====
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      const count = Object.values(newCart).reduce((sum, qty) => sum + qty, 0);
      setCartCount(count);
      return newCart;
    });
  };

  // ===== حذف من السلة =====
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] -= 1;
        if (newCart[itemId] === 0) delete newCart[itemId];
      }
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      const count = Object.values(newCart).reduce((sum, qty) => sum + qty, 0);
      setCartCount(count);
      return newCart;
    });
  };

  // ===== تفريغ السلة =====
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem('cartItems');
    setCartCount(0);
  };

  // ===== حساب المجموع الكلي =====
  const getTotalCartAmount = () => {
    let total = 0;
    all_product.forEach((item) => {
      if (cartItems[item.id] > 0) {
        total += item.price * cartItems[item.id];
      }
    });
    return total;
  };

  // ===== حساب عدد العناصر =====
  const getTotalCartItems = () => {
    let total = 0;
    Object.values(cartItems).forEach((qty) => {
      total += qty;
    });
    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;