// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../api';
import { getProductPrice } from '../Data/prices';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        console.log('📦 Orders:', data);
        
        // ✅ تحديث الأسعار من prices.js
        const updatedOrders = data.map(order => ({
          ...order,
          items: order.items?.map(item => {
            const priceData = getProductPrice(item.name);
            return {
              ...item,
              price: priceData.new_price,
              old_price: priceData.old_price
            };
          }),
          totalAmount: order.items?.reduce((sum, item) => {
            const priceData = getProductPrice(item.name);
            return sum + (priceData.new_price * (item.quantity || 1));
          }, 0) || order.totalAmount
        }));
        
        setOrders(updatedOrders);
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
          <div key={order._id} className="order-card">
            {/* ===== HEADER ===== */}
            <div className="order-header">
              <div className="order-id">
                <span className="label">Order #</span>
                <span className="value">{order._id?.slice(-8).toUpperCase()}</span>
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

            {/* ===== ITEMS ===== */}
            <div className="order-items">
              {order.items?.map((item, index) => {
                // ✅ الحصول على السعر من prices.js
                const priceData = getProductPrice(item.name);
                const displayPrice = priceData.new_price;
                const displayOldPrice = priceData.old_price;
                const itemTotal = displayPrice * (item.quantity || 1);
                const oldTotal = displayOldPrice ? displayOldPrice * (item.quantity || 1) : null;

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
                        {displayOldPrice && displayOldPrice > displayPrice && (
                          <span className="item-discount" style={{color: '#e53935', fontWeight: 'bold', marginLeft: '8px'}}>
                            🎉 New Price!
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="item-price">
                      <span style={{fontWeight: 'bold', color: '#e53935'}}>
                        {displayPrice} DH
                      </span>
                      {oldTotal && oldTotal !== itemTotal && (
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#999', 
                          textDecoration: 'line-through',
                          display: 'block'
                        }}>
                          {oldTotal} DH
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== SHIPPING INFO ===== */}
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

            {/* ===== TOTAL ===== */}
            <div className="order-footer">
              <div className="order-total">
                <span className="total-label">Total</span>
                <span className="total-value" style={{color: '#e53935'}}>
                  {order.items?.reduce((sum, item) => {
                    const priceData = getProductPrice(item.name);
                    return sum + (priceData.new_price * (item.quantity || 1));
                  }, 0)} DH
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;