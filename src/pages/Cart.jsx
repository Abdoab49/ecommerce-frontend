// src/pages/Cart.jsx - الجزء المعدل من handleCheckout

// ===== ✅ زر Add Manifest =====
const handleCheckout = async () => {
  console.log('🛒 Starting checkout...');
  
  if (isAnimating || loading) {
    console.log('⏳ Already processing...');
    return;
  }

  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  if (!fullName || !city || !phone || !address) {
    alert('Please fill in all shipping information!');
    return;
  }

  setLoading(true);
  console.log('📦 Cart Items:', cartItems);
  
  try {
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = extractPrice(item.price);
      const qty = item.quantity || 1;
      return sum + (price * qty);
    }, 0);

    const finalAmount = promoPrice > 0 && totalAmount >= 10 
      ? totalAmount - promoPrice 
      : totalAmount;

    console.log('💰 Total Amount:', finalAmount);

    const orderItems = cartItems.map(item => ({
      name: item.name || item.title || 'Unknown Product',
      price: extractPrice(item.price),
      quantity: item.quantity || 1,
      size: item.size || 'M',
      image: getProductImage(item),
      category: item.category || 'T-Shirts',
      brand: item.brand || 'National Team'
    }));

    console.log('📦 Order Items:', orderItems);

    // ✅ ✅ ✅ استخدام API المحلي (order.js)
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: finalAmount,
        subtotal: totalAmount,
        discount: promoPrice,
        shippingAddress: {
          fullName: fullName,
          phone: phone,
          city: city,
          street: address,
          state: 'Casablanca-Settat',
          zipCode: '20000',
          country: 'Morocco'
        },
        paymentMethod: 'cash_on_delivery'
      })
    });

    const result = await response.json();
    console.log('📡 Response:', response.status, result);

    if (response.ok) {
      alert(`✅ Order placed successfully! Total: ${finalAmount} DH`);
      
      localStorage.removeItem('cart');
      localStorage.removeItem('cartItems');
      setCartItems([]);
      clearCart();
      
      navigate('/cart');
    } else {
      alert('❌ Failed to place order: ' + (result.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert('❌ Error placing order: ' + error.message);
  } finally {
    setLoading(false);
  }
};