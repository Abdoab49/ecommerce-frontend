// src/pages/UserMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserMenu = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lanada_user_id');
    localStorage.removeItem('lanada_user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <StyledWrapper ref={menuRef}>
      {/* ✅ Ghir text — bla button */}
      <span
        className="userText"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.fullName.split(' ')[0]}
      </span>

      {/* ✅ Dropdown */}
      {isOpen && (
        <div className="dropdown">
          <Link
            to="/orders"
            className="dropdownItem"
            onClick={() => setIsOpen(false)}
          >
            {user.fullName}
          </Link>

          <div className="divider" />

          <button className="logoutText" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  /* ===== User Text — Ghir text ===== */
  .userText {
    color: #111827;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.2s;
    user-select: none;
    padding: 8px 0;
  }

  .userText:hover {
    color: #667eea;
    text-decoration: underline;
  }

  /* ===== Dropdown ===== */
  .dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 220px;
    padding: 8px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 4px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdownItem {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    color: #111827;
    background: transparent;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    text-align: left;
  }

  .dropdownItem:hover {
    background: #f3f4f6;
    color: #667eea;
  }

  .divider {
    height: 1px;
    background: #e5e7eb;
    margin: 4px 0;
  }

  /* ===== Logout — Ghir text ===== */
  .logoutText {
    background: none;
    border: none;
    padding: 12px 14px;
    margin: 0;
    color: #111827;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
  }

  .logoutText:hover {
    color: #dc2626;
    background: #fef2f2;
    text-decoration: underline;
  }

  /* ===== MEDIA QUERIES ===== */

  @media (max-width: 900px) {
    .userText {
      font-size: 13.5px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 13.5px;
    }
  }

  @media (max-width: 768px) {
    .userText {
      font-size: 13px;
    }
    .dropdown {
      min-width: 200px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 13px;
    }
  }

  @media (max-width: 600px) {
    .userText {
      font-size: 12.5px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 12.5px;
    }
  }

  @media (max-width: 480px) {
    .userText {
      font-size: 12px;
    }
    .dropdown {
      min-width: 180px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 12px;
      padding: 10px 12px;
    }
  }

  @media (max-width: 400px) {
    .userText {
      font-size: 11.5px;
    }
    .dropdown {
      min-width: 160px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 11.5px;
    }
  }

  @media (max-width: 320px) {
    .userText {
      font-size: 11px;
    }
    .dropdown {
      min-width: 150px;
      padding: 6px;
    }
    .dropdownItem,
    .logoutText {
      font-size: 11px;
      padding: 8px 10px;
    }
  }
`;

export default UserMenu;