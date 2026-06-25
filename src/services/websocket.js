class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = {};
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            // استخدم رابط ngrok العام (عدل هذا الرابط)
            this.socket = new WebSocket('wss://residue-making-trading.ngrok-free.dev');
            
            this.socket.onopen = () => {
                console.log('✅ WebSocket connected');
                this.isConnected = true;
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
                // Auto reconnect after 3 seconds
                setTimeout(() => this.connect(), 3000);
            };
        });
    }

    handleMessage(data) {
        // Notify specific listeners
        const type = data.type || 'message';
        if (this.listeners[type]) {
            this.listeners[type].forEach(callback => callback(data));
        }
        // Generic listener
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