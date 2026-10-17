// src/Components/FloatingNav/FloatingNav.jsx
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
import './FloatingNav.css';

const FloatingNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  // ✅ Nav Items — Options dyalek
  const items = [
    { id: 0, icon: <Home size={22} />,         label: 'Shop',      path: '/' },
    { id: 1, icon: <Shirt size={22} />,        label: 'Men',       path: '/mens' },
    { id: 2, icon: <ShoppingBag size={22} />,  label: 'Jackets',   path: '/womens' },
    { id: 3, icon: <Award size={22} />,        label: 'Casquette', path: '/casquette' },
    { id: 4, icon: <Footprints size={22} />,   label: 'Shoes',     path: '/shoes' },
    { id: 5, icon: <ShoppingCart size={22} />, label: 'Cart',      path: '/cart' },
  ];

  // ✅ Active Index — 3la 7sab URL
  const currentIdx = items.findIndex((item) => item.path === location.pathname);
  const [active, setActive] = useState(
    currentIdx >= 0 ? currentIdx : 0
  );

  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // ✅ Update active melli URL kaytbdel
  useEffect(() => {
    const idx = items.findIndex((item) => item.path === location.pathname);
    if (idx >= 0) {
      setActive(idx);
    }
  }, [location.pathname]);

  // ✅ Update indicator position
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
    <div className="floating-nav-wrapper">
      <div
        ref={containerRef}
        className="floating-nav-container"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (btnRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            className="floating-nav-btn"
            aria-label={item.label}
            type="button"
          >
            <div className="floating-nav-icon">{item.icon}</div>
            <span className="floating-nav-label">{item.label}</span>
          </button>
        ))}

        {/* ✅ Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="floating-nav-indicator"
        />
      </div>
    </div>
  );
};

export default FloatingNav;