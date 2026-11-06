
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

  // Read connected user
  const readUser = () => {
    const userData = localStorage.getItem('lanada_user');

    if (!userData) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUser();
  }, [location.pathname]);

  // Listen for login/logout changes
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

  // Fetch active orders count
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

  // Only show on Home
  if (location.pathname !== '/') {
    return null;
  }

  // Hide for visitors who are not logged in
  if (!user) {
    return null;
  }

  return (
    <StyledWrapper>
      <button
        type="button"
        className="my-orders-button"
        onClick={() => navigate('/orders')}
        aria-label={`My Orders, ${ordersCount} active orders`}
        title="My Orders"
      >
        {/* Active indicator */}
        <span className="active-indicator" />

        {/* Package icon */}
        <span className="orders-icon">
          <PackageCheck
            size={26}
            strokeWidth={1.8}
          />
        </span>

        {/* Text */}
        <span className="orders-content">
          <span className="orders-label">
            MY ORDERS
          </span>

          <span className="orders-subtitle">
            Track your purchases
          </span>
        </span>

        {/* Order count */}
        {ordersCount > 0 && (
          <span className="orders-badge">
            {ordersCount > 99 ? '99+' : ordersCount}
          </span>
        )}

        {/* Arrow */}
        <span className="orders-arrow">
          <ArrowUpRight size={19} />
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 52%;
  transform: translateY(-50%);
  z-index: 999;

  .my-orders-button {
    position: relative;

    width: 225px;
    min-height: 76px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 13px;

    padding: 12px 15px;

    overflow: hidden;

    background: #11121d;
    color: #e6e7f1;

    border: 1px solid rgba(255,255,255,.07);
    border-radius: 19px;

    cursor: pointer;
    text-align: left;

    box-shadow:
      0 12px 35px rgba(0,0,0,.22),
      0 3px 10px rgba(0,0,0,.12);

    transition:
      background .25s ease,
      border-color .25s ease,
      transform .25s ease,
      box-shadow .25s ease;

    -webkit-tap-highlight-color: transparent;
  }

  /* BLUE ACTIVE INDICATOR */

  .active-indicator {
    position: absolute;
    top: 0;
    left: 20px;

    width: 65px;
    height: 4px;

    background: #5b9cff;
    border-radius: 0 0 3px 3px;

    box-shadow: 0 0 14px rgba(91,156,255,.45);
  }

  /* PACKAGE ICON */

  .orders-icon {
    width: 43px;
    height: 43px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    color: #5b9cff;
    background: rgba(91,156,255,.10);

    border-radius: 12px;

    transition:
      background .25s ease,
      transform .25s ease;
  }

  /* TEXT */

  .orders-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    flex: 1;
    min-width: 0;
    gap: 5px;
  }

  .orders-label {
    color: #f4f4f8;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: 700;

    letter-spacing: 1.35px;
    white-space: nowrap;
  }

  .orders-subtitle {
    color: #898ba5;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-weight: 400;

    letter-spacing: .15px;
    white-space: nowrap;
  }

  /* BADGE */

  .orders-badge {
    min-width: 23px;
    height: 23px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 6px;

    border-radius: 20px;

    background: #5b9cff;
    color: #080b13;

    font-size: 11px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  /* ARROW */

  .orders-arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #898ba5;

    transition:
      color .25s ease,
      transform .25s ease;
  }

  /* HOVER */

  .my-orders-button:hover {
    background: #191b2b;
    border-color: rgba(91,156,255,.35);

    transform: translateY(-3px);

    box-shadow:
      0 15px 38px rgba(0,0,0,.28),
      0 0 20px rgba(91,156,255,.07);
  }

  .my-orders-button:hover .orders-icon {
    background: rgba(91,156,255,.18);
    transform: scale(1.06);
  }

  .my-orders-button:hover .orders-arrow {
    color: #5b9cff;
    transform: translate(2px,-2px);
  }

  .my-orders-button:active {
    transform: scale(.97);
  }

  .my-orders-button:focus-visible {
    outline: 2px solid #5b9cff;
    outline-offset: 4px;
  }

  /* TABLET AND MOBILE */

  @media (max-width: 768px) {
    right: 14px;
    top: auto;
    bottom: calc(125px + env(safe-area-inset-bottom));
    transform: none;

    .my-orders-button {
      width: 195px;
      min-height: 67px;
      padding: 10px 12px;
      gap: 10px;
      border-radius: 16px;
    }

    .orders-icon {
      width: 39px;
      height: 39px;
    }

    .orders-label {
      font-size: 10px;
    }

    .orders-subtitle {
      font-size: 9px;
    }

    .my-orders-button:hover {
      transform: none;
    }

    .my-orders-button:active {
      transform: scale(.97);
    }
  }

  /* SMALL MOBILE */

  @media (max-width: 380px) {
    right: 10px;
    bottom: calc(112px + env(safe-area-inset-bottom));

    .my-orders-button {
      width: 180px;
      min-height: 62px;
      padding: 9px 10px;
      gap: 8px;
    }

    .orders-icon {
      width: 35px;
      height: 35px;
    }

    .orders-label {
      font-size: 9px;
    }

    .orders-subtitle {
      font-size: 8px;
    }
  }
`;

export default MyOrdersButton;
