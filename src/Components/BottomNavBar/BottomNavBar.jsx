// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shirt, ShoppingBag, Award, Footprints } from 'lucide-react';
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Options dyalek
  const items = [
    { id: 0, icon: <Home size={28} />, label: 'Shop', path: '/' },
    { id: 1, icon: <Shirt size={28} />, label: 'Men', path: '/mens' },
    { id: 2, icon: <ShoppingBag size={28} />, label: 'Jackets', path: '/womens' },
    { id: 3, icon: <Award size={28} />, label: 'Casquette', path: '/casquette' },
    { id: 4, icon: <Footprints size={28} />, label: 'Shoes', path: '/shoes' },
  ];

  // ✅ Find active index based on current path
  const currentIdx = items.findIndex((item) => item.path === location.pathname);
  const [active, setActive] = useState(currentIdx >= 0 ? currentIdx : 0);

  // ✅ Update active when URL changes
  useEffect(() => {
    const idx = items.findIndex((item) => item.path === location.pathname);
    if (idx >= 0) setActive(idx);
  }, [location.pathname]);

  // ✅ Hide BottomNavBar in /orders and /admin
  if (location.pathname === '/orders' || location.pathname === '/admin') {
    return null;
  }

  const handleClick = (index) => {
    setActive(index);
    navigate(items[index].path);
  };

  return (
    <menu className="menu">
      {items.map((item, index) => {
        const isActive = active === index;
        return (
          <button
            key={item.id}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            data-text={item.label}
            onClick={() => handleClick(index)}
            aria-label={item.label}
            type="button"
          >
            {item.icon}
          </button>
        );
      })}
    </menu>
  );
};

export default BottomNavBar;