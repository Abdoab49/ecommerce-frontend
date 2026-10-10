// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // ✅ Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        setPassword('');
      } else {
        setError(data.message || 'Password ghalat');
      }
    } catch (err) {
      setError('Mochkil f connection');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
    setOrders([]);
    navigate('/');
  };

  // ✅ Fetch koul orders
  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://backend-3lyx.onrender.com/api/admin/orders?token=${token}`
        );

        if (!response.ok) {
          if (response.status === 401) {
            setToken('');
            localStorage.removeItem('admin_token');
            throw new Error('Token expired');
          }
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // ✅ Bdel status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://backend-3lyx.onrender.com/api/admin/orders/${orderId}/status?token=${token}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('❌ Mochkil f update');
    }
  };

  // ✅ Filtre
  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  // ===== LOGIN PAGE =====
  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h1>Admin Login</h1>
          <p>Dkhel password dyalek</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-password-input"
              autoFocus
            />
            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {error && <p className="admin-error">{error}</p>}
        </div>
      </div>
    );
  }

  // ===== ADMIN DASHBOARD =====
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>🔐 Admin — Koul Orders</h1>
        <div className="admin-header-actions">
          <span className="admin-total">{orders.length} orders</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="admin-filters">
        <button
          className={`admin-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tous ({orders.length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          ⏳ En attente ({orders.filter(o => o.status === 'pending').length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'processing' ? 'active' : ''}`}
          onClick={() => setFilter('processing')}
        >
          ⚙️ En cours ({orders.filter(o => o.status === 'processing').length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'shipped' ? 'active' : ''}`}
          onClick={() => setFilter('shipped')}
        >
          🚚 Expédiées ({orders.filter(o => o.status === 'shipped').length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilter('delivered')}
        >
          ✅ Livrées ({orders.filter(o => o.status === 'delivered').length})
        </button>
        <button
          className={`admin-filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          ❌ Annulées ({orders.filter(o => o.status === 'cancelled').length})
        </button>
      </div>

      {loading && <div className="admin-loading">Chargement...</div>}

      {error && <div className="admin-error-msg">{error}</div>}

      {filteredOrders.length === 0 && !loading && (
        <div className="admin-empty">Ma kaynch orders</div>
      )}

      <div className="admin-orders-list">
        {filteredOrders.map((order) => (
          <div key={order._id} className={`admin-order-card status-${order.status}`}>

            <div className="admin-order-header">
              <span className="admin-order-id">
                #{(order._id || '').slice(-6).toUpperCase()}
              </span>
              <span className={`admin-order-status status-${order.status}`}>
                {order.status === 'pending' && '⏳ En attente'}
                {order.status === 'processing' && '⚙️ En cours'}
                {order.status === 'shipped' && '🚚 Expédiée'}
                {order.status === 'delivered' && '✅ Livrée'}
                {order.status === 'cancelled' && '❌ Annulée'}
              </span>
              <span className="admin-order-date">
                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="admin-order-client">
              <h3>👤 Client</h3>
              <p><strong>{order.shippingAddress?.fullName || '-'}</strong></p>
              <p>📞 {order.shippingAddress?.phone || '-'}</p>
              <p>🏙️ {order.shippingAddress?.city || '-'} — {order.shippingAddress?.region || '-'}</p>
              <p>🏠 {order.shippingAddress?.street || '-'}</p>
              <p className="admin-user-id">🆔 {order.userId || '-'}</p>
            </div>

            <div className="admin-order-items">
              <h3>🛒 Produits ({order.items?.length || 0})</h3>
              {order.items?.map((item, i) => (
                <div key={i} className="admin-order-item">
                  <img src={item.image || '/Assets/ShoeStore/tshirt1.png'} alt={item.name} />
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Qté: {item.quantity} • Taille: {item.size || 'M'}</p>
                  </div>
                  <span>{item.price} DH</span>
                </div>
              ))}
            </div>

            <div className="admin-order-total">
              <span>Total</span>
              <strong>{order.totalAmount || 0} DH</strong>
            </div>

            {/* ✅ BUTTONS — Admin actions */}
            <div className="admin-order-actions">
              {order.status === 'pending' && (
                <>
                  <button
                    className="admin-btn admin-btn-confirm"
                    onClick={() => updateStatus(order._id, 'processing')}
                  >
                    ✅ Confirmer
                  </button>
                  <button
                    className="admin-btn admin-btn-reject"
                    onClick={() => updateStatus(order._id, 'cancelled')}
                  >
                    ❌ Annuler
                  </button>
                </>
              )}

              {order.status === 'processing' && (
                <button
                  className="admin-btn admin-btn-ship"
                  onClick={() => updateStatus(order._id, 'shipped')}
                >
                  🚚 Expédier
                </button>
              )}

              {order.status === 'shipped' && (
                <button
                  className="admin-btn admin-btn-deliver"
                  onClick={() => updateStatus(order._id, 'delivered')}
                >
                  ✅ Marquer livrée
                </button>
              )}

              {order.status === 'delivered' && (
                <span className="admin-done">✅ Terminée</span>
              )}

              {order.status === 'cancelled' && (
                <span className="admin-cancelled">❌ Annulée</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;