// src/Components/BottomNavBar/BottomNavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  // ✅ Options dyalek
  const items = [
    { id: 0, icon: <Home size={22} />,         label: 'Shop',      path: '/' },
    { id: 1, icon: <Shirt size={22} />,        label: 'Men',       path: '/mens' },
    { id: 2, icon: <ShoppingBag size={22} />,  label: 'Jackets',   path: '/womens' },
    { id: 3, icon: <Award size={22} />,        label: 'Casquette', path: '/casquette' },
    { id: 4, icon: <Footprints size={22} />,   label: 'Shoes',     path: '/shoes' },
    { id: 5, icon: <ShoppingCart size={22} />, label: 'Cart',      path: '/cart' },
  ];

  // ✅ Update active 3la 7sab URL
  useEffect(() => {
    const idx = items.findIndex((item) => item.path === location.pathname);
    if (idx >= 0) setActive(idx);
  }, [location.pathname]);

  // ✅ Update indicator position when active changes or resize
  useEffect(() => {
    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  const handleClick = (index) => {
    setActive(index);
    navigate(items[index].path);
  };

  return (
    <div className="bottom-navbar-wrapper">
      <div ref={containerRef} className="bottom-navbar-container">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (btnRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            className="bottom-navbar-btn"
            aria-label={item.label}
            type="button"
          >
            <div className="bottom-navbar-icon">{item.icon}</div>
            <span className="bottom-navbar-label">{item.label}</span>
          </button>
        ))}

        {/* ✅ Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="bottom-navbar-indicator"
        />
      </div>
    </div>
  );
};

export default BottomNavBar;