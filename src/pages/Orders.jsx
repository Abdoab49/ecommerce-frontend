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
      <div className={styles.page}>
        <div className="container h-50 px-4 py-5 mx-auto">
          <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">
            <div className="container text-center">
              <p className="h3 text-success mb-3">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className="container h-50 px-4 py-5 mx-auto">
          <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">
            <div className="container text-center">
              <p className="h3 text-danger mb-3">Something went wrong</p>
              <p className="text-dark">{error}</p>
              <button
                className="btn bg-success text-white"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container h-50 px-4 py-5 mx-auto">
          <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">
            <div className="container text-center">
              <p className="h3 text-success mb-3">No orders</p>
              <p className="text-dark">Start shopping to place your first order!</p>
              <button
                className="btn bg-success text-white"
                onClick={() => navigate('/')}
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {orders.map((order) => {
        const orderId = String(order._id || order.id || '');
        const status = String(order.status || 'pending').toLowerCase();

        const statusMap = {
          pending: 0,
          processing: 1,
          shipped: 2,
          delivered: 3,
        };
        const currentIdx = statusMap[status] ?? 0;

        const dateStr = order.createdAt
          ? new Date(order.createdAt).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })
          : '—';

        // ✅ Steps (4)
        const steps = [
          { title: 'Order Confirmed', icon: 'fa-check', idx: 0 },
          { title: 'Order Shipped', icon: 'fa-check', idx: 1 },
          { title: 'Out for delivery', icon: 'fa-check', idx: 2 },
          { title: 'Order Delivered', icon: 'fa-check', idx: 3 },
        ];

        // ✅ Bottom icons
        const bottomSteps = [
          { title: 'Order Confirmed', icon: 'fa-clipboard-check', color: 'text-primary' },
          { title: 'Order Shipped', icon: 'fa-boxes-packing', color: 'text-warning' },
          { title: 'Out for Delivery', icon: 'fa-truck-arrow-right', color: 'text-info' },
          { title: 'Order Delivered', icon: 'fa-house-chimney', color: 'text-success' },
        ];

        return (
          <div key={orderId} className="container h-50 px-4 py-5 mx-auto">
            <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">

              {/* ===== Header ===== */}
              <div className="row d-flex justify-content-between mx-5 pt-3 my-3">
                <div className="container text-center">
                  <p className="h3 text-success mb-3">LANADA</p>
                </div>
                <div className="d-flex">
                  <p className="h5 text-dark">
                    <i className="text-primary fa-solid fa-cart-shopping fa-lg mr-1"></i>
                    Order ID :{' '}
                    <span className="text-success font-weight-bold">
                      <i className="text-secondary fa-solid fa-hashtag mr-1"></i>
                      {orderId.slice(-8).toUpperCase() || '------'}
                    </span>
                  </p>
                </div>
                <div className="d-flex flex-column text-sm-right h5">
                  <p className="mb-0 font-weight-bolder text-monospace">
                    Expected Arrival{' '}
                    <span className="badge badge-pill badge-primary border border-secondary text-light font-weight-bold px-2 py-2 shadow">
                      {dateStr}
                    </span>
                  </p>
                  <p className="font-weight-bold text-monospace pt-3 ml-5">
                    Tracking ID{' '}
                    <span className="badge badge-pill badge-danger border border-secondary text-light font-weight-bold mx-1 px-2 py-2 shadow">
                      {orderId.slice(-8).toUpperCase() || '------'}
                    </span>
                  </p>
                </div>
              </div>

              {/* ===== Progress steps ===== */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="container-fluid p-2 align-items-center">
                      <div className="d-flex justify-content-around">
                        {/* Step 1 */}
                        <button
                          className={`btn rounded-circle ${
                            currentIdx >= 0 ? 'bg-success text-white' : 'bg-secondary text-white'
                          }`}
                          title="Order Confirmed"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                        <span className={`w-50 p-1 mx-n1 rounded mt-auto mb-auto ${
                          currentIdx > 0 ? 'bg-success' : 'bg-secondary'
                        }`}></span>

                        {/* Step 2 */}
                        <button
                          className={`btn rounded-circle ${
                            currentIdx >= 1 ? 'bg-success text-white' : 'bg-secondary text-white'
                          }`}
                          title="Order Shipped"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                        <span className={`w-50 p-1 mx-n1 rounded mt-auto mb-auto ${
                          currentIdx > 1 ? 'bg-success' : 'bg-secondary'
                        }`}></span>

                        {/* Step 3 */}
                        <button
                          className={`btn rounded-circle ${
                            currentIdx >= 2 ? 'bg-success text-white' : 'bg-secondary text-white'
                          }`}
                          title="Out for delivery"
                          style={{ zIndex: 1 }}
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                        <span className={`w-50 p-1 mx-n1 rounded mt-auto mb-auto ${
                          currentIdx > 2 ? 'bg-success' : 'bg-secondary'
                        }`}></span>

                        {/* Step 4 */}
                        <button
                          className={`btn rounded-circle ${
                            currentIdx >= 3 ? 'bg-success text-white' : 'bg-secondary text-white'
                          }`}
                          title="Order Delivered"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== Bottom icons ===== */}
              <div className="row d-inline-flex justify-content-around my-3 py-4 mx-n2">
                {bottomSteps.map((step, i) => (
                  <div
                    key={i}
                    className="row d-inline-flex align-items-center"
                  >
                    <i className={`${step.color} fa-solid ${step.icon} fa-2xl mx-4 mb-3`}></i>
                    <p className="text-dark font-weight-bolder py-1 px-1 mx-n2">
                      {step.title.split(' ')[0]}
                      <br />
                      {step.title.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;