
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  ShoppingBag,
  UserRound,
  ArrowRight
} from 'lucide-react';

import './BottomNavBar.css';

const BottomNavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState('');

  // Hide on pages where mobile navigation is not needed
  const hiddenRoutes = [
    '/orders',
    '/admin',
    '/size-selection'
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  // Account destination
  const accountPath = localStorage.getItem('lanada_user_id')
    ? '/orders'
    : '/login';

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    if (onSearch) {
      onSearch(value);
    } else {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="lanada-mobile-dock">

      {/* SEARCH BAR */}
      <form
        className="lanada-mobile-search"
        onSubmit={handleSearch}
      >
        <button
          type="submit"
          className="lanada-search-icon"
          aria-label="Search products"
        >
          <Search size={25} strokeWidth={2} />
        </button>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product, category..."
          aria-label="Search products and categories"
        />
      </form>

      {/* BOTTOM NAVIGATION */}
      <nav
        className="lanada-bottom-navigation"
        aria-label="Mobile navigation"
      >

        {/* SHOP */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `lanada-nav-item ${isActive ? 'lanada-nav-active' : ''}`
          }
        >
          <span className="lanada-nav-icon">
            <Home size={27} fill="currentColor" strokeWidth={1.8} />
          </span>

          <span className="lanada-nav-label">
            Shop
          </span>
        </NavLink>

        {/* CART - MAIN BUTTON */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `lanada-cart-button ${isActive ? 'lanada-cart-active' : ''}`
          }
        >
          <ShoppingBag size={23} strokeWidth={1.9} />

          <span>Cart</span>

          <ArrowRight
            size={17}
            className="lanada-cart-arrow"
          />
        </NavLink>

        {/* ACCOUNT */}
        <NavLink
          to={accountPath}
          className={({ isActive }) =>
            `lanada-nav-item ${isActive ? 'lanada-nav-active' : ''}`
          }
        >
          <span className="lanada-nav-icon">
            <UserRound size={27} fill="currentColor" strokeWidth={1.6} />
          </span>

          <span className="lanada-nav-label">
            Me
          </span>
        </NavLink>

      </nav>

    </div>
  );
};

export default BottomNavBar;
