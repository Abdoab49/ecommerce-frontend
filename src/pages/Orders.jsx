import React, {
  useEffect,
  useMemo,
  useState,
  useLayoutEffect
} from 'react';

import { useNavigate } from 'react-router-dom';

import Icon from '@mdi/react';

import {
  mdiArrowLeft,
  mdiMagnify,
  mdiDotsVertical,
  mdiPackageVariantClosed,
  mdiTruckFast,
  mdiCheckCircle,
  mdiHomeOutline,
  mdiMapMarker,
  mdiReceiptTextOutline,
  mdiRefresh,
  mdiMapOutline,
} from '@mdi/js';

const API_URL = 'https://backend-3lyx.onrender.com/api/orders';

// =========================================
// ORDER STATUS
// =========================================

const STATUS_STEPS = [
  {
    key: 'pending',
    label: 'Order placed',
    icon: mdiCheckCircle
  },
  {
    key: 'processing',
    label: 'Processing',
    icon: mdiPackageVariantClosed
  },
  {
    key: 'shipped',
    label: 'Out for delivery',
    icon: mdiTruckFast
  },
  {
    key: 'delivered',
    label: 'Delivered',
    icon: mdiHomeOutline
  },
];

// =========================================
// FILTERS
// =========================================

const FILTERS = [
  { key: 'all', label: 'All Orders' },
  { key: 'transit', label: 'In Transit' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'return', label: 'Return' },
  { key: 'cancelled', label: 'Cancelled' },
];

// =========================================
// HELPERS
// =========================================

const money = (value) =>
  `${Number(value || 0).toFixed(2)} DH`;

const getOrderId = (order) =>
  String(order._id || order.id || '');

const getStatus = (order) =>
  String(order.status || 'pending').toLowerCase();

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'In Transit',
    delivered: 'Success',
    cancelled: 'Cancelled',
    returned: 'Returned',
    return: 'Return',
  };

  return labels[status] || status;
};

const getStatusClass = (status) => {
  if (status === 'delivered') return 'success';
  if (status === 'shipped') return 'transit';
  if (status === 'cancelled') return 'cancelled';

  if (
    status === 'returned' ||
    status === 'return'
  ) {
    return 'returned';
  }

  return 'pending';
};

const formatDate = (date) => {
  if (!date) return '—';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return '—';

  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getItems = (order) =>
  Array.isArray(order.items) ? order.items : [];

const getSubtotal = (order) =>
  getItems(order).reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

const getTotal = (order) => {
  const subtotal = getSubtotal(order);

  const shippingFee =
    subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;

  return Number(
    order.totalAmount || subtotal + shippingFee
  );
};

const getImage = (item) =>
  item.image || '/Assets/ShoeStore/tshirt1.png';

// =========================================
// ICON BUTTON
// =========================================

const IconButton = ({
  path,
  label,
  onClick,
  className = ''
}) => (
  <button
    type="button"
    className={`orders-icon-button ${className}`}
    aria-label={label}
    title={label}
    onClick={onClick}
  >
    <Icon path={path} size={0.85} />
  </button>
);

// =========================================
// ORDERS COMPONENT
// =========================================

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState('');

  // =========================================
  // SCROLL TO TOP WHEN OPENING TRACK ORDER
  // OR RETURNING TO ORDERS LIST
  // =========================================

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Main application scroll container
      const appContent = document.querySelector('.app-content');

      if (appContent) {
        appContent.scrollTop = 0;
        appContent.scrollTo(0, 0);
      }

      // Orders page container
      const ordersPage = document.querySelector('.lanada-orders');

      if (ordersPage) {
        ordersPage.scrollTop = 0;
      }
    };

    scrollToTop();

    const frame = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [selectedOrder]);

  // =========================================
  // BODY BACKGROUND
  // =========================================

  useEffect(() => {
    const previousBackground = document.body.style.background;
    const previousColor = document.body.style.backgroundColor;

    document.body.style.background = '#e9e5e1';
    document.body.style.backgroundColor = '#e9e5e1';

    document.body.classList.add('orders-active');

    return () => {
      document.body.style.background = previousBackground;
      document.body.style.backgroundColor = previousColor;

      document.body.classList.remove('orders-active');
    };
  }, []);

  // =========================================
  // FETCH ORDERS
  // =========================================

  const fetchOrders = async () => {
    const userId = localStorage.getItem('lanada_user_id');

    if (!userId) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}?userId=${encodeURIComponent(userId)}`
      );

      if (!response.ok) {
        throw new Error('Unable to load your orders.');
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Orders error:', err);

      setError(
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================================
  // FILTER ORDERS
  // =========================================

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeFilter === 'transit') {
      result = result.filter(
        (order) => getStatus(order) === 'shipped'
      );
    } else if (activeFilter === 'shipping') {
      result = result.filter((order) =>
        ['pending', 'processing'].includes(
          getStatus(order)
        )
      );
    } else if (activeFilter === 'return') {
      result = result.filter((order) =>
        ['return', 'returned'].includes(
          getStatus(order)
        )
      );
    } else if (activeFilter === 'cancelled') {
      result = result.filter(
        (order) => getStatus(order) === 'cancelled'
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();

      result = result.filter((order) => {
        const id = getOrderId(order).toLowerCase();

        const names = getItems(order)
          .map((item) => item.name || '')
          .join(' ')
          .toLowerCase();

        return (
          id.includes(term) ||
          names.includes(term)
        );
      });
    }

    return result.sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );
  }, [orders, activeFilter, search]);

  // =========================================
  // FILTER COUNTS
  // =========================================

  const getFilterCount = (filter) => {
    if (filter === 'all') {
      return orders.length;
    }

    if (filter === 'transit') {
      return orders.filter(
        (order) => getStatus(order) === 'shipped'
      ).length;
    }

    if (filter === 'shipping') {
      return orders.filter((order) =>
        ['pending', 'processing'].includes(
          getStatus(order)
        )
      ).length;
    }

    if (filter === 'return') {
      return orders.filter((order) =>
        ['return', 'returned'].includes(
          getStatus(order)
        )
      ).length;
    }

    if (filter === 'cancelled') {
      return orders.filter(
        (order) => getStatus(order) === 'cancelled'
      ).length;
    }

    return 0;
  };

  // =========================================
  // DOWNLOAD INVOICE
  // =========================================

  const handleDownloadInvoice = (order) => {
    const orderId = getOrderId(order);
    const items = getItems(order);
    const shipping = order.shippingAddress || {};

    const subtotal = getSubtotal(order);

    const shippingFee =
      subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;

    const total = getTotal(order);

    const safe = (value) =>
      String(value ?? '—').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[char]));

    const itemsHTML = items.map((item) => `
      <tr>
        <td>${safe(item.name || 'Product')}</td>
        <td>${safe(item.size || '—')}</td>
        <td>${Number(item.quantity || 1)}</td>
        <td>${money(item.price)}</td>
        <td>${money(
          Number(item.price || 0) *
          Number(item.quantity || 1)
        )}</td>
      </tr>
    `).join('');

    const shortId = orderId.slice(-8).toUpperCase();

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>LANADA Invoice #${shortId}</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            color: #222;
            padding: 35px;
            max-width: 900px;
            margin: auto;
          }

          .logo {
            display: block;
            width: 120px;
            height: 100px;
            object-fit: contain;
            margin: 0 auto 25px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #222;
            padding-bottom: 20px;
          }

          h1 {
            font-size: 26px;
            margin: 0 0 8px;
          }

          .muted {
            color: #777;
            font-size: 13px;
          }

          .section {
            margin-top: 28px;
          }

          h3 {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #777;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            font-size: 13px;
          }

          th {
            background: #f4f1ed;
          }

          .totals {
            width: 300px;
            margin: 25px 0 0 auto;
          }

          .row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }

          .grand {
            border-top: 2px solid #222;
            font-size: 20px;
            font-weight: bold;
            padding-top: 14px;
          }

          .footer {
            margin-top: 45px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #888;
            font-size: 12px;
          }

          @media print {
            body {
              padding: 15px;
            }
          }
        </style>
      </head>

      <body>

        <img
          class="logo"
          src="https://www.lanada.shop/Assets/logo1.png"
          alt="LANADA"
        />

        <div class="header">

          <div>
            <h1>Order Invoice</h1>

            <div class="muted">
              Thank you for shopping with LANADA
            </div>
          </div>

          <div style="text-align:right">

            <strong>#${shortId}</strong>

            <p class="muted">
              ${safe(formatDate(order.createdAt))}
            </p>

          </div>

        </div>

        <div class="section">

          <h3>Customer details</h3>

          <p>
            <strong>${safe(shipping.fullName)}</strong>
          </p>

          <p>${safe(shipping.phone)}</p>

          <p>
            ${safe([
              shipping.street,
              shipping.city,
              shipping.region
            ].filter(Boolean).join(', '))}
          </p>

        </div>

        <div class="section">

          <h3>Products</h3>

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              ${itemsHTML}
            </tbody>

          </table>

        </div>

        <div class="totals">

          <div class="row">
            <span>Subtotal</span>
            <strong>${money(subtotal)}</strong>
          </div>

          <div class="row">
            <span>Shipping</span>
            <strong>${money(shippingFee)}</strong>
          </div>

          <div class="row grand">
            <span>Total</span>
            <span>${money(total)}</span>
          </div>

        </div>

        <div class="footer">
          LANADA — www.lanada.shop
        </div>

      </body>
      </html>
    `;

    const printWindow = window.open(
      '',
      '_blank',
      'width=850,height=900'
    );

    if (!printWindow) {
      alert('Please allow pop-ups to print your invoice.');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  // =========================================
  // STATUS BADGE
  // =========================================

  const renderStatus = (status) => (
    <span className={`orders-status ${getStatusClass(status)}`}>
      {getStatusLabel(status)}
    </span>
  );

  // =========================================
  // ORDER CARD
  // =========================================

  const renderOrderCard = (order) => {
    const orderId = getOrderId(order);
    const status = getStatus(order);
    const items = getItems(order);

    const firstItem = items[0] || {};

    const count = items.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 1),
      0
    );

    return (
      <article
        className="orders-card"
        key={orderId}
      >

        <div className="orders-product-image">

          <img
            src={getImage(firstItem)}
            alt={firstItem.name || 'Product'}
            onError={(event) => {
              event.currentTarget.src =
                '/Assets/ShoeStore/tshirt1.png';
            }}
          />

        </div>

        <div className="orders-card-info">

          <div className="orders-card-heading">

            <h3>
              {firstItem.name || 'Your order'}
            </h3>

            {renderStatus(status)}

          </div>

          <p className="orders-price">
            {money(firstItem.price)}
          </p>

          <div className="orders-card-meta">

            <span>
              Total {count} {count === 1 ? 'product' : 'products'}:
            </span>

            <strong>
              {money(getTotal(order))}
            </strong>

          </div>

          <div className="orders-card-actions">

            {status !== 'cancelled' && (
              <button
                className="orders-track-button"
                onClick={() => setSelectedOrder(order)}
              >
                Track Order
              </button>
            )}

            {status === 'delivered' && (
              <button
                className="orders-secondary-button"
                onClick={() => navigate('/')}
              >
                Buy Again
              </button>
            )}

            {status === 'cancelled' && (
              <button
                className="orders-secondary-button"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            )}

          </div>

          <div className="orders-card-date">
            Order #{orderId.slice(-8).toUpperCase()}
            {' '}·{' '}
            {formatDate(order.createdAt)}
          </div>

        </div>

        <button
          type="button"
          className="orders-invoice-small"
          onClick={() => handleDownloadInvoice(order)}
          title="Download invoice"
          aria-label="Download invoice"
        >
          <Icon
            path={mdiReceiptTextOutline}
            size={0.9}
          />
        </button>

      </article>
    );
  };

  // =========================================
  // TRACKING PAGE
  // =========================================

  const renderTracking = (order) => {
    const orderId = getOrderId(order);
    const status = getStatus(order);
    const currentStep = STATUS_STEPS.findIndex(
      (step) => step.key === status
    );

    const progress = Math.max(currentStep, 0);

    const items = getItems(order);
    const shipping = order.shippingAddress || {};

    const isCancelled = status === 'cancelled';

    return (
      <div className="orders-tracking-page">

        {/* TRACKING HEADER */}

        <div className="orders-tracking-top">

          <IconButton
            path={mdiArrowLeft}
            label="Back to orders"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="orders-tracking-title">
            <h1>Track Order</h1>
            <p>LANADA DELIVERY</p>
          </div>

          <IconButton
            path={mdiDotsVertical}
            label="More options"
            onClick={() => handleDownloadInvoice(order)}
          />

        </div>

        {/* MAP */}

        <div className="orders-map">

          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <div className="map-road road-four" />
          <div className="map-road road-five" />

          <div className="map-block block-one" />
          <div className="map-block block-two" />
          <div className="map-block block-three" />
          <div className="map-block block-four" />
          <div className="map-block block-five" />

          <div className="map-street-label label-one">
            CITY CENTER
          </div>

          <div className="map-street-label label-two">
            MAIN STREET
          </div>

          <div className="map-street-label label-three">
            RESIDENTIAL AREA
          </div>

          <div className="map-street-label label-four">
            LANADA ROUTE
          </div>

          <svg
            className="orders-map-route"
            viewBox="0 0 600 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points="70,240 150,240 150,180 250,180 250,120 365,120 365,70 490,70"
              fill="none"
              stroke="#df5a61"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="9 5"
            />
          </svg>

          <div className="map-location start">
            <Icon
              path={mdiHomeOutline}
              size={1}
            />
          </div>

          <div className="map-location destination">
            <Icon
              path={mdiTruckFast}
              size={1.15}
            />
          </div>

          <div className="map-note">
            <Icon
              path={mdiMapOutline}
              size={0.7}
            />

            <span>Delivery route preview</span>
          </div>

        </div>

        {/* TRACKING DETAILS */}

        <div className="orders-tracking-sheet">

          <div className="orders-sheet-handle" />

          {/* Order heading */}

          <div className="orders-shipment-heading">

            <div>
              <span className="orders-muted-label">
                Tracking ID
              </span>

              <h2>
                #{orderId.slice(-8).toUpperCase()}
              </h2>
            </div>

            {renderStatus(status)}

          </div>

          {/* Product */}

          {items.length > 0 && (
            <div className="orders-shipment-product">

              <div className="orders-shipment-image">

                <img
                  src={getImage(items[0])}
                  alt={items[0].name || 'Product'}
                />

              </div>

              <div className="orders-shipment-product-info">

                <span className="orders-muted-label">
                  Your package
                </span>

                <strong>
                  {items[0].name || 'LANADA product'}
                </strong>

                <span>
                  {items.reduce(
                    (sum, item) =>
                      sum + Number(item.quantity || 1),
                    0
                  )}{' '}
                  products · {money(getTotal(order))}
                </span>

              </div>

            </div>
          )}

          {/* TIMELINE */}

          <div className="orders-timeline">

            {STATUS_STEPS.map((step, index) => {
              const completed =
                !isCancelled && index < progress;

              const active =
                !isCancelled && index === progress;

              const pending =
                !isCancelled && index > progress;

              return (
                <div
                  className={`orders-timeline-step ${
                    completed ? 'completed' : ''
                  } ${active ? 'active' : ''} ${
                    pending ? 'pending' : ''
                  }`}
                  key={step.key}
                >

                  <div className="orders-timeline-marker">
                    <Icon
                      path={step.icon}
                      size={0.7}
                    />
                  </div>

                  <div className="orders-timeline-content">

                    <strong>{step.label}</strong>

                    <span>
                      {index === 0
                        ? formatDate(order.createdAt)
                        : completed
                        ? 'Completed'
                        : active
                        ? 'Current status'
                        : 'Waiting for update'}
                    </span>

                  </div>

                  {active && (
                    <span className="orders-current-label">
                      NOW
                    </span>
                  )}

                </div>
              );
            })}

          </div>

          {/* Cancelled */}

          {isCancelled && (
            <div className="orders-cancelled-notice">
              This order has been cancelled.
            </div>
          )}

          {/* Delivery service */}

          <div className="orders-delivery-contact">

            <div className="orders-contact-avatar">
              <Icon
                path={mdiPackageVariantClosed}
                size={1}
              />
            </div>

            <div className="orders-contact-info">
              <strong>LANADA Delivery</strong>
              <span>Order delivery service</span>
            </div>

            <span className="orders-contact-note">
              {status === 'shipped'
                ? 'On the way'
                : 'Order support'}
            </span>

          </div>

          {/* Address */}

          <div className="orders-delivery-address">

            <div className="orders-address-icon">
              <Icon
                path={mdiMapMarker}
                size={1}
              />
            </div>

            <div>

              <span className="orders-muted-label">
                Delivery address
              </span>

              <strong>
                {shipping.fullName || 'Customer'}
              </strong>

              <p>
                {[
                  shipping.street,
                  shipping.city,
                  shipping.region,
                ].filter(Boolean).join(', ') ||
                  'Address not available'}
              </p>

              {shipping.phone && (
                <p>{shipping.phone}</p>
              )}

            </div>

          </div>

          {/* ACTION BUTTONS */}

          <div className="orders-tracking-bottom-actions">

            <button
              className="orders-secondary-button"
              onClick={() => handleDownloadInvoice(order)}
            >
              <Icon
                path={mdiReceiptTextOutline}
                size={0.8}
              />

              Invoice
            </button>

            <button
              className="orders-track-button"
              onClick={() => setSelectedOrder(null)}
            >
              Back to My Orders
            </button>

          </div>

        </div>

      </div>
    );
  };

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <div
      className={`lanada-orders ${
        selectedOrder ? 'tracking-active' : ''
      }`}
    >

      <style>{`

        .lanada-orders {
          --orders-bg: #e9e5e1;
          --orders-card: #ffffff;
          --orders-ink: #171614;
          --orders-muted: #8c8781;
          --orders-line: #ebe7e2;
          --orders-accent: #b87555;

          min-height: 100vh;
          background: var(--orders-bg);
          color: var(--orders-ink);
          padding: 34px 20px 70px;
          font-family: Arial, Helvetica, sans-serif;
        }

        .lanada-orders * {
          box-sizing: border-box;
        }

        .orders-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        /* TOP */

        .orders-page-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .orders-brand {
          font-size: 12px;
          letter-spacing: 4px;
          font-weight: 700;
          color: #77716b;
        }

        .orders-top-actions {
          display: flex;
          gap: 10px;
        }

        .orders-icon-button {
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 50%;
          background: white;
          color: #171614;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(30, 24, 18, .05);
          transition: .2s ease;
        }

        .orders-icon-button:hover {
          transform: translateY(-2px);
          background: #f7f3ef;
        }

        /* HEADING */

        .orders-heading {
          margin-bottom: 24px;
        }

        .orders-heading h1 {
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 500;
          letter-spacing: -2px;
          margin: 0 0 8px;
          color: #171614;
        }

        .orders-heading p {
          margin: 0;
          color: #88817b;
          font-size: 13px;
        }

        /* SEARCH */

        .orders-search {
          height: 48px;
          width: 100%;
          max-width: 390px;
          background: white;
          border: 1px solid #eee9e4;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 17px;
          margin-bottom: 22px;
          color: #8a847d;
        }

        .orders-search input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #222;
          font-size: 13px;
        }

        .orders-search input::placeholder {
          color: #aaa39c;
        }

        /* FILTERS */

        .orders-filters {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          padding: 2px 0 15px;
          scrollbar-width: none;
        }

        .orders-filters::-webkit-scrollbar {
          display: none;
        }

        .orders-filter {
          flex: 0 0 auto;
          padding: 11px 16px;
          border: 1px solid #d9d1c9;
          background: transparent;
          border-radius: 30px;
          color: #766b61;
          font-size: 12px;
          cursor: pointer;
          transition: .2s ease;
        }

        .orders-filter.active {
          color: #302820;
          background: white;
          border-color: white;
          box-shadow: 0 3px 12px rgba(30, 24, 18, .04);
        }

        .orders-filter-count {
          margin-left: 6px;
          font-size: 10px;
          opacity: .7;
        }

        /* LIST */

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .orders-card {
          background: white;
          border: 1px solid rgba(255,255,255,.8);
          border-radius: 21px;
          padding: 12px;
          display: grid;
          grid-template-columns: 112px minmax(0, 1fr) 38px;
          align-items: center;
          gap: 16px;
          box-shadow: 0 5px 20px rgba(40, 30, 20, .025);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .orders-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 9px 25px rgba(40, 30, 20, .06);
        }

        .orders-product-image {
          width: 112px;
          height: 112px;
          background: #faf9f7;
          border: 1px solid #f0eeeb;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orders-product-image img {
          width: 100%;
          height: 100%;
          padding: 9px;
          object-fit: contain;
        }

        .orders-card-info {
          min-width: 0;
        }

        .orders-card-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .orders-card-heading h3 {
          margin: 2px 0 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1d1b19;
          line-height: 1.4;
        }

        .orders-price {
          margin: 0 0 10px;
          font-size: 14px;
          font-weight: 600;
        }

        /* STATUS */

        .orders-status {
          flex: 0 0 auto;
          padding: 5px 10px;
          border-radius: 30px;
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
        }

        .orders-status.success {
          background: #e7f3dc;
          color: #527c34;
        }

        .orders-status.transit {
          background: #f8eed9;
          color: #9a7136;
        }

        .orders-status.pending {
          background: #eeeae5;
          color: #77716a;
        }

        .orders-status.cancelled {
          background: #fbe8e6;
          color: #b64c48;
        }

        .orders-status.returned {
          background: #eee8f7;
          color: #7859a4;
        }

        .orders-card-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          color: #99918a;
          font-size: 11px;
        }

        .orders-card-meta strong {
          color: #25211e;
          font-size: 14px;
        }

        /* CARD ACTIONS */

        .orders-card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .orders-track-button,
        .orders-secondary-button {
          min-height: 36px;
          border: 0;
          border-radius: 30px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: .2s ease;
        }

        .orders-track-button {
          background: #f8f5f1;
          color: #a8423d;
        }

        .orders-track-button:hover {
          background: #a8423d;
          color: white;
        }

        .orders-secondary-button {
          background: #eee6de;
          color: #725b49;
        }

        .orders-secondary-button:hover {
          background: #e3d7ca;
        }

        .orders-card-date {
          margin-top: 10px;
          color: #aaa29a;
          font-size: 10px;
        }

        .orders-invoice-small {
          width: 36px;
          height: 36px;
          border: 1px solid #eee9e4;
          border-radius: 50%;
          background: white;
          color: #81776e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .orders-invoice-small:hover {
          background: #f8f4ef;
          color: #a8423d;
        }

        /* EMPTY / ERROR */

        .orders-empty,
        .orders-error,
        .orders-loading {
          min-height: 330px;
          background: rgba(255,255,255,.75);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 35px 20px;
        }

        .orders-empty-icon {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: #f2ece6;
          color: #a17e63;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 17px;
        }

        .orders-empty h2,
        .orders-error h2 {
          font-size: 21px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        .orders-empty p,
        .orders-error p {
          color: #8c837b;
          font-size: 13px;
          margin: 0 0 20px;
        }

        .orders-primary-button {
          border: 0;
          border-radius: 30px;
          background: #25211e;
          color: white;
          padding: 12px 22px;
          font-size: 12px;
          cursor: pointer;
        }

        .orders-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #e8e1da;
          border-top-color: #a66d50;
          border-radius: 50%;
          animation: ordersSpin .8s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes ordersSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* =================================
           TRACKING VIEW
        ================================= */

        .orders-tracking-page {
          max-width: 850px;
          margin: 0 auto;
          background: #f5f1eb;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(35, 28, 20, .08);
        }

        .orders-tracking-top {
          height: 76px;
          padding: 0 22px;
          display: grid;
          grid-template-columns: 44px 1fr 44px;
          align-items: center;
          background: #f5f1eb;
        }

        .orders-tracking-title {
          text-align: center;
        }

        .orders-tracking-title h1 {
          font-size: 16px;
          margin: 0 0 3px;
          font-weight: 600;
        }

        .orders-tracking-title p {
          font-size: 8px;
          letter-spacing: 2px;
          color: #a19a92;
          margin: 0;
        }

        /* MAP */

        .orders-map {
          position: relative;
          height: 290px;
          overflow: hidden;
          background:
            linear-gradient(28deg, transparent 47%, #d8e7d5 48%, #d8e7d5 52%, transparent 53%),
            linear-gradient(115deg, transparent 38%, #e5e0d7 39%, #e5e0d7 41%, transparent 42%),
            linear-gradient(80deg, transparent 67%, #e5e0d7 68%, #e5e0d7 70%, transparent 71%),
            #e9eee5;
        }

        .map-road {
          position: absolute;
          background: rgba(255,255,255,.95);
          border: 1px solid #e0ded8;
          border-radius: 20px;
        }

        .road-one {
          width: 130%;
          height: 22px;
          top: 35%;
          left: -10%;
          transform: rotate(-13deg);
        }

        .road-two {
          width: 110%;
          height: 18px;
          top: 72%;
          left: -5%;
          transform: rotate(12deg);
        }

        .road-three {
          width: 18px;
          height: 130%;
          left: 26%;
          top: -15%;
          transform: rotate(14deg);
        }

        .road-four {
          width: 17px;
          height: 130%;
          left: 72%;
          top: -15%;
          transform: rotate(-12deg);
        }

        .road-five {
          width: 110%;
          height: 13px;
          top: 18%;
          left: 5%;
          transform: rotate(24deg);
        }

        .map-block {
          position: absolute;
          background: #dce7d8;
          border: 1px solid #d2dfcd;
          border-radius: 8px;
        }

        .block-one {
          width: 85px;
          height: 48px;
          left: 7%;
          top: 8%;
        }

        .block-two {
          width: 100px;
          height: 54px;
          right: 8%;
          top: 13%;
        }

        .block-three {
          width: 90px;
          height: 55px;
          left: 42%;
          top: 48%;
        }

        .block-four {
          width: 80px;
          height: 45px;
          left: 9%;
          bottom: 9%;
        }

        .block-five {
          width: 95px;
          height: 55px;
          right: 7%;
          bottom: 8%;
        }

        .map-street-label {
          position: absolute;
          color: #8c9988;
          font-size: 8px;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .label-one {
          left: 8%;
          top: 27%;
        }

        .label-two {
          right: 8%;
          top: 42%;
        }

        .label-three {
          left: 35%;
          bottom: 10%;
        }

        .label-four {
          right: 12%;
          bottom: 27%;
        }

        .orders-map-route {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 2px 2px rgba(150,50,50,.15));
        }

        .map-location {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: #bd655e;
          border: 5px solid rgba(255,255,255,.85);
          box-shadow: 0 5px 15px rgba(0,0,0,.15);
          z-index: 2;
        }

        .map-location.start {
          left: 9%;
          bottom: 12%;
          background: #9d927e;
        }

        .map-location.destination {
          right: 14%;
          top: 10%;
          width: 53px;
          height: 53px;
          background: #bd655e;
        }

        .map-note {
          position: absolute;
          left: 14px;
          top: 14px;
          padding: 8px 12px;
          border-radius: 30px;
          background: rgba(255,255,255,.88);
          color: #777;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          z-index: 3;
        }

        /* TRACKING SHEET */

        .orders-tracking-sheet {
          position: relative;
          margin-top: -1px;
          padding: 15px 22px 22px;
          background: #fff;
          border-radius: 25px 25px 0 0;
        }

        .orders-sheet-handle {
          width: 42px;
          height: 4px;
          border-radius: 10px;
          background: #ddd8d2;
          margin: 0 auto 20px;
        }

        .orders-shipment-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
        }

        .orders-muted-label {
          display: block;
          font-size: 10px;
          color: #99918a;
          margin-bottom: 5px;
        }

        .orders-shipment-heading h2 {
          margin: 0;
          font-size: 17px;
          letter-spacing: .3px;
        }

        /* SHIPMENT PRODUCT */

        .orders-shipment-product {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 11px;
          background: #faf9f7;
          border: 1px solid #f0eeeb;
          border-radius: 16px;
          margin-bottom: 17px;
        }

        .orders-shipment-image {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: white;
          border: 1px solid #eee;
          overflow: hidden;
          flex: 0 0 auto;
        }

        .orders-shipment-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 5px;
        }

        .orders-shipment-product-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .orders-shipment-product-info strong {
          font-size: 12px;
          font-weight: 600;
        }

        .orders-shipment-product-info > span:last-child {
          color: #99918a;
          font-size: 10px;
        }

        /* TIMELINE */

        .orders-timeline {
          padding: 15px 14px 7px;
          border: 1px solid #eeeae5;
          border-radius: 16px;
          background: #fdfcfb;
        }

        .orders-timeline-step {
          min-height: 57px;
          display: flex;
          align-items: flex-start;
          gap: 13px;
          position: relative;
        }

        .orders-timeline-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 11px;
          top: 24px;
          height: 33px;
          width: 1px;
          background: #e5dfd8;
        }

        .orders-timeline-step.completed:not(:last-child)::after {
          background: #c86a66;
        }

        .orders-timeline-marker {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eeeae5;
          color: #aaa29a;
          border: 1px solid #e4ded8;
          z-index: 1;
        }

        .orders-timeline-step.completed .orders-timeline-marker,
        .orders-timeline-step.active .orders-timeline-marker {
          background: #c96361;
          border-color: #c96361;
          color: white;
        }

        .orders-timeline-content {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 2px;
        }

        .orders-timeline-content strong {
          font-size: 12px;
          font-weight: 500;
          color: #292522;
        }

        .orders-timeline-content span {
          font-size: 10px;
          color: #a49c95;
        }

        .orders-timeline-step.pending .orders-timeline-content strong {
          color: #a49c95;
        }

        .orders-current-label {
          margin-left: auto;
          font-size: 9px;
          color: #bd655e;
          font-weight: 700;
          padding-top: 5px;
        }

        .orders-cancelled-notice {
          padding: 13px;
          background: #fff0ed;
          border-radius: 12px;
          color: #a64e47;
          font-size: 12px;
          margin-top: 12px;
        }

        /* DELIVERY CONTACT */

        .orders-delivery-contact {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 15px;
          padding: 12px;
          border: 1px solid #eeeae5;
          border-radius: 15px;
        }

        .orders-contact-avatar {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          background: #eee8e2;
          color: #8d735e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orders-contact-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .orders-contact-info strong {
          font-size: 11px;
        }

        .orders-contact-info span,
        .orders-contact-note {
          font-size: 9px;
          color: #99918a;
        }

        .orders-contact-note {
          margin-left: auto;
        }

        /* DELIVERY ADDRESS */

        .orders-delivery-address {
          display: flex;
          gap: 12px;
          padding: 16px 4px 4px;
          margin-top: 5px;
        }

        .orders-address-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #f5eee8;
          color: #a87557;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .orders-delivery-address strong {
          display: block;
          font-size: 11px;
          margin: 3px 0;
        }

        .orders-delivery-address p {
          margin: 3px 0;
          color: #888078;
          font-size: 10px;
          line-height: 1.5;
        }

        /* BOTTOM ACTIONS */

        .orders-tracking-bottom-actions {
          display: flex;
          gap: 9px;
          margin-top: 17px;
        }

        .orders-tracking-bottom-actions button {
          flex: 1;
        }

        /* =================================
           IMPORTANT: TRACKING OPENS AT TOP
        ================================= */

        .lanada-orders.tracking-active {
          padding-top: 0 !important;
        }

        .orders-tracking-page {
          margin-top: 0;
          scroll-margin-top: 0;
        }

        .orders-tracking-top {
          position: relative;
          top: 0;
        }

        /* =================================
           TABLET AND MOBILE
        ================================= */

        @media (max-width: 650px) {

          .lanada-orders {
            padding: 22px 12px 45px;
          }

          .lanada-orders.tracking-active {
            padding-top: 0 !important;
          }

          .orders-heading h1 {
            font-size: 36px;
          }

          .orders-card {
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 12px;
            padding: 10px;
            border-radius: 17px;
          }

          .orders-product-image {
            width: 88px;
            height: 100px;
          }

          .orders-card-heading {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 5px;
          }

          .orders-card-heading h3 {
            font-size: 12px;
            margin: 0 0 5px;
          }

          .orders-card-meta {
            font-size: 10px;
          }

          .orders-card-meta strong {
            font-size: 12px;
          }

          .orders-track-button,
          .orders-secondary-button {
            min-height: 33px;
            padding: 0 14px;
            font-size: 10px;
          }

          .orders-invoice-small {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }

          .orders-card {
            position: relative;
          }

          .orders-tracking-page {
            border-radius: 20px;
          }

          .orders-map {
            height: 245px;
          }

          .orders-tracking-sheet {
            padding: 13px 14px 18px;
          }

          .orders-tracking-bottom-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 380px) {

          .orders-card {
            grid-template-columns: 75px minmax(0, 1fr);
            gap: 9px;
          }

          .orders-product-image {
            width: 75px;
            height: 88px;
          }

          .orders-card-meta {
            align-items: flex-start;
            flex-direction: column;
            gap: 3px;
          }
        }

      `}</style>

      <div className="orders-container">

        {!selectedOrder ? (
          <>

            {/* ORDERS LIST HEADER */}

            <div className="orders-page-top">

              <div className="orders-brand">
                LANADA
              </div>

              <div className="orders-top-actions">

                <IconButton
                  path={mdiRefresh}
                  label="Refresh orders"
                  onClick={fetchOrders}
                />

                <IconButton
                  path={mdiDotsVertical}
                  label="More"
                  onClick={() => navigate('/')}
                />

              </div>

            </div>

            {/* HEADING */}

            <div className="orders-heading">
              <h1>My Order</h1>
              <p>
                All your purchases, together in one place.
              </p>
            </div>

            {/* SEARCH */}

            <label className="orders-search">

              <Icon
                path={mdiMagnify}
                size={0.9}
              />

              <input
                type="search"
                placeholder="Search your orders..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </label>

            {/* FILTERS */}

            <div className="orders-filters">

              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter.key}
                  className={`orders-filter ${
                    activeFilter === filter.key ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}

                  <span className="orders-filter-count">
                    {getFilterCount(filter.key)}
                  </span>
                </button>
              ))}

            </div>

            {/* LOADING */}

            {loading ? (
              <div className="orders-loading">
                <div className="orders-spinner" />
                <p>Loading your orders...</p>
              </div>

            ) : error ? (

              /* ERROR */

              <div className="orders-error">

                <h2>Something went wrong</h2>

                <p>{error}</p>

                <button
                  className="orders-primary-button"
                  onClick={fetchOrders}
                >
                  Try again
                </button>

              </div>

            ) : filteredOrders.length === 0 ? (

              /* EMPTY */

              <div className="orders-empty">

                <div className="orders-empty-icon">
                  <Icon
                    path={mdiPackageVariantClosed}
                    size={1.5}
                  />
                </div>

                <h2>No orders found</h2>

                <p>
                  {orders.length === 0
                    ? 'Your orders will appear here when you make a purchase.'
                    : 'There are no orders in this category.'}
                </p>

                <button
                  className="orders-primary-button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearch('');

                    if (orders.length === 0) {
                      navigate('/');
                    }
                  }}
                >
                  {orders.length === 0
                    ? 'Start Shopping'
                    : 'View All Orders'}
                </button>

              </div>

            ) : (

              /* ORDER CARDS */

              <div className="orders-list">
                {filteredOrders.map(renderOrderCard)}
              </div>

            )}

          </>

        ) : (

          /* TRACKING PAGE */

          renderTracking(selectedOrder)

        )}

      </div>

    </div>
  );
};

export default Orders;