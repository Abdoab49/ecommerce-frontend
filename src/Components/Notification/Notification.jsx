
import React, { useState, useEffect } from 'react';
import {
    CircleCheck,
    Info,
    TriangleAlert,
    CircleAlert,
    X
} from 'lucide-react';

import './Notification.css';

const notificationConfig = {
    success: {
        icon: CircleCheck,
        className: 'notification-success',
        defaultTitle: 'Success',
        role: 'status'
    },
    info: {
        icon: Info,
        className: 'notification-info',
        defaultTitle: 'Information',
        role: 'status'
    },
    warning: {
        icon: TriangleAlert,
        className: 'notification-warning',
        defaultTitle: 'Warning',
        role: 'status'
    },
    error: {
        icon: CircleAlert,
        className: 'notification-error',
        defaultTitle: 'Error',
        role: 'alert'
    }
};

const Notification = ({
    type = 'success',
    title,
    message,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const config =
        notificationConfig[type] || notificationConfig.info;

    const Icon = config.icon;

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);

            if (onClose) {
                onClose();
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setIsVisible(false);

        if (onClose) {
            onClose();
        }
    };

    if (!isVisible) return null;

    const now = new Date();

    const timeStamp = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return (
        <div className="notification-wrapper">
            <div
                className={`notification-card ${config.className}`}
                role={config.role}
                aria-live={config.role === 'alert' ? 'assertive' : 'polite'}
            >
                <Icon
                    className="notification-icon"
                    size={21}
                    strokeWidth={2}
                    aria-hidden="true"
                />

                <div className="notification-content">
                    <span className="notification-title">
                        {title || config.defaultTitle}
                    </span>

                    {message && (
                        <span className="notification-message">
                            {message}
                        </span>
                    )}

                    <span className="notification-timestamp">
                        {timeStamp}
                    </span>
                </div>

                <button
                    type="button"
                    className="notification-close"
                    onClick={handleClose}
                    aria-label="Dismiss notification"
                >
                    <X size={17} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};

export default Notification;
