// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bootdey.css';

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
      <div className="container padding-bottom-3x mb-1">
        <div className="text-center py-5" style={{ color: '#606975' }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container padding-bottom-3x mb-1">
        <div className="text-center py-5">
          <h3>Something went wrong</h3>
          <p style={{ color: '#606975' }}>{error}</p>
          <button
            className="btn btn-outline-primary btn-rounded btn-sm"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container padding-bottom-3x mb-1">
        <div className="text-center py-5">
          <h3>No orders</h3>
          <p style={{ color: '#606975' }}>Start shopping to place your first order!</p>
          <button
            className="btn btn-outline-primary btn-rounded btn-sm"
            onClick={() => navigate('/')}
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  // ✅ Status labels + mapping
  const statusMap = {
    pending: 0,
    processing: 1,
    quality_check: 2,
    shipped: 3,
    delivered: 4,
  };

  const statusLabels = {
    pending: 'Checking Quality',
    processing: 'Processing',
    quality_check: 'Checking Quality',
    shipped: 'Product Dispatched',
    delivered: 'Product Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <div className="container padding-bottom-3x mb-1">
      {orders.map((order) => {
        const orderId = String(order._id || order.id || '');
        const status = String(order.status || 'pending').toLowerCase();
        const items = Array.isArray(order.items) ? order.items : [];
        const shipping = order.shippingAddress || {};

        const currentIdx = statusMap[status] ?? 0;

        const dateStr = order.createdAt
          ? new Date(order.createdAt)
              .toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
              .toUpperCase()
          : 'SEP 09, 2017';

        return (
          <div key={orderId} className="mb-5">
            {/* ===== Card — Design Bootdey ===== */}
            <div className="card mb-3">
              {/* Header */}
              <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
                <span className="text-uppercase">Tracking Order No - </span>
                <span className="text-medium">
                  {orderId.slice(-10).toUpperCase() || '------'}
                </span>
              </div>

              {/* Details Row */}
              <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                <div className="w-100 text-center py-1 px-2">
                  <span className="text-medium">Shipped Via:</span> Cash on Delivery
                </div>
                <div className="w-100 text-center py-1 px-2">
                  <span className="text-medium">Status:</span>{' '}
                  {statusLabels[status] || status}
                </div>
                <div className="w-100 text-center py-1 px-2">
                  <span className="text-medium">Expected Date:</span> {dateStr}
                </div>
              </div>

              {/* Steps */}
              <div className="card-body">
                <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                  {/* Step 1 */}
                  <div
                    className={`step ${
                      status !== 'cancelled' && currentIdx >= 0 ? 'completed' : ''
                    }`}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-cart"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Confirmed Order</h4>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`step ${
                      status !== 'cancelled' && currentIdx >= 1 ? 'completed' : ''
                    }`}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-config"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Processing Order</h4>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`step ${
                      status !== 'cancelled' && currentIdx >= 2 ? 'completed' : ''
                    }`}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-medal"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Quality Check</h4>
                  </div>

                  {/* Step 4 */}
                  <div
                    className={`step ${
                      status !== 'cancelled' && currentIdx >= 3 ? 'completed' : ''
                    }`}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-car"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Product Dispatched</h4>
                  </div>

                  {/* Step 5 */}
                  <div
                    className={`step ${
                      status !== 'cancelled' && currentIdx >= 4 ? 'completed' : ''
                    }`}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-home"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Product Delivered</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Footer ===== */}
            <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center mb-4">
              <div className="custom-control custom-checkbox mr-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  id={`notify-${orderId}`}
                  defaultChecked
                />
                <label
                  className="custom-control-label"
                  htmlFor={`notify-${orderId}`}
                >
                  Notify me when order is delivered
                </label>
              </div>
              <div className="text-left text-sm-right">
                <button
                  className="btn btn-outline-primary btn-rounded btn-sm"
                  type="button"
                >
                  View Order Details
                </button>
              </div>
            </div>

            {/* ===== Client Info ===== */}
            <div className="row mb-3">
              <div className="col-md-6 mb-2">
                <div className="bg-secondary p-3 rounded">
                  <h6 className="text-uppercase text-muted mb-2">Client</h6>
                  <p className="mb-1 font-weight-bold">
                    {shipping.fullName || '—'}
                  </p>
                  <p className="mb-1 text-muted small">
                    {shipping.phone || '—'}
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="bg-secondary p-3 rounded">
                  <h6 className="text-uppercase text-muted mb-2">
                    Shipping Address
                  </h6>
                  <p className="mb-1 font-weight-bold">
                    {shipping.street || '—'}
                  </p>
                  <p className="mb-1 text-muted small">
                    {shipping.city || '—'}
                    {shipping.region ? ` — ${shipping.region}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* ===== Products ===== */}
            <div className="mb-4">
              <h6 className="text-uppercase text-muted mb-2">
                Products ({items.reduce((s, i) => s + Number(i.quantity || 1), 0)})
              </h6>
              <div className="bg-secondary p-3 rounded">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`d-flex align-items-center ${
                      idx < items.length - 1 ? 'mb-2 pb-2 border-bottom' : ''
                    }`}
                  >
                    <img
                      src={item.image || '/Assets/ShoeStore/tshirt1.png'}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '4px',
                        marginRight: '12px',
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="font-weight-bold">
                        {item.name || 'Product'}
                      </div>
                      <div className="text-muted small">
                        Qty: {item.quantity || 1}
                        {item.size ? ` • Size: ${item.size}` : ''}
                      </div>
                    </div>
                    <div className="font-weight-bold">
                      {item.price} DH
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Total ===== */}
            <div className="d-flex justify-content-between align-items-center bg-secondary p-3 rounded">
              <span className="text-uppercase text-muted font-weight-bold">
                Total
              </span>
              <span className="h5 mb-0 font-weight-bold">
                {order.totalAmount} DH
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;