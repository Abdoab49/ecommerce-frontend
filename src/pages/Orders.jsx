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
  // LOADING — Spinner K7el 3la Khalfiya Bayda
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
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: '#000000' }}
          >
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
  // EMPTY
  // ============================================
  if (orders.length === 0) {
    return (
      <main
        className="mt-6 px-4 md:px-8"
        style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}
      >
        <div className="max-w-7xl mx-auto text-center py-24">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: '#000000' }}
          >
            No orders
          </h1>
          <p className="mb-6" style={{ color: '#4b5563' }}>
            Start shopping to place your first order!
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
  // ✅ ALWAN — Khalfiya Bayda + Text K7el + Circle Khdar
  // ============================================
  const COLORS = {
    active: '#10b981',           // ✅ KH DAR (green) — circle + line
    activeHover: '#059669',      // ✅ Green gham9
    pending: '#d1d5db',          // ✅ Gray light (pending circles)
    iconActive: '#ffffff',       // ✅ Icon bayd f circle khdar
    iconPending: '#6b7280',      // ✅ Icon gray f circle pending
    textActive: '#10b981',       // ✅ KH DAR (text active)
    textPending: '#6b7280',      // ✅ Gray (text pending)
    textPrimary: '#000000',      // ✅ K7el (titles)
    textSecondary: '#4b5563',    // ✅ Gray gham9 (labels)
    textValue: '#1f2937',        // ✅ Gray gham9 (values)
    billingBg: '#f3f4f6',        // ✅ Gray fatesh
    productBg: '#ffffff',        // ✅ Byed
    divider: '#e5e7eb',          // ✅ Gray fatesh
  };

  // ============================================
  // MAIN — Khalfiya Bayda tl3a l fo9
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
          {orders.map((order) => {
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
                  className="mt-12 pb-6"
                  style={{ borderBottom: `1px solid ${COLORS.divider}` }}
                >
                  <h2 className="sr-only">Order progress</h2>

                  <ol className="flex flex-col lg:flex-row items-start lg:items-center w-full space-y-8 lg:space-y-0">
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
                          className="relative flex flex-row lg:flex-col items-start flex-1"
                          aria-current={isActive ? 'step' : undefined}
                        >
                          {idx < STEPS.length - 1 && (
                            <div
                              className="absolute left-3 top-6 -bottom-10 w-0.5 lg:hidden"
                              style={{
                                backgroundColor:
                                  idx < currentIdx
                                    ? COLORS.active
                                    : COLORS.pending,
                              }}
                            ></div>
                          )}

                          <div className="flex items-center w-max lg:w-full">
                            <div
                              className="z-10 w-6 h-6 shrink-0 flex items-center justify-center rounded-full md:w-7 md:h-7"
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

                            {idx < STEPS.length - 1 && (
                              <div
                                className="hidden lg:block flex-1 h-0.5 mx-4 rounded-md"
                                style={{
                                  backgroundColor:
                                    idx < currentIdx
                                      ? COLORS.active
                                      : COLORS.pending,
                                }}
                              ></div>
                            )}
                          </div>

                          <div className="ml-4 lg:ml-0 lg:mt-3 lg:mr-4">
                            <p
                              className="text-sm font-semibold"
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
                                className="text-xs block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                {formatDateTime(orderDate)}
                              </time>
                            )}
                            {idx === STEPS.length - 1 && isPending && (
                              <span
                                className="text-xs block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                Expected soon
                              </span>
                            )}
                            {idx === STEPS.length - 1 && isCompleted && (
                              <span
                                className="text-xs block mt-1"
                                style={{ color: COLORS.textSecondary }}
                              >
                                Products delivered
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
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