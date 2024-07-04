import React, { useEffect } from "react";

const PayPalButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=AaKhG0YMkdlLnORYF_b42IL3pTf3tXnoMjw7q3zkbcrEbYSZu_yitLXJ2z_PGkPvj-6f2DoxYjX_VTuT`;
      script.onload = () => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                onSuccess(details);
              });
            },
            onError: (err) => {
              console.error("PayPal Checkout onError", err);
            },
          })
          .render("#paypal-button-container");
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      loadPayPalScript();
    } else {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              onSuccess(details);
            });
          },
          onError: (err) => {
            console.error("PayPal Checkout onError", err);
          },
        })
        .render("#paypal-button-container");
    }
  }, [amount, onSuccess]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
