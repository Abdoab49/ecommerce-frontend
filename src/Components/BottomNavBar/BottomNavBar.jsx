// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart } from 'lucide-react';   // ✅ Cart w Shop b Lucide
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);

  const items = [
    {
      id: 0,
      icon: <Home size={24} strokeWidth={2} />,   // ✅ Shop kifma kan
      label: 'Shop',
      path: '/',
    },
    {
      id: 1,
      icon: (
        <img
          src="https://img.icons8.com/ios-filled/50/4b5563/t-shirt.png"
          alt="Men"
          className="bottom-navbar-icon-img"
        />
      ),
      label: 'Men',
      path: '/mens',
    },
    {
      id: 2,
      icon: (
        <img
          src="https://img.icons8.com/ios-filled/50/4b5563/jacket.png"
          alt="Jackets"
          className="bottom-navbar-icon-img"
        />
      ),
      label: 'Jackets',
      path: '/womens',
    },
    {
      id: 3,
      // ✅ Casquette: SVG 3adi (Khddam 100% bla internet, bla CORB)
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bottom-navbar-svg-icon"
          style={{ width: '24px', height: '24px' }}
        >
          <path d="M3 14h18" />
          <path d="M5 14a7 7 0 0 1 14 0" />
          <path d="M3 14c-1.5 0-2 1.5-2 2.5s.5 2.5 2 2.5" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
        </svg>
      ),
      label: 'Casquette',
      path: '/casquette',
    },
    {
      id: 4,
      icon: (
        <img
          src="https://img.icons8.com/ios-filled/50/4b5563/sneakers.png"
          alt="Shoes"
          className="bottom-navbar-icon-img"
        />
      ),
      label: 'Shoes',
      path: '/shoes',
    },
    {
      id: 5,
      icon: <ShoppingCart size={24} strokeWidth={2} />,   // ✅ Cart rje3et l Lucide
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