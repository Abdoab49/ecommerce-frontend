
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PackageCheck, ArrowUpRight } from 'lucide-react';

const API = 'https://backend-3lyx.onrender.com/api';

const MyOrdersButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);

  // USER DATA
  const readUser = () => {
    const userData = localStorage.getItem('lanada_user');

    if (!userData) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('User data error:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    readUser();
  }, [location.pathname]);

  // LOGIN / LOGOUT LISTENER
  useEffect(() => {
    const handleUserChange = () => readUser();

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  // FETCH ACTIVE ORDERS
  useEffect(() => {
    const userId = localStorage.getItem('lanada_user_id');

    if (!userId || !user) {
      setOrdersCount(0);
      return;
    }

    const controller = new AbortController();

    const fetchOrdersCount = async () => {
      try {
        const response = await fetch(
          `${API}/orders?userId=${encodeURIComponent(userId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const activeOrders = data.filter((order) => {
            const status = String(
              order.status || 'pending'
            ).toLowerCase();

            return (
              status !== 'delivered' &&
              status !== 'cancelled'
            );
          });

          setOrdersCount(activeOrders.length);
        } else {
          setOrdersCount(0);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Orders count error:', error);
          setOrdersCount(0);
        }
      }
    };

    fetchOrdersCount();

    return () => controller.abort();

  }, [location.pathname, user]);

  // SHOW ONLY ON HOME
  if (location.pathname !== '/') return null;

  // HIDE IF NOT LOGGED IN
  if (!user) return null;

  return (
    <StyledWrapper>
      <button
        type="button"
        className="my-orders-button"
        onClick={() => navigate('/orders')}
        title="My Orders"
        aria-label={`My Orders, ${ordersCount} active orders`}
      >
        {/* LEFT ARROW */}
        <span className="orders-leading-icon">
          <ArrowUpRight size={14} strokeWidth={2} />
        </span>

        {/* BUTTON TEXT */}
        <span className="orders-label">
          MY ORDERS
        </span>

        {/* ORDER COUNT */}
        {ordersCount > 0 && (
          <span className="orders-badge">
            {ordersCount > 99 ? '99+' : ordersCount}
          </span>
        )}

        {/* PACKAGE ICON */}
        <span className="orders-package-icon">
          <PackageCheck size={17} strokeWidth={1.8} />
        </span>
      </button>
    </StyledWrapper>
  );
};

// =========================================
// LANADA — MINIMAL BLACK & WHITE BUTTON
// =========================================

const StyledWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 52%;
  transform: translateY(-50%);
  z-index: 999;

  .my-orders-button {
    position: relative;

    min-width: 140px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 0 13px;

    background: #080808;
    color: #ffffff;

    border: 1px solid #080808;
    border-radius: 50px;

    cursor: pointer;

    box-shadow: 0 4px 12px rgba(0,0,0,.12);

    font-family: Arial, Helvetica, sans-serif;

    transition:
      background .2s ease,
      transform .2s ease,
      box-shadow .2s ease;

    -webkit-tap-highlight-color: transparent;
  }

  /* LEFT ARROW */

  .orders-leading-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;
    flex-shrink: 0;
  }

  /* MY ORDERS TEXT */

  .orders-label {
    color: #ffffff;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: .55px;
    white-space: nowrap;
  }

  /* PACKAGE */

  .orders-package-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;
    flex-shrink: 0;
  }

  /* ORDERS BADGE */

  .orders-badge {
    position: absolute;
    top: -7px;
    right: -5px;

    min-width: 18px;
    height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 4px;

    background: #ffffff;
    color: #000000;

    border: 1px solid #000000;
    border-radius: 50px;

    font-size: 9px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  /* HOVER */

  .my-orders-button:hover {
    background: #262626;
    border-color: #262626;

    box-shadow: 0 7px 17px rgba(0,0,0,.17);
  }

  /* CLICK */

  .my-orders-button:active {
    transform: scale(.96);
  }

  .my-orders-button:focus-visible {
    outline: 2px solid #000000;
    outline-offset: 4px;
  }

  /* MOBILE */

  @media (max-width: 768px) {
    right: 13px;
    top: auto;

    bottom: calc(
      118px + env(safe-area-inset-bottom)
    );

    transform: none;

    .my-orders-button {
      min-width: 132px;
      height: 34px;
      padding: 0 11px;
      gap: 7px;
    }

    .orders-label {
      font-size: 9px;
    }

    .my-orders-button:active {
      transform: scale(.96);
    }
  }

  /* SMALL MOBILE */

  @media (max-width: 380px) {
    right: 9px;

    bottom: calc(
      108px + env(safe-area-inset-bottom)
    );

    .my-orders-button {
      min-width: 122px;
      height: 32px;
      padding: 0 9px;
      gap: 6px;
    }

    .orders-label {
      font-size: 8px;
    }

    .orders-leading-icon svg,
    .orders-package-icon svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export default MyOrdersButton;
