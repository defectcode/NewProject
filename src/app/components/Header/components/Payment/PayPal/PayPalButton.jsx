import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';

const PayPalButton = ({ amount, onSuccess }) => {

  const router = useRouter();

  return (
    <PayPalScriptProvider options={{ "client-id": "AfEnL4qp83rEaCb7asE6vWs6LnXEyUvf5z7hGvzEui7faHLUyz3WIEsCbC4qpsV9SrSY2GivGQpL0eSK" }}>
      <div className="w-full rounded-lg overflow-hidden">
        <PayPalButtons
          style={{ layout: 'vertical', color: 'white', shape: 'rect', label: 'paypal', height: 45 }}
          fundingSource="paypal"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toString(),
                },
              }],
            }).then((orderID) => {
              console.log('Order created with ID:', orderID);
              return orderID;
            }).catch(error => {
              console.error('Error creating order:', error);
              router.push('/error');
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(async (details) => {
              const orderID = data.orderID;
              console.log('Order approved with ID:', orderID);
              alert("Transaction completed by " + details.payer.name.given_name);

              const userEmail = details.payer.email_address || "no-email@example.com";

              try {
                const response = await fetch('/api/sendThankYouEmail', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: userEmail, amount }),
                });

                if (!response.ok) {
                  throw new Error('Failed to send email');
                }

                console.log('Thank you email sent successfully');
              } catch (error) {
                console.error('Error sending thank you email:', error);
              }

              onSuccess();
            }).catch(error => {
              console.error('Error capturing order:', error);
              alert('Error capturing order. Please try again.');
            });
          }}
          onError={(err) => {
            console.error('Error in PayPal button:', err);
            alert('Error with PayPal transaction. Please try again.');
            router.push('/error');
          }}
        />
      </div>

      <style jsx>{`
        .paypal-buttons {
          border-radius: 1rem !important; /* Equivalent to rounded-lg */
          overflow: hidden;
        }
      `}</style>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
