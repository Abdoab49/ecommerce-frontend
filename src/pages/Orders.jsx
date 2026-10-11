// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

const STATUS_STEPS = [
  { key: 'pending', label: 'Confirmed Order', icon: 'pe-7s-cart' },
  { key: 'processing', label: 'Processing Order', icon: 'pe-7s-config' },
  { key: 'quality_check', label: 'Quality Check', icon: 'pe-7s-medal' },
  { key: 'shipped', label: 'Product Dispatched', icon: 'pe-7s-car' },
  { key: 'delivered', label: 'Product Delivered', icon: 'pe-7s-home' },
];

const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  quality_check: 'Checking Quality',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_MAP = {
  pending: 0,
  processing: 1,
  quality_check: 2,
  shipped: 3,
  delivered: 4,
};

const formatMoney = (amount) =>
  `${Number(amount || 0).toLocaleString('en-US')} DH`;

const formatDate = (date) => {
  if (!date) return '—';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '—';
  return parsedDate
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase();
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('lanada_user_id');
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://backend-3lyx.onrender.com/api/orders?userId=${userId}`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingBox}>Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingBox}>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button
            className={styles.btnOutline}
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingBox}>
          <h3>No orders</h3>
          <p>Start shopping to place your first order!</p>
          <button
            className={styles.btnOutline}
            onClick={() => navigate('/')}
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {orders.map((order) => {
        const orderId = String(order._id || order.id || '');
        const status = String(order.status || 'pending').toLowerCase();
        const items = Array.isArray(order.items) ? order.items : [];
        const shipping = order.shippingAddress || {};

        const currentIdx = STATUS_MAP[status] ?? 0;

        return (
          <div key={orderId} className={styles.card}>
            {/* ===== Tracking Header ===== */}
            <div className={styles.cardHeader}>
              <span className={styles.headerLabel}>Tracking Order No - </span>
              <span className={styles.headerValue}>
                {orderId.slice(-10).toUpperCase() || '------'}
              </span>
            </div>

            {/* ===== Details Row ===== */}
            <div className={styles.detailsRow}>
              <div className={styles.detailBox}>
                <span className={styles.detailLabel}>Shipped Via:</span>
                <span className={styles.detailValue}>Cash on Delivery</span>
              </div>
              <div className={styles.detailBox}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>
                  {STATUS_LABELS[status] || status}
                </span>
              </div>
              <div className={styles.detailBox}>
                <span className={styles.detailLabel}>Order Date:</span>
                <span className={styles.detailValue}>
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>

            {/* ===== Steps ===== */}
            <div className={styles.cardBody}>
              <div className={styles.steps}>
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = status !== 'cancelled' && index <= currentIdx;
                  return (
                    <div
                      key={step.key}
                      className={`${styles.step} ${isCompleted ? styles.completed : ''}`}
                    >
                      <div className={styles.stepIconWrap}>
                        <div className={styles.stepIcon}>
                          <i className={step.icon}></i>
                        </div>
                      </div>
                      <h4 className={styles.stepTitle}>{step.label}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== Client Info ===== */}
            <div className={styles.clientInfo}>
              <div className={styles.infoBox}>
                <div className={styles.infoLabel}>👤 Client</div>
                <div className={styles.infoValue}>{shipping.fullName || '—'}</div>
                <div className={styles.infoSmall}>{shipping.phone || '—'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoLabel}>🏠 Shipping Address</div>
                <div className={styles.infoValue}>{shipping.street || '—'}</div>
                <div className={styles.infoSmall}>
                  {shipping.city || '—'}
                  {shipping.region ? ` — ${shipping.region}` : ''}
                </div>
              </div>
            </div>

            {/* ===== Products ===== */}
            <div className={styles.productsSection}>
              <div className={styles.productsTitle}>
                🛒 Products ({items.reduce((s, i) => s + Number(i.quantity || 1), 0)})
              </div>
              <div className={styles.productsBox}>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.productItem}
                    style={{
                      borderBottom:
                        idx < items.length - 1 ? '1px dashed #dfdfdf' : 'none',
                    }}
                  >
                    <img
                      src={item.image || '/Assets/ShoeStore/tshirt1.png'}
                      alt={item.name}
                      className={styles.productImg}
                    />
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>
                        {item.name || 'Product'}
                      </div>
                      <div className={styles.productMeta}>
                        Qty: {item.quantity || 1}
                        {item.size ? ` • Size: ${item.size}` : ''}
                      </div>
                    </div>
                    <div className={styles.productPrice}>
                      {formatMoney(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Total + Footer ===== */}
            <div className={styles.totalBox}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {formatMoney(order.totalAmount)}
              </span>
            </div>

            <div className={styles.footerRow}>
              <div className={styles.checkboxWrap}>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id={`notify-${orderId}`}
                  defaultChecked
                />
                <label
                  className={styles.checkboxLabel}
                  htmlFor={`notify-${orderId}`}
                >
                  Notify me when order is delivered
                </label>
              </div>
              <button
                className={styles.btnOutlinePrimary}
                onClick={() => {}}
              >
                View Order Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;