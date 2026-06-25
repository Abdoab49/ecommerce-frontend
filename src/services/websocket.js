// src/services/websocket.js

class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = {};
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        // ✅ استخدام رابط Vercel
        const wsUrl = window.location.protocol === 'https:' 
            ? 'wss://www.lanada.shop' 
            : 'ws://localhost:3000';
        
        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(wsUrl);
                
                this.socket.onopen = () => {
                    console.log('✅ WebSocket connected');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    resolve();
                };
                
                this.socket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        this.handleMessage(data);
                    } catch(e) {
                        this.handleMessage({ type: 'text', message: event.data });
                    }
                };
                
                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    this.isConnected = false;
                    reject(error);
                };
                
                this.socket.onclose = () => {
                    console.log('WebSocket disconnected');
                    this.isConnected = false;
                    this.handleReconnect();
                };
            } catch (error) {
                console.error('Failed to connect WebSocket:', error);
                reject(error);
            }
        });
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            setTimeout(() => this.connect(), 3000);
        } else {
            console.log('Max reconnect attempts reached');
        }
    }

    handleMessage(data) {
        const type = data.type || 'message';
        if (this.listeners[type]) {
            this.listeners[type].forEach(callback => callback(data));
        }
        if (this.listeners['*']) {
            this.listeners['*'].forEach(callback => callback(data));
        }
    }

    on(type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    off(type, callback) {
        if (this.listeners[type]) {
            this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);
        }
    }

    send(type, data = {}) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const message = { type, ...data, timestamp: new Date().toISOString() };
            this.socket.send(JSON.stringify(message));
            return true;
        }
        console.warn('WebSocket not connected');
        return false;
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.isConnected = false;
    }
}

const websocketService = new WebSocketService();
export default websocketService;