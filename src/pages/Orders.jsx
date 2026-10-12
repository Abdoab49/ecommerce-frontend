// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700"
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
            className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700"
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
                  className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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

                    const circleClass =
                      isCompleted || isActive
                        ? 'bg-blue-600'
                        : 'bg-neutral-700';

                    const lineClass =
                      idx < currentIdx ? 'bg-blue-600' : 'bg-neutral-700';

                    return (
                      <li
                        key={step.key}
                        className="relative flex flex-row lg:flex-col items-start flex-1"
                        aria-current={isActive ? 'step' : undefined}
                      >
                        {/* Vertical line (mobile) */}
                        {idx < STEPS.length - 1 && (
                          <div
                            className={`absolute left-3 top-6 -bottom-10 w-0.5 lg:hidden ${lineClass}`}
                          ></div>
                        )}

                        <div className="flex items-center w-max lg:w-full">
                          {/* Circle */}
                          <div
                            className={`z-10 w-6 h-6 shrink-0 ${circleClass} flex items-center justify-center rounded-full md:w-7 md:h-7`}
                          >
                            <span className="sr-only">
                              Step {idx + 1}: {step.label}
                            </span>

                            {/* ✅ Check icon — ila completed wla active */}
                            {(isCompleted || isActive) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 fill-white"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                              </svg>
                            )}

                            {/* ✅ Pending icon */}
                            {isPending && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 fill-slate-400"
                                viewBox="0 0 512 512"
                                aria-hidden="true"
                              >
                                <path d="M426 495.983H86c-25.364 0-46-20.635-46-46v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 7.72 6.28 14 14 14h340c7.72 0 14-6.28 14-14v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 25.364-20.635 46-46 46z" />
                                <path d="M496 263.958a15.945 15.945 0 0 1-11.313-4.687L285.698 60.284c-16.375-16.376-43.02-16.376-59.396 0L27.314 259.272c-6.248 6.249-16.379 6.249-22.627 0-6.249-6.248-6.249-16.379 0-22.627L203.675 37.656c28.852-28.852 75.799-28.852 104.65 0l198.988 198.988c6.249 6.249 6.249 16.379 0 22.627A15.943 15.943 0 0 1 496 263.958zM320 495.983H192c-8.837 0-16-7.164-16-16v-142c0-27.57 22.43-50 50-50h60c27.57 0 50 22.43 50 50v142c0 8.836-7.163 16-16 16zm-112-32h96v-126c0-9.925-8.075-18-18-18h-60c-9.925 0-18 8.075-18 18z" />
                              </svg>
                            )}
                          </div>

                          {/* ✅ Horizontal line — flex-1 (msawi) */}
                          {idx < STEPS.length - 1 && (
                            <div
                              className={`hidden lg:block flex-1 h-0.5 mx-4 rounded-md ${lineClass}`}
                            ></div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="ml-4 lg:ml-0 lg:mt-3 lg:mr-4">
                          <p
                            className={`text-sm font-semibold ${
                              isCompleted || isActive
                                ? 'text-blue-500'
                                : 'text-slate-400'
                            }`}
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