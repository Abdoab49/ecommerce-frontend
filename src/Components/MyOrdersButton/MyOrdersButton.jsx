
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PackageCheck } from 'lucide-react';

const API = 'https://backend-3lyx.onrender.com/api';

const MyOrdersButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);

  // =========================================
  // READ CONNECTED USER
  // =========================================

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

  // =========================================
  // LISTEN TO LOGIN / LOGOUT CHANGES
  // =========================================

  useEffect(() => {
    const handleUserChange = () => {
      readUser();
    };

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  // =========================================
  // FETCH ACTIVE ORDERS COUNT
  // =========================================

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
          {
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          // Count orders that have not been delivered or cancelled
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
          console.error('Error fetching orders:', error);
          setOrdersCount(0);
        }
      }
    };

    fetchOrdersCount();

    return () => {
      controller.abort();
    };

  }, [location.pathname, user]);

  // =========================================
  // VISIBILITY CONDITIONS
  // =========================================

  // Show only on Home page
  if (location.pathname !== '/') {
    return null;
  }

  // Hide if the user is not connected
  if (!user) {
    return null;
  }

  // =========================================
  // RENDER BUTTON
  // =========================================

  return (
    <StyledWrapper>

      <button
        type="button"
        className="my-orders-button"
        onClick={() => navigate('/orders')}
        title="My Orders"
        aria-label={`My Orders, ${ordersCount} active orders`}
      >

        {/* TOP WHITE INDICATOR */}
        <span className="active-indicator" />

        {/* PACKAGE ICON */}
        <span className="orders-icon">
          <PackageCheck
            size={25}
            strokeWidth={1.8}
          />
        </span>

        {/* BUTTON LABEL */}
        <span className="orders-label">
          MY ORDERS
        </span>

        {/* ACTIVE ORDERS BADGE */}
        {ordersCount > 0 && (
          <span
            className="orders-badge"
            aria-label={`${ordersCount} active orders`}
          >
            {ordersCount > 99 ? '99+' : ordersCount}
          </span>
        )}

      </button>

    </StyledWrapper>
  );
};

// =============================================
// PREMIUM BLACK & WHITE STYLED DESIGN
// =============================================

const StyledWrapper = styled.div`

  position: fixed;
  right: 20px;
  top: 52%;
  transform: translateY(-50%);
  z-index: 999;

  /* =========================================
     MAIN BUTTON
  ========================================= */

  .my-orders-button {

    position: relative;

    width: 108px;
    height: 102px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 12px;

    padding: 10px;

    overflow: hidden;

    background: #000000;
    color: #ffffff;

    border: 1px solid rgba(255,255,255,.20);
    border-radius: 19px;

    cursor: pointer;

    outline: none;
    box-shadow: 0 8px 24px rgba(0,0,0,.22);

    transition:
      transform .25s ease,
      background .25s ease,
      box-shadow .25s ease;

    -webkit-tap-highlight-color: transparent;
  }

  /* =========================================
     TOP WHITE INDICATOR
  ========================================= */

  .active-indicator {

    position: absolute;

    top: 0;
    left: 50%;

    transform: translateX(-50%);

    width: 55%;
    height: 4px;

    background: #ffffff;

    border-radius: 0 0 3px 3px;
  }

  /* =========================================
     PACKAGE ICON
  ========================================= */

  .orders-icon {

    display: flex;

    align-items: center;
    justify-content: center;

    color: #ffffff;

    transition: transform .25s ease;
  }

  /* =========================================
     MY ORDERS TEXT
  ========================================= */

  .orders-label {

    color: #ffffff;

    font-family: Arial, Helvetica, sans-serif;

    font-size: 11px;
    font-weight: 700;

    letter-spacing: 1px;

    white-space: nowrap;
  }

  /* =========================================
     ORDERS COUNTER
  ========================================= */

  .orders-badge {

    position: absolute;

    top: 8px;
    right: 8px;

    min-width: 19px;
    height: 19px;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 0 5px;

    background: #ffffff;
    color: #000000;

    border-radius: 50px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-weight: 800;

    font-variant-numeric: tabular-nums;
  }

  /* =========================================
     HOVER EFFECT
  ========================================= */

  .my-orders-button:hover {

    background: #ffffff;
    color: #000000;

    transform: translateY(-3px);

    box-shadow: 0 10px 26px rgba(0,0,0,.18);
  }

  .my-orders-button:hover .orders-icon,
  .my-orders-button:hover .orders-label {

    color: #000000;
  }

  .my-orders-button:hover .active-indicator {

    background: #000000;
  }

  .my-orders-button:hover .orders-badge {

    background: #000000;
    color: #ffffff;
  }

  /* =========================================
     CLICK EFFECT
  ========================================= */

  .my-orders-button:active {

    transform: scale(.95);
  }

  .my-orders-button:focus-visible {

    outline: 2px solid #000000;
    outline-offset: 4px;
  }

  /* =========================================
     TABLET & MOBILE
  ========================================= */

  @media (max-width: 768px) {

    right: 12px;
    top: auto;

    bottom: calc(
      115px + env(safe-area-inset-bottom)
    );

    transform: none;

    .my-orders-button {

      width: 88px;
      height: 86px;

      border-radius: 16px;
      gap: 10px;

      padding: 8px;
    }

    .orders-icon svg {

      width: 25px;
      height: 25px;
    }

    .orders-label {

      font-size: 9px;
      letter-spacing: .8px;
    }

    .orders-badge {

      top: 6px;
      right: 6px;

      min-width: 17px;
      height: 17px;

      font-size: 9px;
    }

    .my-orders-button:hover {

      transform: none;
    }

    .my-orders-button:active {

      transform: scale(.95);
    }
  }

  /* =========================================
     SMALL MOBILE
  ========================================= */

  @media (max-width: 380px) {

    right: 9px;

    bottom: calc(
      105px + env(safe-area-inset-bottom)
    );

    .my-orders-button {

      width: 78px;
      height: 78px;

      border-radius: 14px;
      gap: 8px;
    }

    .orders-icon svg {

      width: 22px;
      height: 22px;
    }

    .orders-label {

      font-size: 8px;
      letter-spacing: .6px;
    }

    .orders-badge {

      top: 5px;
      right: 5px;

      min-width: 16px;
      height: 16px;

      font-size: 8px;
    }
  }

`;

export default MyOrdersButton;
