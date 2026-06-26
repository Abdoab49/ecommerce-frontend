// ✅ ✅ ✅ بدون localhost
const API_URL = '/api';

// إرسال طلب شراء
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
};