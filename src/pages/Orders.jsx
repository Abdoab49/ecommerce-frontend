// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order confirmed', icon: 'check-circle' },
  { key: 'processing', label: 'Processing order', icon: 'settings' },
  { key: 'quality_check', label: 'Quality check', icon: 'award' },
  { key: 'shipped', label: 'Product dispatched', icon: 'truck' },
  { key: 'delivered', label: 'Product delivered', icon: 'home' },
];

const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  quality_check: 'Quality check',
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
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// ============================================
// ✅ SVG Icons — kifma design
// ============================================
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconAward = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-award">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const StepIcon = ({ name }) => {
  const icons = {
    'check': <IconCheck />,
    'check-circle': <IconCheckCircle />,
    'settings': <IconSettings />,
    'award': <IconAward />,
    'truck': <IconTruck />,
    'home': <IconHome />,
  };
  return icons[name] || null;
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
            className={styles.btnPrimary}
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
            className={styles.btnPrimary}
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

        // ✅ Progress bar width
        const progressPercent =
          status === 'cancelled'
            ? 0
            : (currentIdx / (STATUS_STEPS.length - 1)) * 100;

        const totalItems = items.reduce(
          (sum, i) => sum + Number(i.quantity || 1),
          0
        );

        return (
          <div key={orderId}>
            {/* ===== Details ===== */}
            <div className={styles.detailsRow}>
              <div className={styles.detailCol}>
                <div className={styles.detailBox}>
                  <span className={styles.detailLabel}>Shipped via:</span>
                  Cash on Delivery
                </div>
              </div>
              <div className={styles.detailCol}>
                <div className={styles.detailBox}>
                  <span className={styles.detailLabel}>Status:</span>
                  {STATUS_LABELS[status] || status}
                </div>
              </div>
              <div className={styles.detailCol}>
                <div className={styles.detailBox}>
                  <span className={styles.detailLabel}>Expected date:</span>
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </div>

            {/* ===== Progress ===== */}
            <div className={styles.steps}>
              <div className={styles.stepsHeader}>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className={styles.stepsBody}>
                {STATUS_STEPS.map((step, index) => {
                  let stepClass = styles.step;
                  if (status !== 'cancelled') {
                    if (index < currentIdx) {
                      stepClass += ` ${styles.stepCompleted}`;
                    } else if (index === currentIdx) {
                      stepClass += ` ${styles.stepActive}`;
                    }
                  }

                  return (
                    <div className={stepClass} key={step.key}>
                      {index < currentIdx && status !== 'cancelled' && (
                        <span className={styles.stepIndicator}>
                          <StepIcon name="check" />
                        </span>
                      )}
                      <span className={styles.stepIcon}>
                        <StepIcon name={step.icon} />
                      </span>
                      {step.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== Order Info ===== */}
            <div className={styles.orderInfo}>
              <div className={styles.orderInfoRow}>
                <span className={styles.orderInfoLabel}>Order ID:</span>
                <span className={styles.orderInfoValue}>
                  #{orderId.slice(-10).toUpperCase() || '------'}
                </span>
              </div>
              <div className={styles.orderInfoRow}>
                <span className={styles.orderInfoLabel}>Client:</span>
                <span className={styles.orderInfoValue}>
                  {shipping.fullName || '—'}
                </span>
              </div>
              <div className={styles.orderInfoRow}>
                <span className={styles.orderInfoLabel}>Phone:</span>
                <span className={styles.orderInfoValue}>
                  {shipping.phone || '—'}
                </span>
              </div>
              <div className={styles.orderInfoRow}>
                <span className={styles.orderInfoLabel}>Address:</span>
                <span className={styles.orderInfoValue}>
                  {shipping.street || '—'}
                  {shipping.city ? `, ${shipping.city}` : ''}
                  {shipping.region ? `, ${shipping.region}` : ''}
                </span>
              </div>
            </div>

            {/* ===== Products ===== */}
            <div className={styles.productsSection}>
              <div className={styles.productsTitle}>
                Products ({totalItems})
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

            {/* ===== Total ===== */}
            <div className={styles.totalBox}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {formatMoney(order.totalAmount)}
              </span>
            </div>

            {/* ===== Footer ===== */}
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
                className={styles.btnPrimary}
                onClick={() => {}}
              >
                View Order Details
              </button>
            </div>

            <div style={{ height: '40px' }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;