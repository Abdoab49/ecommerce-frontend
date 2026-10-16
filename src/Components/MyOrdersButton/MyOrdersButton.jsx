// src/Components/MyOrdersButton/MyOrdersButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MyOrdersButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

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

  // ✅ Ma kaybanch ila mashi mconnecté
  if (!user) return null;

  // ✅ Ma kaybanch f /orders (rak deja f Orders)
  if (location.pathname === '/orders') return null;

  return (
    <StyledWrapper>
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
          {/* ✅ Icon Package — Badal Arrow */}
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
  .button {
    /* ✅ FIXED — Floating f jnab */
    position: fixed;
    right: 24px;
    bottom: 100px;
    z-index: 999;

    cursor: pointer;
    border: none;
    background: #fef6f7;
    color: #db5275;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-content: center;
    transition: background 300ms, transform 200ms;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  .button__text {
    position: absolute;
    inset: 0;
    animation: text-rotation 8s linear infinite;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;

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
    background: #fff;
    color: #db5275;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button__icon--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover {
    background: #000;
    color: #fff;
    transform: scale(1.05);
  }

  .button:hover .button__icon {
    color: #000;
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
    .button {
      right: 16px;
      bottom: 90px;
      width: 85px;
      height: 85px;
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
  }

  @media (max-width: 480px) {
    .button {
      right: 12px;
      bottom: 80px;
      width: 70px;
      height: 70px;
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
  }
`;

export default MyOrdersButton;