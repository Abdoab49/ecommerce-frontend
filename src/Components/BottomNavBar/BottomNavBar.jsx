// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';   // ✅ Rje3na Shop l Lucide
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);

  // ✅ Icons8 URLs (Casquette daba khddama) + Shop b Lucide
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
      icon: (
        // ✅ Casquette: Icons8 URL khddama
        <img
          src="https://img.icons8.com/ios-filled/50/4b5563/cap.png"
          alt="Casquette"
          className="bottom-navbar-icon-img"
          onError={(e) => {
            // Ila Icons8 ma khdemch, rje3 l Lucide
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
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
      icon: (
        <img
          src="https://img.icons8.com/ios-filled/50/4b5563/shopping-cart.png"
          alt="Cart"
          className="bottom-navbar-icon-img"
        />
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