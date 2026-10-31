// src/pages/HealthCheck.jsx
import React, { useState } from 'react';

const HealthCheck = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = 'https://backend-3lyx.onrender.com';
  const ADMIN_TOKEN = 'lanada_admin_token_2026';

  const addResult = (name, status, message) => {
    setResults((prev) => [...prev, { name, status, message }]);
  };

  const testEndpoint = async (name, url, options = {}) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json().catch(() => ({}));
      
      if (response.ok) {
        addResult(name, 'success', `✅ Khddam (Status: ${response.status})`);
      } else {
        addResult(name, 'error', `❌ Fchel (Status: ${response.status}) - ${data.message || 'Mochkil'}`);
      }
    } catch (error) {
      addResult(name, 'error', `❌ Connection Error: ${error.message}`);
    }
  };

  const runTests = async () => {
    setLoading(true);
    setResults([]);

    // 1. Test Signup
    await testEndpoint(
      'Auth: Signup',
      `${BACKEND_URL}/api/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `test_${Date.now()}@lanada.local`,
          password: '123456',
          fullName: 'Test User',
          phone: '0612345678'
        })
      }
    );

    // 2. Test Login
    await testEndpoint(
      'Auth: Login',
      `${BACKEND_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@lanada.local',
          password: '123456'
        })
      }
    );

    // 3. Test Admin Login
    await testEndpoint(
      'Admin: Login',
      `${BACKEND_URL}/api/admin/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'lanada.shop.admin.12.33.44.13.!@#$' })
      }
    );

    // 4. Test Promo Create
    await testEndpoint(
      'Promo: Create',
      `${BACKEND_URL}/api/admin/promo/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: ADMIN_TOKEN,
          code: `TEST${Date.now().toString().slice(-4)}`,
          discountPercent: 20,
          maxUses: 5,
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        })
      }
    );

    // 5. Test Promo List
    await testEndpoint(
      'Promo: List',
      `${BACKEND_URL}/api/admin/promo/list?token=${ADMIN_TOKEN}`,
      { method: 'GET' }
    );

    // 6. Test Check Code (b code mashi mawjoud)
    await testEndpoint(
      'Promo: Check Code',
      `${BACKEND_URL}/api/promo/check-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: 'NOTEXIST',
          userId: 'test_user_123'
        })
      }
    );

    // 7. Test Orders (Get)
    await testEndpoint(
      'Orders: Get',
      `${BACKEND_URL}/api/orders?userId=test_user_123`,
      { method: 'GET' }
    );

    // 8. Test Create Order
    await testEndpoint(
      'Orders: Create',
      `${BACKEND_URL}/api/orders`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'test_user_123',
          items: [{ name: 'Test Product', price: 100, quantity: 1, size: 'M' }],
          totalAmount: 100,
          subtotal: 100,
          discount: 0,
          shippingAddress: {
            fullName: 'Test User',
            phone: '0612345678',
            city: 'Casablanca',
            street: 'Rue Test 1',
            state: 'Casablanca-Settat',
            zipCode: '20000',
            country: 'Morocco'
          }
        })
      }
    );

    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
        🩺 Backend Health Check
      </h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Hadi safha bach t3ref wach l'Backend khddam w wach kolchi wajd.
      </p>

      <button
        onClick={runTests}
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '30px'
        }}
      >
        {loading ? '⏳ Testing...' : '🚀 Run Tests'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: r.status === 'success' ? '#10b981' : '#ef4444',
              background: r.status === 'success' ? '#ecfdf5' : '#fef2f2'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
              {r.name}
            </div>
            <div style={{ marginTop: '4px', color: r.status === 'success' ? '#065f46' : '#991b1b' }}>
              {r.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthCheck;