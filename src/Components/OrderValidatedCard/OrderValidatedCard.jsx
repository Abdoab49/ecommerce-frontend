// src/Components/OrderValidatedCard/OrderValidatedCard.jsx
import React from 'react';
import styled from 'styled-components';

const OrderValidatedCard = ({ onDismiss = null }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <button
          className="dismiss"
          type="button"
          onClick={onDismiss}
        >
          ×
        </button>
        <div className="header">
          <div className="div_image_v">
            <div className="image">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>
          <div className="content">
            <span className="title">Commande validée</span>
            <p className="message">
              Merci pour votre achat. Votre colis sera livré dans les 2 jours suivant votre achat.
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: hidden;
    position: relative;
    text-align: left;
    border-radius: 0.5rem;
    max-width: 590px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
  }

  .div_image_v {
    background: #47c9a2;
    border-bottom: none;
    position: relative;
    text-align: center;
    margin: -20px -20px 0;
    border-radius: 5px 5px 0 0;
    padding: 35px;
  }

  .dismiss {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: black;
    border: 2px solid #D1D5DB;
    font-size: 1rem;
    font-weight: 300;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    transition: .3s ease;
    cursor: pointer;
  }

  .dismiss:hover {
    background-color: #ee0d0d;
    border: 2px solid #ee0d0d;
    color: #fff;
  }

  .header {
    padding: 1.25rem 1rem 1rem 1rem;
  }

  .image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #e2feee;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    animation: animate .6s linear alternate-reverse infinite;
    transition: .6s ease;
  }

  .image svg {
    color: #0afa2a;
    width: 2rem;
    height: 2rem;
  }

  .content {
    margin-top: 0.75rem;
    text-align: center;
  }

  .title {
    color: #066e29;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  .message {
    margin-top: 0.5rem;
    color: #595b5f;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  @keyframes animate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.09);
    }
  }
`;

export default OrderValidatedCard;