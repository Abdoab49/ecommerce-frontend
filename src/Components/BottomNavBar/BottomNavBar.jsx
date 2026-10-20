// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Icons b SVG nqi (koulhom 24px)
  const items = [
    {
      id: 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Shop',
      path: '/',
    },
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      ),
      label: 'Men',
      path: '/mens',
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
      label: 'Jackets',
      path: '/womens',
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
      label: 'Casquette',
      path: '/casquette',
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16" />
          <path d="M4 20h16" />
          <circle cx="9" cy="8" r="2" />
        </svg>
      ),
      label: 'Shoes',
      path: '/shoes',
    },
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
    <menu className="menu" id="app">
      <ul>
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <li
              key={item.id}
              className={`list ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.label}</span>
              </a>
            </li>
          );
        })}
        <div
          className="indicator"
          style={{
            transform: `translateX(calc(70px * ${active}))`,
          }}
        ></div>
      </ul>
    </menu>
  );
};

export default BottomNavBar;