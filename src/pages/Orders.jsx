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
  // LOADING
  // ============================================
  if (loading) {
    return (
      <main className="mt-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center py-24 text-slate-400">
          Loading orders...
        </div>
      </main>
    );
  }

  // ============================================
  // ERROR
  // ============================================
  if (error) {
    return (
      <main className="mt-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center py-24">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">
            Something went wrong
          </h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: '#27aa80',
              border: '1px solid #27aa80',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1f8a67';
              e.currentTarget.style.borderColor = '#1f8a67';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#27aa80';
              e.currentTarget.style.borderColor = '#27aa80';
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
      <main className="mt-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center py-24">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">No orders</h1>
          <p className="text-slate-400 mb-6">
            Start shopping to place your first order!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: '#27aa80',
              border: '1px solid #27aa80',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1f8a67';
              e.currentTarget.style.borderColor = '#1f8a67';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#27aa80';
              e.currentTarget.style.borderColor = '#27aa80';
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

  // ============================================
  // ✅ @mdi/react Step Icons
  // ============================================
  const StepIcon = ({ stepKey, isPending }) => {
    const color = isPending ? '#94a3b8' : '#ffffff';

    const ICONS = {
      pending: mdiCheck,
      processing: mdiPackageVariantClosed,
      shipped: mdiTruckFast,
      delivered: mdiHome,
    };

    return <Icon path={ICONS[stepKey]} size={0.7} color={color} />;
  };

  // ============================================
  // MAIN
  // ============================================
  return (
    <main className="mt-6 px-4 md:px-8">
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
            <div key={orderId}>
              {/* ===== Header ===== */}
              <header className="flex items-center gap-6 flex-wrap border-b border-neutral-700 pb-6">
                <div className="flex-1 text-nowrap">
                  <h1 className="text-2xl font-bold text-slate-50">
                    Order Tracking
                  </h1>
                  <p className="text-base text-slate-400 mt-4">
                    Tracking Id:{' '}
                    <span className="font-medium text-slate-50">
                      #{orderId.slice(-8).toUpperCase() || '--------'}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer transition-colors focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: '#27aa80',
                    border: '1px solid #27aa80',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1f8a67';
                    e.currentTarget.style.borderColor = '#1f8a67';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#27aa80';
                    e.currentTarget.style.borderColor = '#27aa80';
                  }}
                >
                  Download invoice
                </button>
              </header>

              {/* ===== Progress Timeline ===== */}
              <section className="mt-12 border-b border-neutral-700 pb-6">
                <h2 className="sr-only">Order progress</h2>

                <ol className="flex flex-col lg:flex-row items-start lg:items-center w-full space-y-8 lg:space-y-0">
                  {STEPS.map((step, idx) => {
                    const isCompleted =
                      status !== 'cancelled' && idx < currentIdx;
                    const isActive =
                      status !== 'cancelled' && idx === currentIdx;
                    const isPending =
                      status !== 'cancelled' && idx > currentIdx;

                    // ✅ Lawn dyalek #27aa80
                    const activeColor = '#27aa80';

                    return (
                      <li
                        key={step.key}
                        className="relative flex flex-row lg:flex-col items-start flex-1"
                        aria-current={isActive ? 'step' : undefined}
                      >
                        {/* Vertical line (mobile) */}
                        {idx < STEPS.length - 1 && (
                          <div
                            className="absolute left-3 top-6 -bottom-10 w-0.5 lg:hidden"
                            style={{
                              backgroundColor:
                                idx < currentIdx ? activeColor : '#404040',
                            }}
                          ></div>
                        )}

                        <div className="flex items-center w-max lg:w-full">
                          {/* Circle */}
                          <div
                            className="z-10 w-6 h-6 shrink-0 flex items-center justify-center rounded-full md:w-7 md:h-7"
                            style={{
                              backgroundColor:
                                isCompleted || isActive
                                  ? activeColor
                                  : '#404040',
                            }}
                          >
                            <span className="sr-only">
                              Step {idx + 1}: {step.label}
                            </span>

                            <StepIcon
                              stepKey={step.key}
                              isPending={isPending}
                            />
                          </div>

                          {/* Horizontal line (desktop) */}
                          {idx < STEPS.length - 1 && (
                            <div
                              className="hidden lg:block flex-1 h-0.5 mx-4 rounded-md"
                              style={{
                                backgroundColor:
                                  idx < currentIdx ? activeColor : '#404040',
                              }}
                            ></div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="ml-4 lg:ml-0 lg:mt-3 lg:mr-4">
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color:
                                isCompleted || isActive
                                  ? activeColor
                                  : '#94a3b8',
                            }}
                          >
                            {step.label}
                          </p>
                          {idx === 0 && (
                            <time
                              dateTime={orderDate.toISOString()}
                              className="text-xs text-slate-400 block mt-1"
                            >
                              {formatDateTime(orderDate)}
                            </time>
                          )}
                          {idx === STEPS.length - 1 && isPending && (
                            <span className="text-xs text-slate-400 block mt-1">
                              Expected soon
                            </span>
                          )}
                          {idx === STEPS.length - 1 && isCompleted && (
                            <span className="text-xs text-slate-400 block mt-1">
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
                  <div className="border-b border-neutral-700 pb-2">
                    <h2 className="text-base font-semibold text-slate-50">
                      Products
                    </h2>
                  </div>

                  <ul className="space-y-4 mt-6" role="list">
                    {items.map((item, idx) => (
                      <li key={idx}>
                        <div className="grid sm:grid-cols-3 items-center gap-4">
                          <div className="col-span-2 flex items-center gap-4">
                            <div className="w-20 h-20 shrink-0 bg-neutral-800 p-2 rounded-md">
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
                              <p className="text-sm font-semibold text-slate-50">
                                {item.name || 'Product'}
                              </p>
                              <p className="text-xs font-medium text-slate-400 mt-2">
                                Qty:{' '}
                                <span className="font-medium text-slate-300">
                                  {item.quantity || 1}
                                </span>
                              </p>
                              {item.size && (
                                <p className="text-xs font-medium text-slate-400 mt-1">
                                  Size:{' '}
                                  <span className="font-medium text-slate-300">
                                    {item.size}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:ml-auto">
                            <p className="text-sm font-semibold text-slate-50">
                              {item.price} DH
                            </p>
                          </div>
                        </div>

                        {idx < items.length - 1 && (
                          <hr className="border-neutral-700 my-4" />
                        )}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Right Side */}
                <section>
                  <h2 className="text-base font-semibold text-slate-50">
                    Delivery information
                  </h2>

                  <div className="space-y-6 mt-6">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">
                        Customer
                      </p>
                      <p className="text-slate-50 text-sm font-medium mt-2">
                        {shipping.fullName || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">
                        Phone
                      </p>
                      <p className="text-slate-50 text-sm font-medium mt-2">
                        {shipping.phone || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">
                        Address
                      </p>
                      <p className="text-slate-50 text-sm font-medium mt-2">
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
                  <div className="bg-neutral-800 rounded-md p-6 h-max mt-8">
                    <h3 className="text-base font-semibold text-slate-50">
                      Billing details
                    </h3>

                    <ul className="font-medium mt-6 space-y-4" role="list">
                      <li className="flex flex-wrap gap-4 text-slate-400 text-sm">
                        Subtotal{' '}
                        <span className="ml-auto text-slate-50 font-semibold">
                          {subtotal.toFixed(2)} DH
                        </span>
                      </li>
                      <li className="flex flex-wrap gap-4 text-slate-400 text-sm">
                        Shipping{' '}
                        <span className="ml-auto text-slate-50 font-semibold">
                          {shippingFee.toFixed(2)} DH
                        </span>
                      </li>

                      <hr className="border-neutral-700" />

                      <li className="flex flex-wrap gap-4 text-sm text-slate-50 font-semibold">
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
  );
};

export default Orders;