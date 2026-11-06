// src/Components/MyOrdersButton/MyOrdersButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MyOrdersButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);

  // ✅ Check user mconnecté
  useEffect(() => {
    const userData = localStorage.getItem('lanada_user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // ✅ Listener — melli user ytbdel
  useEffect(() => {
    const handleUserChange = () => {
      const userData = localStorage.getItem('lanada_user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  // ✅ Fetch 3adad dyal Orders (Lli mazal ma wsaloch ghir)
  useEffect(() => {
    const userId = localStorage.getItem('lanada_user_id');
    if (!userId) {
      setOrdersCount(0);
      return;
    }

    const fetchOrdersCount = async () => {
      try {
        const response = await fetch(
          `https://backend-3lyx.onrender.com/api/orders?userId=${userId}`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        
        // ✅ Hna kanfiltriw bach n7isbo ghir l'commandes li mazal ma wsaloch
        if (Array.isArray(data)) {
          const activeOrders = data.filter((order) => {
            const status = String(order.status || 'pending').toLowerCase();
            return status !== 'delivered' && status !== 'cancelled';
          });
          setOrdersCount(activeOrders.length);
        } else {
          setOrdersCount(0);
        }

      } catch (err) {
        console.error('Error fetching orders count:', err);
        setOrdersCount(0);
      }
    };

    fetchOrdersCount();
  }, [location.pathname]);

  // ✅ Ma kaybanch ila mashi mconnecté
  if (!user) return null;

  // ✅ Ma kaybanch f /orders
  if (location.pathname === '/orders') return null;

  return (
    <StyledWrapper>
      {/* ✅ Badge — Fo9 Button (Kiban ghir ila kayn orders mazal) */}
      {ordersCount > 0 && (
        <span className="badge" aria-label={`${ordersCount} orders`}>
          {ordersCount > 99 ? '99+' : ordersCount}
        </span>
      )}

      <button
        className="button"
        onClick={() => navigate('/orders')}
        title="My Orders"
        aria-label="My Orders"
      >
        <p className="button__text">
          <span style={{ '--index': 0 }}>M</span>
          <span style={{ '--index': 1 }}>Y</span>
          <span style={{ '--index': 2 }} />
          <span style={{ '--index': 3 }}>O</span>
          <span style={{ '--index': 4 }}>R</span>
          <span style={{ '--index': 5 }}>D</span>
          <span style={{ '--index': 6 }}>E</span>
          <span style={{ '--index': 7 }}>R</span>
          <span style={{ '--index': 8 }}>S</span>
          <span style={{ '--index': 9 }} />
          <span style={{ '--index': 10 }}>M</span>
          <span style={{ '--index': 11 }}>Y</span>
          <span style={{ '--index': 12 }} />
          <span style={{ '--index': 13 }}>O</span>
          <span style={{ '--index': 14 }}>R</span>
          <span style={{ '--index': 15 }}>D</span>
          <span style={{ '--index': 16 }}>E</span>
          <span style={{ '--index': 17 }}>R</span>
          <span style={{ '--index': 18 }}>S</span>
        </p>

        <div className="button__circle">
          {/* ✅ Icon Package */}
          <svg
            width={20}
            height={20}
            className="button__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <svg
            className="button__icon button__icon--copy"
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ✅ Fixed — Floating f jnab */
  position: fixed;
  right: 24px;
  bottom: 180px;
  z-index: 999;

  /* ============================================
     ✅ BADGE — Ra9im fo9 Button
     ============================================ */
  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    z-index: 10;

    min-width: 28px;
    height: 28px;
    padding: 0 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #000000;
    color: #ffffff;
    border: 3px solid #ffffff;
    border-radius: 50px;

    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;

    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.4);

    animation: badge-pop 0.3s ease-out;
  }

  @keyframes badge-pop {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  /* ============================================
     ✅ BUTTON — Khat Byed + Dayera K7la
     ============================================ */
  .button {
    position: relative;
    cursor: pointer;
    background: #000000;
    color: #ffffff;
    border: 3px solid #000000;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-content: center;
    transition: background 300ms, color 300ms, border-color 300ms, transform 200ms;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.1);
  }

  .button__text {
    position: absolute;
    inset: 0;
    animation: text-rotation 8s linear infinite;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #ffffff;

    > span {
      position: absolute;
      transform: rotate(calc(19deg * var(--index)));
      inset: 8px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  }

  .button__circle {
    position: relative;
    width: 44px;
    height: 44px;
    overflow: hidden;
    background: #ffffff;
    color: #000000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 300ms, color 300ms;
  }

  .button__icon--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  /* ============================================
     ✅ HOVER — L'3aks
     ============================================ */
  .button:hover {
    background: #ffffff;
    color: #000000;
    border-color: #000000;
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(255, 255, 255, 0.3), 0 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .button:hover .button__text {
    color: #000000;
  }

  .button:hover .button__circle {
    background: #000000;
    color: #ffffff;
  }

  .button:hover .button__icon {
    color: #ffffff;
  }

  .button:hover .button__icon:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }

  @keyframes text-rotation {
    to {
      rotate: 360deg;
    }
  }

  /* ============================================
     ✅ MOBILE
     ============================================ */
  @media (max-width: 768px) {
    right: 16px;
    bottom: 140px;

    .button {
      width: 85px;
      height: 85px;
      border-width: 2.5px;
    }

    .button__text {
      font-size: 9px;
    }

    .button__text > span {
      inset: 6px;
    }

    .button__circle {
      width: 38px;
      height: 38px;
    }

    .badge {
      min-width: 24px;
      height: 24px;
      font-size: 12px;
      top: -4px;
      right: -4px;
      border-width: 2px;
    }
  }

  @media (max-width: 480px) {
    right: 12px;
    bottom: 120px;

    .button {
      width: 70px;
      height: 70px;
      border-width: 2px;
    }

    .button__text {
      font-size: 8px;
    }

    .button__text > span {
      inset: 5px;
    }

    .button__circle {
      width: 32px;
      height: 32px;
    }

    .badge {
      min-width: 20px;
      height: 20px;
      font-size: 10px;
      top: -2px;
      right: -2px;
      border-width: 2px;
    }
  }
`;

export default MyOrdersButton;