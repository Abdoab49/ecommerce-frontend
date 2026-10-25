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

  const accentColor = type === 'success' ? '#49a87d' : '#ef4444';
  const iconSvg =
    type === 'success'
      ? `url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' fill='%23ffffff'%3E%3Cpath d='M400-314.46 250.46-464 296-509.54l104 104 264-264L709.54-624 400-314.46Z'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' fill='%23ffffff'%3E%3Cpath d='M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z'/%3E%3C/svg%3E")`;

  return (
    <div
      className={`notification notification--${type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        '--accent-900': accentColor,
        '--check-svg': iconSvg,
      }}
    >
      <div className="notification__icon"></div>
      <div className="notification__body">
        <h2 className="notification__header">{title}</h2>
        <p className="notification__text">{message}</p>
      </div>
      <div className="notification__action">
        <button
          className="button"
          aria-label="dismiss this notification"
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  );
};

export default Notification;