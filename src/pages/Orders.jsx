// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ جلب الطلبات من API
        const response = await fetch('/api/orders');
        const data = await response.json();
        console.log('📦 Orders:', data);
        setOrders(data);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <p>❌ {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="empty-icon">📦</div>
        <h2>No orders yet</h2>
        <p>Start shopping to place your first order!</p>
        <button onClick={() => navigate('/')}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>📋 My Orders</h1>
        <span className="orders-count">{orders.length} orders</span>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <span className="label">Order #</span>
                <span className="value">{order.id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status}`}>
                  {order.status === 'pending' && '⏳ Pending'}
                  {order.status === 'processing' && '⚙️ Processing'}
                  {order.status === 'shipped' && '🚚 Shipped'}
                  {order.status === 'delivered' && '✅ Delivered'}
                  {order.status === 'cancelled' && '❌ Cancelled'}
                </span>
              </div>
              <div className="order-date">
                <span className="label">📅</span>
                <span className="value">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items?.map((item, index) => {
                const itemTotal = item.price * (item.quantity || 1);
                return (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img 
                        src={item.image || '/Assets/ShoeStore/tshirt1.png'} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/Assets/ShoeStore/tshirt1.png';
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-details">
                        <span className="item-qty">Qty: {item.quantity}</span>
                        {item.size && <span className="item-size">Size: {item.size}</span>}
                      </div>
                    </div>
                    <div className="item-price">
                      <span>${itemTotal.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-shipping">
              <h4>📍 Shipping Details</h4>
              <div className="shipping-info-grid">
                <div className="shipping-item">
                  <span className="shipping-label">Full Name:</span>
                  <span className="shipping-value">{order.shippingAddress?.fullName || 'Not provided'}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Phone:</span>
                  <span className="shipping-value">{order.shippingAddress?.phone || 'Not provided'}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">City:</span>
                  <span className="shipping-value">{order.shippingAddress?.city || 'Not provided'}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Address:</span>
                  <span className="shipping-value">{order.shippingAddress?.street || 'Not provided'}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-label">Country:</span>
                  <span className="shipping-value">{order.shippingAddress?.country || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span className="total-label">Total</span>
                <span className="total-value">${order.totalAmount?.toFixed(2) || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;