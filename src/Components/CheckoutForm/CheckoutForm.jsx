import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import "./CheckoutForm.css";

const CheckoutForm = ({ onSubmit, onClose, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePaymentSuccess = (details) => {
    setIsSubmitted(false);
    onSubmit(formData);
  };

  return (
    <div className="checkout-form-overlay">
      <div className="checkout-form-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Checkout Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {isSubmitted && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalAmount.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handlePaymentSuccess(details);
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
              setIsSubmitted(false);
            }}
            style={{ layout: "horizontal" }}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
