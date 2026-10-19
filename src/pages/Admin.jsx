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
  // ✅ DOWNLOAD INVOICE
  // ============================================
  const handleDownloadInvoice = (order) => {
    const orderId = String(order._id || order.id || '');
    const items = Array.isArray(order.items) ? order.items : [];
    const shipping = order.shippingAddress || {};
    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();

    const formatDate = (date) => {
      if (!date) return '—';
      const d = new Date(date);
      if (Number.isNaN(d.getTime())) return '—';
      return (
        d.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
        ', ' +
        d.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1),
      0
    );
    const shippingFee = subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;
    const total = Number(order.totalAmount || subtotal + shippingFee);

    const itemsHTML = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${item.name || 'Product'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.size || '—'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity || 1}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${Number(item.price || 0).toFixed(2)} DH</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)} DH</td>
        </tr>
      `
      )
      .join('');

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice #${orderId.slice(-8).toUpperCase()}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Condensed:ital,wght@0,400..700;1,400..700&display=swap');

          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            font-family: 'Libre Caslon Condensed', serif;
            font-optical-sizing: auto;
          }

          body { 
            font-family: 'Libre Caslon Condensed', serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            padding: 40px; 
            color: #000; 
            background: #fff; 
          }

          .logo-section {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
          }

          .logo-img {
            width: 150px;
            height: 150px;
            object-fit: contain;
            margin: 0 auto;
            display: block;
          }

          .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start; 
            border-bottom: 2px solid #000; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }

          .brand { 
            font-size: 22px; 
            font-weight: 700;
            letter-spacing: 0.02em; 
            font-family: 'Libre Caslon Condensed', serif;
          }

          .invoice-label { 
            font-size: 14px; 
            color: #666; 
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
          }

          .invoice-id { 
            font-size: 20px; 
            font-weight: 700;
            font-family: 'Libre Caslon Condensed', serif;
            letter-spacing: 0.02em;
          }

          .section { 
            margin-bottom: 24px; 
          }

          .section h3 { 
            font-size: 13px; 
            color: #666; 
            text-transform: uppercase; 
            letter-spacing: 0.1em; 
            margin-bottom: 10px; 
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 700;
          }

          .section p { 
            font-size: 14px; 
            margin: 4px 0; 
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
          }

          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }

          table th { 
            background: #f3f4f6; 
            padding: 10px; 
            border: 1px solid #ddd; 
            text-align: left; 
            font-size: 13px; 
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 700;
          }

          table td {
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
            font-size: 13px;
          }

          .totals-wrap {
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
          }

          .totals {
            width: 100%;
            max-width: 320px;
          }

          .totals .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 14px;
            font-family: 'Libre Caslon Condensed', serif;
          }

          .totals .totals-row .totals-label {
            color: #666;
          }

          .totals .totals-row .totals-value {
            font-weight: 700;
            color: #000;
          }

          .totals .totals-total {
            display: flex;
            justify-content: space-between;
            padding: 12px 0 0;
            margin-top: 12px;
            border-top: 2px solid #000;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Libre Caslon Condensed', serif;
          }

          .qr-section {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
          }

          .qr-section img {
            width: 130px;
            height: 130px;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 8px;
            background: #fff;
          }

          .qr-text {
            text-align: left;
          }

          .qr-text .qr-label {
            font-size: 13px;
            color: #666;
            margin: 0 0 6px;
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .qr-text .qr-title {
            font-size: 14px;
            color: #000;
            margin: 0 0 4px;
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
          }

          .qr-text .qr-url {
            font-size: 12px;
            color: #999;
            margin: 0;
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
          }

          .qr-text .qr-id {
            font-size: 13px;
            color: #000;
            margin: 8px 0 0;
            font-family: monospace;
            font-weight: 700;
          }

          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            text-align: center; 
            font-size: 12px; 
            color: #999; 
            font-family: 'Libre Caslon Condensed', serif;
            font-weight: 400;
          }

          @media print { 
            body { padding: 20px; } 
          }
        </style>
      </head>
      <body>
        <div class="logo-section">
          <img 
            src="https://www.lanada.shop/Assets/logo1.png" 
            alt="LANADA Logo" 
            class="logo-img"
          />
        </div>

        <div class="header">
          <div>
            <div class="brand">Invoice</div>
            <div class="invoice-label">Order details</div>
          </div>
          <div style="text-align: right;">
            <div class="invoice-id">#${orderId.slice(-8).toUpperCase()}</div>
            <div class="invoice-label" style="margin-top: 6px;">${formatDate(orderDate)}</div>
          </div>
        </div>

        <div class="section">
          <h3>Customer</h3>
          <p><strong>${shipping.fullName || '—'}</strong></p>
          <p>Phone: ${shipping.phone || '—'}</p>
          <p>Address: ${[shipping.street, shipping.city, shipping.region].filter(Boolean).join(', ') || '—'}</p>
        </div>

        <div class="section">
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align:center;">Size</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Price</th>
                <th style="text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsHTML}</tbody>
          </table>
        </div>

        <div class="totals-wrap">
          <div class="totals">
            <div class="totals-row">
              <span class="totals-label">Subtotal:</span>
              <span class="totals-value">${subtotal.toFixed(2)} DH</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Shipping:</span>
              <span class="totals-value">${shippingFee.toFixed(2)} DH</span>
            </div>
            <div class="totals-total">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)} DH</span>
            </div>
          </div>
        </div>

        <div class="qr-section">
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              `https://lanada.shop/orders?tracking=${orderId.slice(-8).toUpperCase()}`
            )}" 
            alt="QR Code — Track Order" 
          />
          <div class="qr-text">
            <p class="qr-label">Scan to track</p>
            <p class="qr-title">Track your order online</p>
            <p class="qr-url">www.lanada.shop/orders</p>
            <p class="qr-id">#${orderId.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div class="footer">
          Thank you for shopping with LANADA — www.lanada.shop
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 2000);
    } else {
      alert('Please allow pop-ups to download the invoice');
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
                src="https://via.placeholder.com/30/27aa80/ffffff?text=A"
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
                          <i className="fas fa-clock" style={{ marginRight: '8px', color: '#f59e0b' }}></i>
                          Pending
                        </td>
                        <td>{stats.pending}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-cog" style={{ marginRight: '8px', color: '#27aa80' }}></i>
                          Processing
                        </td>
                        <td>{stats.processing}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-truck" style={{ marginRight: '8px', color: '#8b5cf6' }}></i>
                          Shipped
                        </td>
                        <td>{stats.shipped}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-check-circle" style={{ marginRight: '8px', color: '#10b981' }}></i>
                          Delivered
                        </td>
                        <td>{stats.delivered}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fas fa-times-circle" style={{ marginRight: '8px', color: '#ef4444' }}></i>
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
                      
                      {/* ✅ Button Download Invoice — Taht mn Confirmer/Annuler */}
                      <button
                        className={`${styles.btn} ${styles.btnInvoice}`}
                        onClick={() => handleDownloadInvoice(order)}
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          width: '100%',         /* ✅ Kayakhod l'espace kamel f sater jdid */
                          marginTop: '10px',     /* ✅ Espace mn lfo9 */
                          marginLeft: 0,         /* ✅ Bla margin yaser */
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <i className="fas fa-file-invoice"></i> Invoice
                      </button>
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