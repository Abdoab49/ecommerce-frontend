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
      <button className="Btn" onClick={handleLogout} title="Logout">
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        <div className="text">Logout</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ============================================
     BASE — Desktop
     ============================================ */
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: white;
  }

  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: black;
  }

  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: 0.3s;
  }

  .Btn:hover {
    background-color: black;
    width: 125px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }

  .Btn:hover .sign svg path {
    fill: white;
  }

  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }

  .Btn:active {
    transform: translate(2px, 2px);
  }

  /* ============================================
     MEDIA QUERIES — Responsive
     ============================================ */

  @media (max-width: 900px) {
    .Btn {
      width: 42px;
      height: 42px;
    }

    .sign svg {
      width: 16px;
    }

    .Btn:hover {
      width: 115px;
    }

    .text {
      font-size: 1.1em;
    }
  }

  @media (max-width: 768px) {
    .Btn {
      width: 40px;
      height: 40px;
    }

    .sign svg {
      width: 15px;
    }

    .Btn:hover {
      width: 110px;
    }

    .Btn:hover .sign {
      padding-left: 16px;
    }

    .text {
      font-size: 1em;
    }
  }

  @media (max-width: 600px) {
    .Btn {
      width: 38px;
      height: 38px;
    }

    .sign svg {
      width: 14px;
    }

    .Btn:hover {
      width: 105px;
      border-radius: 30px;
    }

    .Btn:hover .sign {
      padding-left: 14px;
    }

    .text {
      font-size: 0.9em;
    }
  }

  @media (max-width: 480px) {
    .Btn {
      width: 36px;
      height: 36px;
    }

    .sign svg {
      width: 13px;
    }

    .Btn:hover {
      width: 100px;
      border-radius: 25px;
    }

    .Btn:hover .sign {
      padding-left: 12px;
    }

    .Btn:hover .text {
      padding-right: 8px;
    }

    .text {
      font-size: 0.85em;
    }
  }

  @media (max-width: 400px) {
    .Btn {
      width: 34px;
      height: 34px;
    }

    .sign svg {
      width: 12px;
    }

    .Btn:hover {
      width: 90px;
      border-radius: 20px;
    }

    .Btn:hover .sign {
      padding-left: 10px;
    }

    .Btn:hover .text {
      padding-right: 6px;
    }

    .text {
      font-size: 0.8em;
    }
  }

  @media (max-width: 320px) {
    .Btn {
      width: 32px;
      height: 32px;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
    }

    .sign svg {
      width: 11px;
    }

    .Btn:hover {
      width: 85px;
      border-radius: 16px;
    }

    .Btn:hover .sign {
      padding-left: 8px;
    }

    .Btn:hover .text {
      padding-right: 5px;
    }

    .text {
      font-size: 0.75em;
    }
  }

  /* Landscape */
  @media (max-height: 500px) and (orientation: landscape) {
    .Btn {
      width: 36px;
      height: 36px;
    }

    .sign svg {
      width: 13px;
    }

    .Btn:hover {
      width: 100px;
    }

    .text {
      font-size: 0.85em;
    }
  }

  /* Touch devices */
  @media (hover: none) {
    .Btn:active {
      background-color: black;
      width: 110px;
      border-radius: 40px;
      transition-duration: 0.3s;
    }

    .Btn:active .sign {
      width: 30%;
      padding-left: 16px;
    }

    .Btn:active .sign svg path {
      fill: white;
    }

    .Btn:active .text {
      opacity: 1;
      width: 70%;
      padding-right: 8px;
    }
  }
`;

export default LogoutButton;