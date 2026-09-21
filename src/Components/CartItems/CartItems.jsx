import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {

    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        removeFromCart
    } = useContext(ShopContext);

    // حساب الضريبة (مثال: 13%)
    const taxRate = 0.13;
    const subtotal = getTotalCartAmount();
    const shippingFee = subtotal > 0 ? 10.00 : 0;
    const tax = subtotal * taxRate;
    const total = subtotal + shippingFee + tax;

    return (
        <div className='container'>
            <div className="card cart">
                <label className="title">CHECKOUT</label>
                
                <div className="steps">
                    <div className="step">
                        {/* قسم الشحن */}
                        <div>
                            <span>SHIPPING</span>
                            <p>221B Baker Street, W1U 8ED</p>
                            <p>London, United Kingdom</p>
                        </div>
                        
                        <hr />
                        
                        {/* قسم المنتجات في السلة */}
                        <div>
                            <span>YOUR CART ({Object.keys(cartItems).filter(id => cartItems[id] > 0).length} items)</span>
                            
                            {all_product.map((e) => {
                                if (cartItems[e.id] > 0) {
                                    return (
                                        <div key={e.id} className="cart-item">
                                            <div className="cart-item-details">
                                                <img src={e.image} alt={e.name} className="cart-item-image" />
                                                <div className="cart-item-info">
                                                    <p className="cart-item-name">{e.name}</p>
                                                    <p className="cart-item-price">${e.new_price} × {cartItems[e.id]}</p>
                                                </div>
                                            </div>
                                            <button 
                                                className="cart-item-remove"
                                                onClick={() => removeFromCart(e.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                        
                        <hr />
                        
                        {/* قسم الكوبون */}
                        <div className="promo">
                            <span>HAVE A PROMO CODE?</span>
                            <form className="form" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Enter a Promo Code" className="input_field" />
                                <button type="submit">Apply</button>
                            </form>
                        </div>
                        
                        <hr />
                        
                        {/* قسم الدفع */}
                        <div className="payments">
                            <span>PAYMENT</span>
                            <div className="details">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                                <span>Shipping:</span>
                                <span>${shippingFee.toFixed(2)}</span>
                                <span>Tax (13%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card checkout">
                <div className="footer">
                    <label className="price">${total.toFixed(2)}</label>
                    <button className="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems