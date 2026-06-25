const API_URL = 'http://localhost:4000';

// إرسال طلب شراء
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
};