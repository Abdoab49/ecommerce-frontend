// src/pages/Orders.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

// ============================================
// ✅ STATUS STEPS — mapping
// ============================================
const STATUS_STEPS = [
  { key: 'pending', label: 'Order confirmed', icon: 'check-circle' },
  { key: 'processing', label: 'Processing order', icon: 'settings' },
  { key: 'quality_check', label: 'Quality check', icon: 'award' },
  { key: 'shipped', label: 'Product dispatched', icon: 'truck' },
  { key: 'delivered', label: 'Product delivered', icon: 'home' },
];

const STATUS_LABELS = {
  pending: 'في الانتظار',
  processing: 'قيد المعالجة',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغى',
};

const formatMoney = (amount) =>
  `${Number(amount || 0).toLocaleString('fr-FR')} DH`;

const formatDate = (date) => {
  if (!date) return '—';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '—';
  return parsedDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// ============================================
// ✅ SVG Icons
// ============================================
const StepIcon = ({ name }) => {
  const icons = {
    'check': (
      <polyline points="20 6 9 17 4 12" />
    ),
    'check-circle': (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    'settings': (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    'award': (
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    ),
    'truck': (
      <>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    'home': (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ============================================
// ✅ Step Component
// ============================================
const Step = ({ step, index, currentStatus, orderStatus }) => {
  // ✅ Determine step state
  const statusOrder = STATUS_STEPS.map(s => s.key);
  const currentIdx = statusOrder.indexOf(orderStatus);
  const stepIdx = index;

  let stepState = '';
  if (orderStatus === 'cancelled') {
    stepState = '';
  } else if (stepIdx < currentIdx) {
    stepState = 'stepCompleted';
  } else if (stepIdx === currentIdx) {
    stepState = 'stepActive';
  }

  return (
    <div className={`${styles.step} ${stepState ? styles[stepState] : ''}`}>
      {stepState === 'stepCompleted' && (
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
};

// ============================================
// ✅ Order Card Component
// ============================================
const OrderCard = ({ order }) => {
  const orderId = String(order._id || order.id || '');
  const status = String(order.status || 'pending').toLowerCase();
  const items = Array.isArray(order.items) ? order.items : [];

  // ✅ Progress percentage
  const statusOrder = STATUS_STEPS.map(s => s.key);
  const currentIdx = statusOrder.indexOf(status);
  const progressPercent = status === 'cancelled'
    ? 0
    : Math.max(0, (currentIdx / (statusOrder.length - 1)) * 100);

  // ✅ Shipping info
  const shipping = order.shippingAddress || {};
  const totalItems = items.reduce((sum, i) => sum + Number(i.quantity || 1), 0);

  return (
    <div className={styles.orderWrapper}>
      {/* ✅ Details */}
      <div className={styles.detailsRow}>
        <div className={styles.detailBox}>
          <span className={styles.detailLabel}>Shipped via:</span>
          <span className={styles.detailValue}>Cash on Delivery</span>
        </div>
        <div className={styles.detailBox}>
          <span className={styles.detailLabel}>Status:</span>
          <span className={styles.detailValue}>
            {STATUS_LABELS[status] || status}
          </span>
        </div>
        <div className={styles.detailBox}>
          <span className={styles.detailLabel}>Order date:</span>
          <span className={styles.detailValue}>{formatDate(order.createdAt)}</span>
        </div>
      </div>

      {/* ✅ Order ID + Total */}
      <div className={styles.orderHeader}>
        <span className={styles.orderId}>
          #{orderId.slice(-6).toUpperCase() || '------'}
        </span>
        <span className={styles.orderTotal}>{formatMoney(order.totalAmount)}</span>
      </div>

      {/* ✅ Steps */}
      <div className={styles.steps}>
        <div className={styles.stepsHeader}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className={styles.stepsBody}>
          {STATUS_STEPS.map((step, index) => (
            <Step
              key={step.key}
              step={step}
              index={index}
              currentStatus={status}
              orderStatus={status}
            />
          ))}
        </div>
      </div>

      {/* ✅ Client info */}
      <div className={styles.clientInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>👤 Client</span>
          <strong className={styles.infoValue}>{shipping.fullName || '—'}</strong>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>📞 Téléphone</span>
          <strong className={styles.infoValue}>{shipping.phone || '—'}</strong>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>🏙️ Ville</span>
          <strong className={styles.infoValue}>
            {shipping.city || '—'}
            {shipping.region ? ` — ${shipping.region}` : ''}
          </strong>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>🏠 Adresse</span>
          <strong className={styles.infoValue}>{shipping.street || '—'}</strong>
        </div>
      </div>

      {/* ✅ Products */}
      <div className={styles.productsSection}>
        <h4 className={styles.productsTitle}>
          🛒 Produits ({totalItems})
        </h4>
        <div className={styles.productsList}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.productItem}>
              <img
                src={item.image || '/Assets/ShoeStore/tshirt1.png'}
                alt={item.name}
                className={styles.productImg}
              />
              <div className={styles.productInfo}>
                <span className={styles.productName}>{item.name || 'Produit'}</span>
                <span className={styles.productMeta}>
                  Qté: {item.quantity || 1}
                  {item.size ? ` • Taille: ${item.size}` : ''}
                </span>
              </div>
              <span className={styles.productPrice}>{formatMoney(item.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// ✅ Main Orders Page
// ============================================
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
        setError('Mochkil f connection. 3awd jrreb.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className={styles.state}>
        <div className={styles.spinner} />
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <div className={styles.stateIcon}>!</div>
        <h2>Mochkil f connection</h2>
        <p>{error}</p>
        <button
          className={styles.primaryButton}
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.state}>
        <div className={styles.stateIcon}>📦</div>
        <h2>Aucune commande</h2>
        <p>Commencez vos achats pour passer votre première commande!</p>
        <button
          className={styles.primaryButton}
          onClick={() => navigate('/')}
        >
          Continuer les achats
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>📋 Mes Commandes ({orders.length})</h1>

        {orders.map((order) => (
          <OrderCard key={order._id || order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;