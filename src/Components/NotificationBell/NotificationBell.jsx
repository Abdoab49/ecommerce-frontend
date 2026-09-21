import React, { useState, useEffect } from 'react';
import webSocketService from '../../services/websocket';
import './NotificationBell.css';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        webSocketService.on('notification', (data) => {
            setNotifications(prev => [{
                id: Date.now(),
                title: data.title,
                message: data.message,
                timestamp: data.timestamp,
                read: false
            }, ...prev]);
            
            // Show browser notification
            if (Notification.permission === 'granted') {
                new Notification(data.title, { body: data.message });
            }
        });
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="notification-bell">

            
            {showDropdown && (
                <div className="dropdown">
                    <div className="dropdown-header">
                        <h4>Notifications</h4>
                        <button onClick={markAllAsRead}>Mark all read</button>
                    </div>
                    <div className="dropdown-content">
                        {notifications.length === 0 ? (
                            <p>No notifications</p>
                        ) : (
                            notifications.map(notif => (
                                <div 
                                    key={notif.id} 
                                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <strong>{notif.title}</strong>
                                    <p>{notif.message}</p>
                                    <small>{notif.timestamp}</small>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;