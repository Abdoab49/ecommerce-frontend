import styles from './Orders.module.css';
// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.module.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ ✅ ✅ جلب جميع الطلبات من Backend (Render)
        const response = await fetch('https://backend-3lyx.onrender.com/api/orders');
        const data = await response.json();
        console.log('📦 All Orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className={loading}>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className={emptyOrders}>
        <h2>📦 No orders yet</h2>
        <p>Start shopping to place your first order!</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className={ordersContainer}>
      <h2>📋 All Orders ({orders.length})</h2>
      <div className={ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={orderCard}>
            <div className={orderHeader}>
              <span className={orderId}>Order #{order.id.slice(-6).toUpperCase()}</span>
              <span className={`${orderStatus} ${styles[order.status]}`}>
                {order.status}
              </span>
              <span className={orderDate}>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={orderItems}>
              {order.items.map((item, index) => (
                <div key={index} className={orderItem}>
                  <img src={item.image || '/Assets/ShoeStore/tshirt1.png'} alt={item.name} />
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size || 'M'}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={orderTotal}>
              <strong>Total: ${(order.totalAmount || 0).toFixed(2)}</strong>
            </div>
            <div className={orderShipping}>
              <p><strong>Customer:</strong> {order.shippingAddress?.fullName}</p>
              <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
              <p><strong>City:</strong> {order.shippingAddress?.city}</p>
              <p><strong>Address:</strong> {order.shippingAddress?.street}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;