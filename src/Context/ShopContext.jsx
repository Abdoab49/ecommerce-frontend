// src/Context/ShopContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

// ✅ المنتجات المحلية مباشرة (بدون أي استيراد خارجي)
const LOCAL_PRODUCTS = [
  { id: 1, name: 'NIKE', category: 'men', image: '/Assets/ShoeStore/tshirt1.png', price: 100, old_price: 150 },
  { id: 2, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt2.png', price: 80, old_price: 130 },
  { id: 3, name: 'T-shirt basketball', category: 'men', image: '/Assets/ShoeStore/tshirt3.png', price: 200, old_price: 300 },
  { id: 4, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt4.png', price: 80, old_price: 130 },
  { id: 5, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt5.png', price: 80, old_price: 130 },
  { id: 6, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt6.png', price: 80, old_price: 130 },
  { id: 7, name: 'T-shirt basketball', category: 'men', image: '/Assets/ShoeStore/tshirt7.png', price: 200, old_price: 300 },
  { id: 8, name: 'T-shirt football', category: 'men', image: '/Assets/ShoeStore/tshirt8.png', price: 80, old_price: 130 },
  { id: 45, name: 'MOROCCO', category: 'men', image: '/Assets/tshirt/tshirt1.png', price: 45, old_price: 70 },
  { id: 46, name: 'ARGENTINA', category: 'men', image: '/Assets/tshirt/tshirt2.png', price: 45, old_price: 70 },
  { id: 47, name: 'BRAZIL', category: 'men', image: '/Assets/tshirt/tshirt3.png', price: 45, old_price: 70 },
  { id: 48, name: 'SPAIN', category: 'men', image: '/Assets/tshirt/tshirt4.png', price: 45, old_price: 70 },
  { id: 49, name: 'FRANCE', category: 'men', image: '/Assets/tshirt/tshirt5.png', price: 45, old_price: 70 },
  { id: 50, name: 'GERMANY', category: 'men', image: '/Assets/tshirt/tshirt6.png', price: 45, old_price: 70 },
  { id: 51, name: 'ENGLAND', category: 'men', image: '/Assets/tshirt/tshirt7.png', price: 45, old_price: 70 },
  { id: 52, name: 'ITALY', category: 'men', image: '/Assets/tshirt/tshirt8.png', price: 45, old_price: 70 },
  { id: 9, name: 'Women Air Max', category: 'women', image: '/Assets/women/product1.png', price: 120, old_price: 160 },
  { id: 10, name: 'Women Court', category: 'women', image: '/Assets/women/product2.png', price: 90, old_price: 130 },
  { id: 11, name: 'Kids Air Max', category: 'kid', image: '/Assets/kids/product1.png', price: 60, old_price: 90 },
  { id: 12, name: 'Kids Court', category: 'kid', image: '/Assets/kids/product2.png', price: 50, old_price: 75 },
];

const ShopContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState(LOCAL_PRODUCTS);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ===== تحميل السلة من localStorage =====
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

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
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