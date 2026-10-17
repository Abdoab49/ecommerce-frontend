// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);

  // ✅ Icons8 SVGs + Options dyalek
  const items = [
    {
      id: 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M5 22 L15 18 L25 22 L45 22 L45 30 L5 30 Z" />
        </svg>
      ),
      label: 'Shop',
      path: '/',
    },
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M10 15 L20 15 L22 25 L18 25 L16 20 L14 20 L12 25 L8 25 Z" />
          <path d="M30 15 L40 15 L42 25 L38 25 L36 20 L34 20 L32 25 L28 25 Z" />
        </svg>
      ),
      label: 'Men',
      path: '/mens',
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M15 10 L35 10 L38 30 L35 35 L15 35 L12 30 Z" />
        </svg>
      ),
      label: 'Jackets',
      path: '/womens',
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M10 20 Q25 10 40 20 Q42 25 38 28 Q25 32 12 28 Q8 25 10 20 Z" />
        </svg>
      ),
      label: 'Casquette',
      path: '/casquette',
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M5 25 L15 22 L18 30 L40 30 L42 25 L45 25 L45 32 L5 32 Z" />
        </svg>
      ),
      label: 'Shoes',
      path: '/shoes',
    },
    {
      id: 5,
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor">
          <path d="M10 15 L40 15 L40 35 L10 35 Z" />
          <circle cx="15" cy="38" r="3" />
          <circle cx="35" cy="38" r="3" />
        </svg>
      ),
      label: 'Cart',
      path: '/cart',
    },
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
      <div className="bottom-navbar-container">
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.id}
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