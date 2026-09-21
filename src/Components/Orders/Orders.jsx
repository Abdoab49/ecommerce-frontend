import styles from './Orders.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../api';
import './Orders.module.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
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
      <h2>My Orders</h2>
      <div className={ordersList}>
        {orders.map((order) => (
          <div key={order._id} className={orderCard}>
            <div className={orderHeader}>
              <span className={orderId}>Order #{order._id.slice(-6)}</span>
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
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={orderTotal}>
              <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;