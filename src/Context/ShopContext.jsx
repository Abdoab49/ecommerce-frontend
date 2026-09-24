// src/Context/ShopContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const LOCAL_PRODUCTS = [
  // ===== Men =====
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

  // ===== Women =====
  { id: 9, name: 'Women Air Max', category: 'women', image: '/Assets/tshirt/tshirt8.png', price: 120, old_price: 160 },
  { id: 10, name: 'Women Court', category: 'women', image: '/Assets/tshirt/tshirt8.png', price: 90, old_price: 130 },
  { id: 13, name: 'Women Sport', category: 'women', image: '/Assets/tshirt/tshirt1.png', price: 150, old_price: 200 },
  { id: 14, name: 'Women Casual', category: 'women', image: '/Assets/tshirt/tshirt2.png', price: 130, old_price: 180 },
  { id: 15, name: 'Women Elegant', category: 'women', image: '/Assets/tshirt/tshirt3.png', price: 170, old_price: 220 },
  { id: 16, name: 'Women Classic', category: 'women', image: '/Assets/tshirt/tshirt4.png', price: 110, old_price: 160 },
  { id: 17, name: 'Women Modern', category: 'women', image: '/Assets/tshirt/tshirt5.png', price: 140, old_price: 190 },
  { id: 18, name: 'Women Trendy', category: 'women', image: '/Assets/tshirt/tshirt6.png', price: 160, old_price: 210 },
  { id: 19, name: 'Women Chic', category: 'women', image: '/Assets/tshirt/tshirt7.png', price: 180, old_price: 230 },
  { id: 20, name: 'Women Style', category: 'women', image: '/Assets/tshirt/tshirt1.png', price: 100, old_price: 150 },

  // ===== Kids =====
  { id: 11, name: 'Kids Air Max', category: 'kid', image: '/Assets/tshirt/tshirt8.png', price: 60, old_price: 90 },
  { id: 12, name: 'Kids Court', category: 'kid', image: '/Assets/tshirt/tshirt8.png', price: 50, old_price: 75 },
  { id: 21, name: 'Kids Sport', category: 'kid', image: '/Assets/tshirt/tshirt5.png', price: 70, old_price: 100 },
  { id: 22, name: 'Kids Casual', category: 'kid', image: '/Assets/tshirt/tshirt6.png', price: 65, old_price: 95 },
  { id: 23, name: 'Kids Fun', category: 'kid', image: '/Assets/tshirt/tshirt7.png', price: 55, old_price: 85 },
  { id: 24, name: 'Kids Play', category: 'kid', image: '/Assets/tshirt/tshirt1.png', price: 60, old_price: 90 },
  { id: 25, name: 'Kids Active', category: 'kid', image: '/Assets/tshirt/tshirt2.png', price: 75, old_price: 105 },
  { id: 26, name: 'Kids Cool', category: 'kid', image: '/Assets/tshirt/tshirt3.png', price: 65, old_price: 95 },
  { id: 27, name: 'Kids Happy', category: 'kid', image: '/Assets/tshirt/tshirt4.png', price: 55, old_price: 85 },
  { id: 28, name: 'Kids Star', category: 'kid', image: '/Assets/tshirt/tshirt5.png', price: 70, old_price: 100 },
];

const ShopContextProvider = ({ children }) => {
  const [all_product] = useState(LOCAL_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [loading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ===== تحميل =====
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  // ✅ أي تغيير فـ cartItems → حدّث cartCount + localStorage
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(count);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ===== إضافة =====
  const addToCart = (itemId, size = 'M') => {
    const product = all_product.find(p => p.id === itemId);
    if (!product) return;

    setCartItems((prev) => {
      const index = prev.findIndex(item => item.id === itemId && item.size === size);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        new_price: product.price,
        old_price: product.old_price,
        size: size,
        quantity: 1,
        image: product.image,
        images: [product.image],
        category: product.category,
      }];
    });
  };

  // ===== حذف (بالـ index) =====
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== تحديث الكمية =====
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  // ===== تفريغ =====
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItems');
    setCartCount(0);
  };

  // ===== المجموع =====
  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
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