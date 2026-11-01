// src/Components/Notification/Notification.jsx
import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ type = 'success', title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  // ✅ Icons b SVG (kifma f Carbon)
  const icons = {
    success: (
      <svg className="bx--inline-notification__icon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z" />
      </svg>
    ),
    error: (
      <svg className="bx--inline-notification__icon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
      </svg>
    ),
    warning: (
      <svg className="bx--inline-notification__icon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" />
      </svg>
    ),
    info: (
      <svg className="bx--inline-notification__icon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.12H12V21.88h2.88V15.12H13V12.88h4.13v9H20Z" />
      </svg>
    ),
  };

  return (
    <div className="notification-wrapper">
      <div
        className={`bx--inline-notification bx--inline-notification--${type}`}
        role="alert"
      >
        <div className="bx--inline-notification__details">
          {icons[type] || icons.info}
          <div className="bx--inline-notification__text-wrapper">
            <p className="bx--inline-notification__title">{title}</p>
            <p className="bx--inline-notification__subtitle">{message}</p>
          </div>
        </div>
        <button
          className="bx--inline-notification__close-button"
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          aria-label="close"
        >
          <svg className="bx--inline-notification__close-icon" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;