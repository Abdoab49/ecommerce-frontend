// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

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
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7280' }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
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
      <div className={styles.container}>
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
    <div className={styles.container}>
      {orders.map((order) => {
        const orderId = String(order._id || order.id || '');
        const status = String(order.status || 'pending').toLowerCase();

        // ✅ Status → index
        const statusMap = {
          pending: 0,
          processing: 1,
          shipped: 2,
          delivered: 3,
        };
        const currentIdx = statusMap[status] ?? 0;

        // ✅ Progress %
        const progressPercent =
          status === 'cancelled' ? 0 : (currentIdx / 3) * 100;

        // ✅ Status labels
        const statusLabels = {
          pending: 'Pending',
          processing: 'Processing',
          shipped: 'Shipped',
          delivered: 'Delivered',
          cancelled: 'Cancelled',
        };

        // ✅ Date
        const dateStr = order.createdAt
          ? new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'June 17, 2019';

        return (
          <div key={orderId} style={{ marginBottom: '40px' }}>
            {/* ===== Details ===== */}
            <div className="row mb-3">
              <div className="col-sm-4 mb-2">
                <div className={styles.bgSecondary + ' p-4 text-dark text-center'}>
                  <span className="font-weight-semibold mr-2">Shipped via:</span>
                  Cash on Delivery
                </div>
              </div>
              <div className="col-sm-4 mb-2">
                <div className={styles.bgSecondary + ' p-4 text-dark text-center'}>
                  <span className="font-weight-semibold mr-2">Status:</span>
                  {statusLabels[status] || status}
                </div>
              </div>
              <div className="col-sm-4 mb-2">
                <div className={styles.bgSecondary + ' p-4 text-dark text-center'}>
                  <span className="font-weight-semibold mr-2">Expected date:</span>
                  {dateStr}
                </div>
              </div>
            </div>

            {/* ===== Progress ===== */}
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
                  ></div>
                </div>
              </div>
              <div className={styles.stepsBody}>
                {/* Step 1 */}
                <div
                  className={`${styles.step} ${
                    currentIdx >= 0 && status !== 'cancelled'
                      ? currentIdx > 0
                        ? styles.stepCompleted
                        : styles.stepActive
                      : ''
                  }`}
                >
                  {currentIdx > 0 && status !== 'cancelled' && (
                    <span className={styles.stepIndicator}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                  <span className={styles.stepIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </span>
                  Order confirmed
                </div>

                {/* Step 2 */}
                <div
                  className={`${styles.step} ${
                    currentIdx >= 1 && status !== 'cancelled'
                      ? currentIdx > 1
                        ? styles.stepCompleted
                        : styles.stepActive
                      : ''
                  }`}
                >
                  {currentIdx > 1 && status !== 'cancelled' && (
                    <span className={styles.stepIndicator}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                  <span className={styles.stepIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </span>
                  Processing order
                </div>

                {/* Step 3 */}
                <div
                  className={`${styles.step} ${
                    currentIdx >= 2 && status !== 'cancelled'
                      ? currentIdx > 2
                        ? styles.stepCompleted
                        : styles.stepActive
                      : ''
                  }`}
                >
                  {currentIdx > 2 && status !== 'cancelled' && (
                    <span className={styles.stepIndicator}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                  <span className={styles.stepIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-award">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </span>
                  Quality check
                </div>

                {/* Step 4 */}
                <div
                  className={`${styles.step} ${
                    currentIdx >= 3 && status !== 'cancelled'
                      ? currentIdx > 3
                        ? styles.stepCompleted
                        : styles.stepActive
                      : ''
                  }`}
                >
                  {currentIdx > 3 && status !== 'cancelled' && (
                    <span className={styles.stepIndicator}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                  <span className={styles.stepIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </span>
                  Product dispatched
                </div>

                {/* Step 5 */}
                <div
                  className={`${styles.step} ${
                    currentIdx >= 3 && status !== 'cancelled'
                      ? styles.stepCompleted
                      : ''
                  }`}
                >
                  <span className={styles.stepIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </span>
                  Product delivered
                </div>
              </div>
            </div>

            {/* ===== Footer ===== */}
            <div className="d-sm-flex flex-wrap justify-content-between align-items-center text-center pt-4">
              <div className="custom-control custom-checkbox mt-2 mr-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  id={`notify-${orderId}`}
                  defaultChecked
                />
                <label
                  className="custom-control-label"
                  htmlFor={`notify-${orderId}`}
                >
                  Notify me when order is delivered
                </label>
              </div>
              <button className="btn btn-primary btn-sm mt-2">
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