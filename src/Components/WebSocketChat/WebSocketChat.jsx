import React, { useState, useEffect, useRef } from 'react';
import webSocketService from '../../services/websocket';
import './WebSocketChat.css';

const WebSocketChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [username] = useState('User_' + Math.floor(Math.random() * 1000));
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const addSystemMessageLocal = (msg) => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'System',
                message: msg,
                isSystem: true,
                timestamp: new Date().toLocaleTimeString()
            }]);
        };

        const addMessageLocal = (sender, message, isOwn = false) => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender,
                message,
                isOwn,
                timestamp: new Date().toLocaleTimeString()
            }]);
        };

        webSocketService.connect()
            .then(() => {
                setIsConnected(true);
                addSystemMessageLocal('Connected to server!');
            })
            .catch(() => {
                addSystemMessageLocal('Failed to connect to server');
            });

        webSocketService.on('welcome', (data) => {
            addSystemMessageLocal(data.message);
        });

        webSocketService.on('chat', (data) => {
            addMessageLocal(data.sender, data.message, false);
        });

        webSocketService.on('response', (data) => {
            addSystemMessageLocal(data.message);
        });

        return () => {
            webSocketService.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;
        if (!isConnected) {
            return;
        }

        const newMessage = {
            id: Date.now(),
            sender: username,
            message: inputMessage,
            isOwn: true,
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, newMessage]);
        webSocketService.send('chat', {
            message: inputMessage,
            sender: username
        });
        setInputMessage('');
        
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="websocket-chat">
            <div className="chat-header">
                <h3>Live Chat</h3>
                <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
            </div>
            
            <div className="chat-messages">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`message ${msg.isOwn ? 'own' : ''} ${msg.isSystem ? 'system' : ''}`}
                    >
                        <div className="message-sender">{msg.sender}</div>
                        <div className="message-text">{msg.message}</div>
                        <div className="message-time">{msg.timestamp}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    disabled={!isConnected}
                />
                <button onClick={sendMessage} disabled={!isConnected}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketChat;