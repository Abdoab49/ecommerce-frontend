// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiCheck,
  mdiPackageVariantClosed,
  mdiTruckFast,
  mdiHome,
} from '@mdi/js';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ============================================
  // ✅ Bdel Body Background — Khalfiya Bayda
  // ============================================
  useEffect(() => {
    const originalBg = document.body.style.background;
    const originalBgColor = document.body.style.backgroundColor;

    document.body.style.background = '#ffffff';
    document.body.style.backgroundColor = '#ffffff';
    document.body.classList.add('orders-active');

    return () => {
      document.body.style.background = originalBg || '';
      document.body.style.backgroundColor = originalBgColor || '#000000';
      document.body.classList.remove('orders-active');
    };
  }, []);

  // ============================================
  // ✅ Fetch Orders
  // ============================================
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
  // ✅ الفلترة: كنحيدو الكوماندات اللي سالاو (Delivered / Cancelled)
  // ============================================
  const activeOrders = orders.filter((order) => {
    const status = String(order.status || 'pending').toLowerCase();
    return status !== 'delivered' && status !== 'cancelled';
  });

  // ============================================
  // LOADING — Spinner
  // ============================================
  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          background: '#ffffff',
          color: '#000000',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: '#000000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        ></div>
        <p
          style={{
            color: '#000000',
            fontSize: '14px',
            opacity: 0.7,
            margin: 0,
          }}
        >
          Loading orders...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================
  if (error) {
    return (
      <main
        className="mt-6 px-4 md:px-8"
        style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}
      >
        <div className="max-w-7xl mx-auto text-center py-24">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
            Something went wrong
          </h1>
          <p className="mb-6" style={{ color: '#4b5563' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-3.5 py-2 text-sm font-semibold rounded-md cursor-pointer transition-colors"
            style={{
              backgroundColor: '#000000',
              border: '1px solid #000000',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333333';
              e.currentTarget.style.borderColor = '#333333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.borderColor = '#000000';
            }}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  // ============================================
  // EMPTY (كنشوفو واش كاينين أوردرات نشطين)
  // ============================================
  if (activeOrders.length === 0) {
    return (
      <main
        className="mt-6 px-4 md:px-8"
        style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}
      >
        <div className="max-w-7xl mx-auto text-center py-24">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
            No active orders
          </h1>
          <p className="mb-6" style={{ color: '#4b5563' }}>
            Start shopping to place your first order, or check back later!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-2 text-sm font-semibold rounded-md cursor-pointer transition-colors"
            style={{
              backgroundColor: '#000000',
              border: '1px solid #000000',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333333';
              e.currentTarget.style.borderColor = '#333333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.borderColor = '#000000';
            }}
          >
            Continue shopping
          </button>
        </div>
      </main>
    );
  }

  // ============================================
  // STATUS MAP
  // ============================================
  const statusMap = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
  };

  // ============================================
  // STEPS
  // ============================================
  const STEPS = [
    { key: 'pending', label: 'Order placed' },
    { key: 'processing', label: 'Arrived at warehouse' },
    { key: 'shipped', label: 'Out for delivery' },
    { key: 'delivered', label: 'Products delivered' },
  ];

  const STEP_ICONS = {
    pending: mdiCheck,
    processing: mdiPackageVariantClosed,
    shipped: mdiTruckFast,
    delivered: mdiHome,
  };

  // ============================================
  // ✅ ALWAN
  // ============================================
  const COLORS = {
    active: '#10b981',
    activeHover: '#059669',
    pending: '#d1d5db',
    iconActive: '#ffffff',
    iconPending: '#6b7280',
    textActive: '#10b981',
    textPending: '#6b7280',
    textPrimary: '#000000',
    textSecondary: '#4b5563',
    textValue: '#1f2937',
    billingBg: '#f3f4f6',
    productBg: '#ffffff',
    divider: '#e5e7eb',
  };

  // ============================================
  // MAIN
  // ============================================
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        marginTop: 0,
        paddingTop: '24px',
        paddingBottom: '40px',
      }}
    >
      <main className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* ✅ هنا كنمشيو فـ activeOrders ماشي orders */}
          {activeOrders.map((order) => {
            const orderId = String(order._id || order.id || '');
            const status = String(order.status || 'pending').toLowerCase();
            const items = Array.isArray(order.items) ? order.items : [];
            const shipping = order.shippingAddress || {};
            const currentIdx = statusMap[status] ?? 0;

            const orderDate = order.createdAt
              ? new Date(order.createdAt)
              : new Date();

            const formatDateTime = (date) => {
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

            return (
              <div
                key={orderId}
                style={{ background: '#ffffff', color: '#000000' }}
              >
                {/* ===== Header ===== */}
                <header
                  className="flex items-center gap-6 flex-wrap pb-6"
                  style={{ borderBottom: `1px solid ${COLORS.divider}` }}
                >
                  <div className="flex-1 text-nowrap">
                    <h1
                      className="text-2xl font-bold"
                      style={{ color: COLORS.textPrimary }}
                    >
                      Order Tracking
                    </h1>
                    <p
                      className="text-base mt-4"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Tracking Id:{' '}
                      <span
                        className="font-medium"
                        style={{ color: COLORS.textPrimary }}
                      >
                        #{orderId.slice(-8).toUpperCase() || '--------'}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadInvoice(order)}
                    className="px-3.5 py-2 text-sm font-semibold rounded-md cursor-pointer transition-colors"
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid #000000',
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333333';
                      e.currentTarget.style.borderColor = '#333333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.borderColor = '#000000';
                    }}
                  >
                    Download invoice
                  </button>
                </header>

                {/* ===== Progress Timeline ===== */}
                <section
                  className="mt-8 pb-8 w-full"
                  style={{ borderBottom: `1px solid ${COLORS.divider}` }}
                >
                  <h2 className="sr-only">Order progress</h2>

                  <div className="relative flex flex-row items-start justify-between w-full">
                    
                    {/* ✅ L'Khat L'Khalfi */}
                    <div 
                      className="absolute top-4 md:top-5 left-0 right-0 h-1 -z-10 bg-gray-300"
                      style={{ transform: 'translateY(-50%)' }}
                    ></div>

                    {/* ✅ L'Khat L'Molawan */}
                    <div 
                      className="absolute top-4 md:top-5 left-0 h-1 -z-10 transition-all duration-500"
                      style={{ 
                        width: `${(currentIdx / (STEPS.length - 1)) * 100}%`,
                        backgroundColor: COLORS.active,
                        transform: 'translateY(-50%)' 
                      }}
                    ></div>

                    {STEPS.map((step, idx) => {
                      const isCompleted =
                        status !== 'cancelled' && idx < currentIdx;
                      const isActive =
                        status !== 'cancelled' && idx === currentIdx;
                      const isPending =
                        status !== 'cancelled' && idx > currentIdx;

                      return (
                        <li
                          key={step.key}
                          className="relative flex flex-col items-center flex-1"
                          aria-current={isActive ? 'step' : undefined}
                        >
                          <div className="flex items-center w-full justify-center relative z-10">
                            <div
                              className="w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center rounded-full border-2 border-white shadow-sm bg-white"
                              style={{
                                backgroundColor:
                                  isCompleted || isActive
                                    ? COLORS.active
                                    : COLORS.pending,
                              }}
                            >
                              <span className="sr-only">
                                Step {idx + 1}: {step.label}
                              </span>

                              <Icon
                                path={STEP_ICONS[step.key]}
                                size={0.7}
                                color={
                                  isPending
                                    ? COLORS.iconPending
                                    : COLORS.iconActive
                                }
                              />
                            </div>
                          </div>

                          <div className="mt-3 text-center w-full px-1">
                            <p
                              className="text-[10px] sm:text-xs font-semibold leading-tight"
                              style={{
                                color:
                                  isCompleted || isActive
                                    ? COLORS.textActive
                                    : COLORS.textPending,
                              }}
                            >
                              {step.label}
                            </p>
                            {idx === 0 && (
                              <time
                                dateTime={orderDate.toISOString()}
                                className="text-[9px] sm:text-[10px] block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                {formatDateTime(orderDate)}
                              </time>
                            )}
                            {idx === STEPS.length - 1 && isPending && (
                              <span
                                className="text-[9px] sm:text-[10px] block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                Expected soon
                              </span>
                            )}
                            {idx === STEPS.length - 1 && isCompleted && (
                              <span
                                className="text-[9px] sm:text-[10px] block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                Products delivered
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </section>

                {/* ===== Content ===== */}
                <div className="mt-12 grid lg:grid-cols-2 gap-12">
                  {/* Products */}
                  <section>
                    <div
                      className="pb-2"
                      style={{ borderBottom: `1px solid ${COLORS.divider}` }}
                    >
                      <h2
                        className="text-base font-semibold"
                        style={{ color: COLORS.textPrimary }}
                      >
                        Products
                      </h2>
                    </div>

                    <ul className="space-y-4 mt-6" role="list">
                      {items.map((item, idx) => (
                        <li key={idx}>
                          <div className="grid sm:grid-cols-3 items-center gap-4">
                            <div className="col-span-2 flex items-center gap-4">
                              <div
                                className="w-20 h-20 shrink-0 p-2 rounded-md"
                                style={{ backgroundColor: COLORS.productBg }}
                              >
                                <img
                                  src={
                                    item.image ||
                                    '/Assets/ShoeStore/tshirt1.png'
                                  }
                                  className="w-full h-full object-contain"
                                  alt={item.name || 'Product'}
                                />
                              </div>
                              <div>
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: COLORS.textPrimary }}
                                >
                                  {item.name || 'Product'}
                                </p>
                                <p
                                  className="text-xs font-medium mt-2"
                                  style={{ color: COLORS.textSecondary }}
                                >
                                  Qty:{' '}
                                  <span
                                    className="font-medium"
                                    style={{ color: COLORS.textValue }}
                                  >
                                    {item.quantity || 1}
                                  </span>
                                </p>
                                {item.size && (
                                  <p
                                    className="text-xs font-medium mt-1"
                                    style={{ color: COLORS.textSecondary }}
                                  >
                                    Size:{' '}
                                    <span
                                      className="font-medium"
                                      style={{ color: COLORS.textValue }}
                                    >
                                      {item.size}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:ml-auto">
                              <p
                                className="text-sm font-semibold"
                                style={{ color: COLORS.textPrimary }}
                              >
                                {item.price} DH
                              </p>
                            </div>
                          </div>

                          {idx < items.length - 1 && (
                            <hr
                              className="my-4"
                              style={{ borderColor: COLORS.divider }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Right Side */}
                  <section>
                    <h2
                      className="text-base font-semibold"
                      style={{ color: COLORS.textPrimary }}
                    >
                      Delivery information
                    </h2>

                    <div className="space-y-6 mt-6">
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: COLORS.textSecondary }}
                        >
                          Customer
                        </p>
                        <p
                          className="text-sm font-medium mt-2"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {shipping.fullName || '—'}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: COLORS.textSecondary }}
                        >
                          Phone
                        </p>
                        <p
                          className="text-sm font-medium mt-2"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {shipping.phone || '—'}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: COLORS.textSecondary }}
                        >
                          Address
                        </p>
                        <p
                          className="text-sm font-medium mt-2"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {[
                            shipping.street,
                            shipping.city,
                            shipping.region,
                          ]
                            .filter(Boolean)
                            .join(', ') || '—'}
                        </p>
                      </div>
                    </div>

                    {/* Billing */}
                    <div
                      className="rounded-md p-6 h-max mt-8"
                      style={{ backgroundColor: COLORS.billingBg }}
                    >
                      <h3
                        className="text-base font-semibold"
                        style={{ color: COLORS.textPrimary }}
                      >
                        Billing details
                      </h3>

                      <ul className="font-medium mt-6 space-y-4" role="list">
                        <li
                          className="flex flex-wrap gap-4 text-sm"
                          style={{ color: COLORS.textSecondary }}
                        >
                          Subtotal{' '}
                          <span
                            className="ml-auto font-semibold"
                            style={{ color: COLORS.textPrimary }}
                          >
                            {subtotal.toFixed(2)} DH
                          </span>
                        </li>
                        <li
                          className="flex flex-wrap gap-4 text-sm"
                          style={{ color: COLORS.textSecondary }}
                        >
                          Shipping{' '}
                          <span
                            className="ml-auto font-semibold"
                            style={{ color: COLORS.textPrimary }}
                          >
                            {shippingFee.toFixed(2)} DH
                          </span>
                        </li>

                        <hr style={{ borderColor: COLORS.divider }} />

                        <li
                          className="flex flex-wrap gap-4 text-sm font-semibold"
                          style={{ color: COLORS.textPrimary }}
                        >
                          Total{' '}
                          <span className="ml-auto">
                            {total.toFixed(2)} DH
                          </span>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Orders;