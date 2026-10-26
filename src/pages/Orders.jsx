// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Bdel Background
  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = '#f8f9fa'; // Khalfiya bayda
    return () => { document.body.style.background = originalBg; };
  }, []);

  // ✅ Fetch Orders
  useEffect(() => {
    const userId = localStorage.getItem('lanada_user_id');
    if (!userId) { navigate('/login'); return; }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://backend-3lyx.onrender.com/api/orders?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  // ✅ Download Invoice
  const handleDownloadInvoice = (order) => {
    // (حط هنا كود الفاكتورة اللي بغيتي)
    alert('Invoice download works here');
  };

  // ✅ Filter (Lli mazal ma wsaloch)
  const activeOrders = orders.filter((order) => {
    const status = String(order.status || 'pending').toLowerCase();
    return status !== 'delivered' && status !== 'cancelled';
  });

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">{error}</div>;
  if (activeOrders.length === 0) return <div className="text-center p-5">No active orders.</div>;

  const statusMap = { pending: 0, processing: 1, shipped: 2, delivered: 3 };

  return (
    // ✅ Hna khdmina b Bootstrap Class "container"
    <div className="container py-5">
      
      {activeOrders.map((order) => {
        const orderId = String(order._id || '').slice(-8).toUpperCase();
        const status = String(order.status || 'pending').toLowerCase();
        const currentIdx = statusMap[status] ?? 0;
        
        const items = Array.isArray(order.items) ? order.items : [];
        const shipping = order.shippingAddress || {};
        const subtotal = items.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1), 0);
        const shippingFee = subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;
        const total = Number(order.totalAmount || subtotal + shippingFee);

        // ✅ Timeline logic (L'5 steps bhal CodePen)
        // step-1: Placed (0)
        // step-2: Accepted (1)
        // step-3: Packed (2)
        // step-4: Shipped (3)
        // step-5: Delivered (4)
        let stepIndex = currentIdx;
        if (status === 'shipped') stepIndex = 3;
        if (status === 'delivered') stepIndex = 4;
        
        // Ila bghiti t-testi ghir l'awla (Placed) bach tchof l'animation, bdel had l'variable l 0
        // stepIndex = 0; 

        return (
          <div key={order._id} className="order my-3 bg-light shadow-sm" style={{ borderRadius: '10px' }}>
            <div className="row">
              {/* Jiha L'yasar: Order Summary */}
              <div className="col-lg-4">
                <div className="d-flex flex-column justify-content-between order-summary h-100 py-3">
                  <div className="d-flex align-items-center">
                    <div className="text-uppercase font-weight-bold">Order #{orderId}</div>
                    <div className="blue-label ms-auto text-uppercase" style={{ borderRadius: '4px' }}>
                      {status}
                    </div>
                  </div>
                  <div className="fs-8 mt-2">Products #{items.length}</div>
                  <div className="fs-8">{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div className="rating d-flex align-items-center pt-1 mt-2">
                    <img src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png" alt="like" style={{ width: '20px' }} />
                    <span className="px-2">Rating:</span>
                    <span className="fas fa-star text-warning"></span>
                    <span className="fas fa-star text-warning"></span>
                    <span className="fas fa-star text-warning"></span>
                    <span className="fas fa-star text-warning"></span>
                    <span className="far fa-star text-warning"></span>
                  </div>
                </div>
              </div>

              {/* Jiha L'imin: Status w Timeline */}
              <div className="col-lg-8">
                <div className="d-sm-flex align-items-sm-start justify-content-sm-between py-3">
                  <div className="status font-weight-bold">Status : {status}</div>
                  <button className="btn btn-primary text-uppercase" onClick={() => handleDownloadInvoice(order)}>
                    Invoice
                  </button>
                </div>
                
                {/* ✅ Timeline b dabt (Progressbar) */}
                <div className="progressbar-track">
                  <ul className="progressbar">
                    {/* Step 1: Placed */}
                    <li id="step-1" className={`text-muted ${stepIndex >= 0 ? 'green' : ''}`}> 
                      <span className="fas fa-gift"></span> 
                    </li>
                    {/* Step 2: Accepted */}
                    <li id="step-2" className={`text-muted ${stepIndex >= 1 ? 'green' : ''}`}> 
                      <span className="fas fa-check"></span> 
                    </li>
                    {/* Step 3: Packed */}
                    <li id="step-3" className={`text-muted ${stepIndex >= 2 ? 'green' : ''}`}> 
                      <span className="fas fa-box"></span> 
                    </li>
                    {/* Step 4: Shipped */}
                    <li id="step-4" className={`text-muted ${stepIndex >= 3 ? 'green' : ''}`}> 
                      <span className="fas fa-truck"></span> 
                    </li>
                    {/* Step 5: Delivered */}
                    <li id="step-5" className={`text-muted ${stepIndex >= 4 ? 'green' : ''}`}> 
                      <span className="fas fa-box-open"></span> 
                    </li>
                  </ul>
                  <div id="tracker"></div>
                  {/* ✅ Khat L'Molawan (Custom) */}
                  <div
                    className="tracker-progress"
                    style={{ 
                      position: 'absolute', 
                      borderTop: '1px solid #007965', 
                      height: 0, 
                      top: 25, 
                      left: 0, 
                      zIndex: 2, 
                      transition: 'width 0.5s ease',
                      width: `${(stepIndex / 4) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ✅ Products (bach ybano) */}
            <div className="row mt-3 border-top pt-3">
              <div className="col-12">
                <h6 className="font-weight-bold">Products</h6>
                {items.map((item, i) => (
                  <div key={i} className="d-flex align-items-center border-bottom py-2">
                    <img src={item.image || '/Assets/ShoeStore/tshirt1.png'} alt={item.name} className="mr-3" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <div>
                      <div className="font-weight-bold">{item.name || 'Product'}</div>
                      <div className="text-muted small">Qty: {item.quantity || 1} | Size: {item.size || 'M'}</div>
                    </div>
                    <div className="ml-auto font-weight-bold">{item.price} DH</div>
                  </div>
                ))}
                <div className="text-right mt-3">
                  <div>Subtotal: {subtotal.toFixed(2)} DH</div>
                  <div>Shipping: {shippingFee.toFixed(2)} DH</div>
                  <div className="font-weight-bold" style={{ fontSize: '1.2rem' }}>Total: {total.toFixed(2)} DH</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;