// src/pages/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('lanada_user_id');
    localStorage.removeItem('lanada_user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <StyledWrapper>
      <button className="logoutText" onClick={handleLogout}>
        Logout
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .logoutText {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    color: #111827;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
    width: 100%;
    text-align: center;
  }

  .logoutText:hover {
    color: #dc2626;
    text-decoration: underline;
  }

  .logoutText:active {
    transform: translate(1px, 1px);
  }

  @media (max-width: 900px) {
    .logoutText { font-size: 13.5px; }
  }

  @media (max-width: 768px) {
    .logoutText { font-size: 13px; }
  }

  @media (max-width: 600px) {
    .logoutText { font-size: 12.5px; }
  }

  @media (max-width: 480px) {
    .logoutText { font-size: 12px; }
  }

  @media (max-width: 400px) {
    .logoutText { font-size: 11.5px; }
  }

  @media (max-width: 320px) {
    .logoutText { font-size: 11px; }
  }
`;

export default LogoutButton;