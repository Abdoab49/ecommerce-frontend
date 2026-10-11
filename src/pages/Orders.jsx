// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  `${Number(amount || 0).toLocaleString('fr-FR')} DH`;

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

const StepIcon = ({ name, size = 24 }) => {
  const icons = {
    'check': <polyline points="20 6 9 17 4 12" />,
    'check-circle': (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </>
    ),
    'settings': (
      <>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </>
    ),
    'award': (
      <>
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </>
    ),
    'truck': (
      <>
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </>
    ),
    'home': (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-${name}`}
    >
      {icons[name]}
    </svg>
  );
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
      <div className={`container ${styles.page}`}>
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7280' }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container ${styles.page}`}>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h3>Something went wrong</h3>
          <p style={{ color: '#6b7280' }}>{error}</p>
          <button
            className="btn btn-primary btn-sm"
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
      <div className={`container ${styles.page}`}>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h3>No orders</h3>
          <p style={{ color: '#6b7280' }}>Start shopping to place your first order!</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/')}
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      {orders.map((order) => {
        const orderId = String(order._id || order.id || '');
        const status = String(order.status || 'pending').toLowerCase();
        const items = Array.isArray(order.items) ? order.items : [];
        const shipping = order.shippingAddress || {};

        const currentIdx = STATUS_MAP[status] ?? 0;
        const progressPercent =
          status === 'cancelled'
            ? 0
            : (currentIdx / (STATUS_STEPS.length - 1)) * 100;

        const totalItems = items.reduce(
          (sum, i) => sum + Number(i.quantity || 1),
          0
        );

        return (
          <div key={orderId} style={{ marginBottom: '40px' }}>
            {/* Order Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                Order <span style={{ fontFamily: 'monospace' }}>
                  #{orderId.slice(-6).toUpperCase() || '------'}
                </span>
              </h5>
              <span className="text-dark font-weight-semibold">
                {formatMoney(order.totalAmount)}
              </span>
            </div>

            {/* Details */}
            <div className="row mb-3">
              <div className="col-sm-4 mb-2">
                <div className={`${styles.bgSecondary} p-4 text-dark text-center`}>
                  <span className="font-weight-semibold mr-2">Shipped via:</span>
                  Cash on Delivery
                </div>
              </div>
              <div className="col-sm-4 mb-2">
                <div className={`${styles.bgSecondary} p-4 text-dark text-center`}>
                  <span className="font-weight-semibold mr-2">Status:</span>
                  {STATUS_LABELS[status] || status}
                </div>
              </div>
              <div className="col-sm-4 mb-2">
                <div className={`${styles.bgSecondary} p-4 text-dark text-center`}>
                  <span className="font-weight-semibold mr-2">Expected date:</span>
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className={styles.steps}>
              <div className={styles.stepsHeader}>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
              <div className={styles.stepsBody}>
                {STATUS_STEPS.map((step, index) => {
                  let stepClass = styles.step;
                  if (status !== 'cancelled') {
                    if (index < currentIdx) stepClass += ` ${styles.stepCompleted}`;
                    else if (index === currentIdx) stepClass += ` ${styles.stepActive}`;
                  }

                  return (
                    <div className={stepClass} key={step.key}>
                      {index < currentIdx && status !== 'cancelled' && (
                        <span className={styles.stepIndicator}>
                          <StepIcon name="check" size={14} />
                        </span>
                      )}
                      <span className={styles.stepIcon}>
                        <StepIcon name={step.icon} size={24} />
                      </span>
                      {step.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Client Info */}
            <div className="row mt-3">
              <div className="col-sm-6 mb-2">
                <div className={`${styles.bgSecondary} p-3 text-dark`}>
                  <div className="font-weight-semibold mb-1">👤 Client</div>
                  <div>{shipping.fullName || '—'}</div>
                  <div className="text-muted small">{shipping.phone || '—'}</div>
                </div>
              </div>
              <div className="col-sm-6 mb-2">
                <div className={`${styles.bgSecondary} p-3 text-dark`}>
                  <div className="font-weight-semibold mb-1">🏠 Shipping Address</div>
                  <div>{shipping.street || '—'}</div>
                  <div className="text-muted small">
                    {shipping.city || '—'}
                    {shipping.region ? ` — ${shipping.region}` : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-3">
              <div className="font-weight-semibold mb-2">
                🛒 Products ({totalItems})
              </div>
              <div className={`${styles.bgSecondary} p-3`}>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center mb-2"
                    style={{
                      paddingBottom: idx < items.length - 1 ? '8px' : '0',
                      borderBottom:
                        idx < items.length - 1 ? '1px dashed #dfdfdf' : 'none',
                    }}
                  >
                    <img
                      src={item.image || '/Assets/ShoeStore/tshirt1.png'}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '4px',
                        marginRight: '12px',
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="font-weight-semibold">
                        {item.name || 'Product'}
                      </div>
                      <div className="text-muted small">
                        Qty: {item.quantity || 1}
                        {item.size ? ` • Size: ${item.size}` : ''}
                      </div>
                    </div>
                    <div className="font-weight-semibold">
                      {formatMoney(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="d-sm-flex flex-wrap justify-content-between align-items-center text-center pt-4">
              <div className="custom-control custom-checkbox mt-2 mr-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  id={`notify-me-${orderId}`}
                  defaultChecked
                />
                <label
                  className="custom-control-label"
                  htmlFor={`notify-me-${orderId}`}
                >
                  Notify me when order is delivered
                </label>
              </div>
              <a
                className="btn btn-primary btn-sm mt-2"
                href={`#order-${orderId}`}
              >
                View Order Details
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;