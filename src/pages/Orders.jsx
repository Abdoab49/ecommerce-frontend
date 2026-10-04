// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('order_tab');
  const [filterPeriod, setFilterPeriod] = useState('30days');

  // ✅ Fetch orders mn backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://backend-3lyx.onrender.com/api/orders');
        const data = await response.json();
        console.log('📦 All Orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Filter b search
  const filteredOrders = orders.filter(order => {
    const search = searchTerm.toLowerCase();
    return (
      order.shippingAddress?.fullName?.toLowerCase().includes(search) ||
      order.shippingAddress?.phone?.includes(search) ||
      order.shippingAddress?.city?.toLowerCase().includes(search) ||
      order._id?.toLowerCase().includes(search)
    );
  });

  // ✅ Filter b status (tabs)
  const getOrdersByTab = () => {
    switch (activeTab) {
      case 'open_orders':
        return filteredOrders.filter(o => o.status === 'pending' || o.status === 'processing');
      case 'cancelled_orders':
        return filteredOrders.filter(o => o.status === 'cancelled');
      case 'buy_again':
        return filteredOrders;
      default:
        return filteredOrders;
    }
  };

  const currentOrders = getOrdersByTab();

  // ✅ Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // ✅ Format price
  const formatPrice = (price) => `${price} DH`;

  if (loading) {
    return <div className="loading-orders">Loading orders...</div>;
  }

  return (
    <div className="container">
      <div className="customer_details orderList">

        {/* ===== HEADER ===== */}
        <div className="orderTop">
          <h2>My Orders</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search all orders"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="order_tab">
          <ul className="tabs">
            <li
              className={`tab-link ${activeTab === 'order_tab' ? 'current' : ''}`}
              onClick={() => setActiveTab('order_tab')}
            >
              Orders ({filteredOrders.length})
            </li>
            <li
              className={`tab-link ${activeTab === 'open_orders' ? 'current' : ''}`}
              onClick={() => setActiveTab('open_orders')}
            >
              Open Orders
            </li>
            <li
              className={`tab-link ${activeTab === 'cancelled_orders' ? 'current' : ''}`}
              onClick={() => setActiveTab('cancelled_orders')}
            >
              Cancelled Orders
            </li>
          </ul>

          <div className="orderFilter">
            <label>
              {currentOrders.length} order{currentOrders.length !== 1 ? 's' : ''}{' '}
              <span>placed in</span>
            </label>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option value="30days">Last 30 Days</option>
              <option value="6months">Past 6 Month</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {/* ===== ORDERS ===== */}
        <div className="orderCardWrap">
          {currentOrders.length === 0 ? (
            <div className="emptyOrders">
              <h3>No orders found</h3>
              <p>You don't have any orders in this category.</p>
            </div>
          ) : (
            currentOrders.map((order) => (
              <div key={order._id} className="orderCard">

                {/* ===== HEAD ===== */}
                <div className="orderHead">
                  <ul className="orderLeft">
                    <li>
                      <p>
                        ORDER PLACED <span>{formatDate(order.createdAt)}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        TOTAL <span>{formatPrice(order.totalAmount)}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        SHIP TO{' '}
                        <span className="customerName">
                          {order.shippingAddress?.fullName}
                        </span>
                        <span className="cstmrInfo">
                          <strong>{order.shippingAddress?.fullName}</strong>
                          {order.shippingAddress?.phone}
                          <br />
                          {order.shippingAddress?.city}, {order.shippingAddress?.street}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p>
                        STATUS <span>{order.status}</span>
                      </p>
                    </li>
                  </ul>
                  <div className="invoiceDetails">
                    <p>
                      ORDER # {order._id.slice(-10)}{' '}
                      <span>
                        <a href={`/order/${order._id}`}>Order Details</a>
                      </span>
                    </p>
                  </div>
                </div>

                {/* ===== ITEMS ===== */}
                <div className="itemDetails">
                  <h3>
                    {order.status === 'pending' ? 'Processing' : order.status}
                  </h3>
                  <p>Payment: {order.paymentMethod}</p>

                  {order.items && order.items.map((item, index) => (
                    <div key={index} className="itemInfo">
                      <div className="itemImg">
                        <img
                          src={item.image || '/Assets/ShoeStore/tshirt1.png'}
                          alt={item.name}
                        />
                      </div>
                      <div className="itemDesc">
                        <h4>{item.name} ({item.quantity}x)</h4>
                        <p>
                          Size: <span>{item.size || 'M'}</span>
                        </p>
                        <span className="itemPrice">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="btn_group">
                    <button className="buy_again">
                      Return or replace items
                    </button>
                    <button className="gift_btn">
                      Share gift receipt
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Orders;