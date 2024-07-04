import React, { useContext, useState } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/remove_icon.png';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext);
    const { id } = useContext(UserContext);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const subtotal = getTotalCartAmount();
    const shippingFee = subtotal === 0 ? 0 : (subtotal < 300 ? 15 : 0);
    const totalAmount = subtotal + shippingFee;

    const handleProceedToCheckout = () => {
        if (!id) {
            setErrorMessage("You need to be logged in to proceed to checkout.");
            return;
        }
        setShowCheckoutForm(true);
    };

    const handleCheckoutSubmit = async (formData) => {
        const orderDetails = {
            userId: id,
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            items: Object.keys(cartItems)
                .filter(key => !key.includes('flavour') && cartItems[key] > 0)
                .map(key => {
                    const product = all_product.find(p => p.id === parseInt(key));
                    return {
                        productId: key,
                        productName: product.name,
                        flavour: cartItems[`${key}_flavour`],
                        quantity: cartItems[key],
                        price: product.price
                    };
                }),
        };

        console.log('Order Details:', orderDetails);

        if (!orderDetails.userId) {
            console.error('User Id is missing');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7286/Order/createOrder', orderDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Order response:', response.data);
            clearCart();
            setOrderPlaced(true);
            setShowCheckoutForm(false);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error placing order:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="cartitems">
            {showCheckoutForm && (
                <CheckoutForm onSubmit={handleCheckoutSubmit} onClose={() => setShowCheckoutForm(false)} totalAmount={totalAmount} />
            )}
            {orderPlaced && (
                <div className="order-confirmation">
                    <h2>Your order has been placed successfully!</h2>
                </div>
            )}
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Flavour</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>{e.price} $</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>{cartItems[`${e.id}_flavour`]}</p>
                                <p>{e.price * cartItems[e.id]}$</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total</h1>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>{subtotal}$</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>{shippingFee}$</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>{totalAmount}$</h3>
                    </div>
                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <button onClick={handleProceedToCheckout}>Proceed to checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
