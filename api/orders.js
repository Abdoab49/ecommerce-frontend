// frontend/api/orders.js
export default async function handler(req, res) {
  // ✅ السماح لجميع المواقع بإرسال الطلبات
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ الرد على طلبات OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ قبول طلبات POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    // ✅ إنشاء الطلب
    const order = {
      id: Date.now().toString(),
      items: items || [],
      totalAmount: totalAmount || 0,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'cash_on_delivery',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('📦 New Order:', order);

    // ✅ حفظ في localStorage (مؤقت)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: order,
      totalAmount: order.totalAmount
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ 
      message: 'Failed to create order', 
      error: error.message 
    });
  }
}