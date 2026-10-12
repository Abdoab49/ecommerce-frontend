// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

const Admin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  // ============================================
  // ✅ LOGIN
  // ============================================
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

  // ============================================
  // ✅ LOGOUT
  // ============================================
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
    setOrders([]);
    navigate('/');
  };

  // ============================================
  // ✅ FETCH ORDERS
  // ============================================
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

  // ============================================
  // ✅ UPDATE STATUS
  // ============================================
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
      alert('Mochkil f update');
    }
  };

  // ============================================
  // ✅ FILTER
  // ============================================
  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  // ============================================
  // ✅ STATS
  // ============================================
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0),
  };

  // ============================================
  // ✅ LOGIN PAGE
  // ============================================
  if (!token) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>
            <i className="fas fa-lock"></i>
          </div>
          <h1>Admin Login</h1>
          <p>Dkhel password dyalek</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
              autoFocus
            />
            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {error && <p className={styles.errorMsg}>{error}</p>}
        </div>
      </div>
    );
  }

  // ============================================
  // ✅ ADMIN DASHBOARD
  // ============================================
  return (
    <div className={`${styles.dashboardWrapper} ${sidebarCollapsed ? styles.sidebarCollapsed : ''} ${mobileSidebarOpen ? styles.sidebarToggled : ''}`}>

      {/* ===== SIDEBAR ===== */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button
            className={styles.toggleSidebar}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <ul className={styles.sidebarNav}>
          <li>
            <a
              href="#"
              className={activePage === 'dashboard' ? styles.active : ''}
              onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); setMobileSidebarOpen(false); }}
            >
              <i className="fas fa-home"></i> Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activePage === 'orders' ? styles.active : ''}
              onClick={(e) => { e.preventDefault(); setActivePage('orders'); setMobileSidebarOpen(false); }}
            >
              <i className="fas fa-shopping-cart"></i> Orders
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className={styles.mainContent}>
        {/* ===== TOPBAR ===== */}
        <nav className={styles.mainNavbar}>
          <button
            className={styles.mobileSidebarToggle}
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <a className={styles.navbarBrand} href="#">
            {activePage === 'dashboard' ? 'Dashboard Overview' : 'Orders Management'}
          </a>
          <div className={styles.navbarRight}>
            <div className={styles.navbarUser}>
              <img
                src="https://via.placeholder.com/30/1a1a1a/ffffff?text=A"
                className={styles.avatar}
                alt="Admin"
              />
              <span>Admin</span>
            </div>
            <button className={styles.logoutBtnTop} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* ===== CONTENT ===== */}
        <div className={styles.dashboardPages}>

          {/* ===== DASHBOARD PAGE ===== */}
          {activePage === 'dashboard' && (
            <div className={styles.dashboardPage}>
              <h1 className={styles.pageTitle}>Welcome to the Admin Dashboard</h1>

              <div className={styles.statsGrid}>
                <div className={styles.statCardWrapper}>
                  <div className={`${styles.statCard} ${styles.bgPrimary}`}>
                    <div className={styles.statCardBody}>
                      <div className={styles.statCardTop}>
                        <h2>Total Orders</h2>
                        <i className="fas fa-shopping-cart fa-3x"></i>
                      </div>
                      <p className={styles.statCardValue}>{stats.total}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.statCardWrapper}>
                  <div className={`${styles.statCard} ${styles.bgSuccess}`}>
                    <div className={styles.statCardBody}>
                      <div className={styles.statCardTop}>
                        <h2>Delivered</h2>
                        <i className="fas fa-check-circle fa-3x"></i>
                      </div>
                      <p className={styles.statCardValue}>{stats.delivered}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.statCardWrapper}>
                  <div className={`${styles.statCard} ${styles.bgInfo}`}>
                    <div className={styles.statCardBody}>
                      <div className={styles.statCardTop}>
                        <h2>Pending</h2>
                        <i className="fas fa-clock fa-3x"></i>
                      </div>
                      <p className={styles.statCardValue}>{stats.pending}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.statCardWrapper}>
                  <div className={`${styles.statCard} ${styles.bgWarning}`}>
                    <div className={styles.statCardBody}>
                      <div className={styles.statCardTop}>
                        <h2>Revenue</h2>
                        <i className="fas fa-dollar-sign fa-3x"></i>
                      </div>
                      <p className={styles.statCardValue}>{stats.revenue.toFixed(0)} DH</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== STATS TABLE ===== */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  Orders by Status
                </div>
                <div className={styles.cardBody}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fas fa-clock" style={{ marginRight: '8px' }}></i>
                          Pending
                        </td>
                        <td>{stats.pending}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
                          Processing
                        </td>
                        <td>{stats.processing}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-truck" style={{ marginRight: '8px' }}></i>
                          Shipped
                        </td>
                        <td>{stats.shipped}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                          Delivered
                        </td>
                        <td>{stats.delivered}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-times-circle" style={{ marginRight: '8px' }}></i>
                          Cancelled
                        </td>
                        <td>{stats.cancelled}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== ORDERS PAGE ===== */}
          {activePage === 'orders' && (
            <div className={styles.dashboardPage}>
              <h1 className={styles.pageTitle}>Orders Management</h1>

              {/* Filters */}
              <div className={styles.filters}>
                <button
                  className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                  onClick={() => setFilter('all')}
                >
                  <i className="fas fa-list"></i>
                  Tous ({orders.length})
                </button>
                <button
                  className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  <i className="fas fa-clock"></i>
                  En attente ({stats.pending})
                </button>
                <button
                  className={`${styles.filterBtn} ${filter === 'processing' ? styles.active : ''}`}
                  onClick={() => setFilter('processing')}
                >
                  <i className="fas fa-cog"></i>
                  En cours ({stats.processing})
                </button>
                <button
                  className={`${styles.filterBtn} ${filter === 'shipped' ? styles.active : ''}`}
                  onClick={() => setFilter('shipped')}
                >
                  <i className="fas fa-truck"></i>
                  Expédiées ({stats.shipped})
                </button>
                <button
                  className={`${styles.filterBtn} ${filter === 'delivered' ? styles.active : ''}`}
                  onClick={() => setFilter('delivered')}
                >
                  <i className="fas fa-check-circle"></i>
                  Livrées ({stats.delivered})
                </button>
                <button
                  className={`${styles.filterBtn} ${filter === 'cancelled' ? styles.active : ''}`}
                  onClick={() => setFilter('cancelled')}
                >
                  <i className="fas fa-times-circle"></i>
                  Annulées ({stats.cancelled})
                </button>
              </div>

              {loading && <div className={styles.adminLoading}>Chargement...</div>}

              {error && <div className={styles.adminErrorMsg}>{error}</div>}

              {filteredOrders.length === 0 && !loading && (
                <div className={styles.adminEmpty}>Ma kaynch orders</div>
              )}

              {/* Orders List */}
              <div className={styles.ordersList}>
                {filteredOrders.map((order) => (
                  <div key={order._id} className={`${styles.orderCard} ${styles[`status_${order.status}`]}`}>

                    <div className={styles.orderHeader}>
                      <span className={styles.orderId}>
                        #{(order._id || '').slice(-6).toUpperCase()}
                      </span>
                      <span className={`${styles.orderStatus} ${styles[`status_${order.status}`]}`}>
                        {order.status === 'pending' && (
                          <>
                            <i className="fas fa-clock"></i> En attente
                          </>
                        )}
                        {order.status === 'processing' && (
                          <>
                            <i className="fas fa-cog"></i> En cours
                          </>
                        )}
                        {order.status === 'shipped' && (
                          <>
                            <i className="fas fa-truck"></i> Expédiée
                          </>
                        )}
                        {order.status === 'delivered' && (
                          <>
                            <i className="fas fa-check-circle"></i> Livrée
                          </>
                        )}
                        {order.status === 'cancelled' && (
                          <>
                            <i className="fas fa-times-circle"></i> Annulée
                          </>
                        )}
                      </span>
                      <span className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    <div className={styles.orderClient}>
                      <h3>
                        <i className="fas fa-user"></i> Client
                      </h3>
                      <p><strong>{order.shippingAddress?.fullName || '-'}</strong></p>
                      <p>
                        <i className="fas fa-phone"></i>{' '}
                        {order.shippingAddress?.phone || '-'}
                      </p>
                      <p>
                        <i className="fas fa-city"></i>{' '}
                        {order.shippingAddress?.city || '-'} — {order.shippingAddress?.region || '-'}
                      </p>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {order.shippingAddress?.street || '-'}
                      </p>
                      <p className={styles.userId}>
                        <i className="fas fa-id-badge"></i> {order.userId || '-'}
                      </p>
                    </div>

                    <div className={styles.orderItems}>
                      <h3>
                        <i className="fas fa-shopping-bag"></i> Produits ({order.items?.length || 0})
                      </h3>
                      {order.items?.map((item, i) => (
                        <div key={i} className={styles.orderItem}>
                          <img src={item.image || '/Assets/ShoeStore/tshirt1.png'} alt={item.name} />
                          <div>
                            <p><strong>{item.name}</strong></p>
                            <p>Qté: {item.quantity} • Taille: {item.size || 'M'}</p>
                          </div>
                          <span>{item.price} DH</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderTotal}>
                      <span>Total</span>
                      <strong>{order.totalAmount || 0} DH</strong>
                    </div>

                    {/* Actions */}
                    <div className={styles.orderActions}>
                      {order.status === 'pending' && (
                        <>
                          <button
                            className={`${styles.btn} ${styles.btnConfirm}`}
                            onClick={() => updateStatus(order._id, 'processing')}
                          >
                            <i className="fas fa-check"></i>
                            Confirmer
                          </button>
                          <button
                            className={`${styles.btn} ${styles.btnReject}`}
                            onClick={() => updateStatus(order._id, 'cancelled')}
                          >
                            <i className="fas fa-times"></i>
                            Annuler
                          </button>
                        </>
                      )}

                      {order.status === 'processing' && (
                        <button
                          className={`${styles.btn} ${styles.btnShip}`}
                          onClick={() => updateStatus(order._id, 'shipped')}
                        >
                          <i className="fas fa-truck"></i>
                          Expédier
                        </button>
                      )}

                      {order.status === 'shipped' && (
                        <button
                          className={`${styles.btn} ${styles.btnDeliver}`}
                          onClick={() => updateStatus(order._id, 'delivered')}
                        >
                          <i className="fas fa-check-circle"></i>
                          Marquer livrée
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <span className={styles.done}>
                          <i className="fas fa-check-circle"></i> Terminée
                        </span>
                      )}

                      {order.status === 'cancelled' && (
                        <span className={styles.cancelled}>
                          <i className="fas fa-times-circle"></i> Annulée
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;