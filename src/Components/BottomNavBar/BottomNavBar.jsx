// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Shirt,
  ShoppingBag,
  Award,
  Footprints,
  ShoppingCart,
} from 'lucide-react';
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  const items = [
    { id: 0, icon: <Home size={22} />,         label: 'Shop',      path: '/' },
    { id: 1, icon: <Shirt size={22} />,        label: 'Men',       path: '/mens' },
    { id: 2, icon: <ShoppingBag size={22} />,  label: 'Jackets',   path: '/womens' },
    { id: 3, icon: <Award size={22} />,        label: 'Casquette', path: '/casquette' },
    { id: 4, icon: <Footprints size={22} />,   label: 'Shoes',     path: '/shoes' },
    { id: 5, icon: <ShoppingCart size={22} />, label: 'Cart',      path: '/cart' },
  ];

  useEffect(() => {
    const idx = items.findIndex((item) => item.path === location.pathname);
    if (idx >= 0) setActive(idx);
  }, [location.pathname]);

  const handleClick = (index) => {
    setActive(index);
    navigate(items[index].path);
  };

  return (
    <div className="bottom-navbar-wrapper">
      <div ref={containerRef} className="bottom-navbar-container">
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.id}
              ref={(el) => (btnRefs.current[index] = el)}
              onClick={() => handleClick(index)}
              className={`bottom-navbar-btn ${isActive ? 'bottom-navbar-btn--active' : ''}`}
              aria-label={item.label}
              type="button"
            >
              <div className="bottom-navbar-icon">{item.icon}</div>
              <span className="bottom-navbar-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;