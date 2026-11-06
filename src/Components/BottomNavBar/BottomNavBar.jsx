
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { House, UserRound } from 'lucide-react';
import './BottomNavBar.css';

const BottomNavBar = () => {
  const location = useLocation();

  const accountPath = localStorage.getItem('lanada_user_id')
    ? '/orders'
    : '/login';

  const hiddenRoutes = [
    '/admin',
    '/cart',
    '/size-selection'
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav
      className="lanada-bottom-bar"
      aria-label="Mobile navigation"
    >

      {/* HOME */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `lanada-bottom-item ${isActive ? 'active' : ''}`
        }
      >
        <House
          size={27}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <span>Home</span>
      </NavLink>

      {/* CENTER BRAND */}
      <NavLink
        to="/"
        className="lanada-bottom-brand"
        aria-label="LANADA Home"
      >
        LANADA<span>.</span>
      </NavLink>

      {/* ACCOUNT */}
      <NavLink
        to={accountPath}
        className={({ isActive }) =>
          `lanada-bottom-item ${isActive ? 'active' : ''}`
        }
      >
        <UserRound
          size={27}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <span>Me</span>
      </NavLink>

    </nav>
  );
};

export default BottomNavBar;
