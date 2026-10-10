// frontend/api/order.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to fetch orders', 
        error: error.message 
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Order must have at least one item'
        });
      }

      const order = {
        id: Date.now().toString(),
        items: items || [],
        totalAmount: totalAmount || 0,
        shippingAddress: {
          fullName: shippingAddress?.fullName || '',
          phone: shippingAddress?.phone || '',
          city: shippingAddress?.city || '',
          region: shippingAddress?.region || '',     // ✅ Zid hadi
          street: shippingAddress?.street || '',
          state: shippingAddress?.state || 'Casablanca-Settat',
          zipCode: shippingAddress?.zipCode || '20000',
          country: shippingAddress?.country || 'Morocco'
        },
        paymentMethod: paymentMethod || 'cash_on_delivery',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      console.log('📦 New Order:', order);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order: order,
        totalAmount: order.totalAmount
      });

    } catch (error) {
      console.error('❌ Error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to create order', 
        error: error.message 
      });
    }
  }

  return res.status(405).json({ 
    success: false,
    message: 'Method not allowed' 
  });
}