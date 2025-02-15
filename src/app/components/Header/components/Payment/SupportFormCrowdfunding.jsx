import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import Image from 'next/image';
import CheckoutButton from "@/components/checkout";


const SupportFormCrowdfunding = ({selectedRewardName, selectedRewardPrice}) => {
  const [amount, setAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  
  const [extraGift, setExtraGift] = useState(0);
  const [customGift, setCustomGift] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  
  const handleGiftChange = (amount) => {
    setIsCustom(false);
    setExtraGift(amount);
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomGift(value);
    setExtraGift(value ? parseFloat(value) : 0);
    setIsCustom(true);
  };




  const stripe = useStripe();

  const CLIENT_SECRET = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'; 

  useEffect(() => {
    if (stripe && amount > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Support Amount',
          amount: amount * 100,
        },
        
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const { error } = await stripe.confirmCardPayment(
          CLIENT_SECRET, 
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );
        if (error) {
          event.complete('fail');
        } else {
          event.complete('success');
          const { error: confirmError } = await stripe.confirmCardPayment(CLIENT_SECRET);
          if (confirmError) {
            console.log('Payment failed', confirmError);
          } else {
            handlePaymentSuccess();
          }
        }
      });
    }
  }, [stripe, amount]);

  const rewardPrice = parseFloat(
    selectedRewardPrice.replace(/[^0-9.]/g, '') || '0'
  );

  const total = rewardPrice + extraGift;


  const handlePaymentSuccess = async (paymentIntent) => {
    setIsPaymentSuccessful(true);
  
    const email = paymentIntent.charges.data[0].billing_details.email; 
    const firstName = paymentIntent.charges.data[0].billing_details.name?.split(' ')[0];
  
    try {
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      });
  
      if (!response.ok) {
        console.error('Failed to send thank-you email');
      }
    } catch (error) {
      console.error('Error sending thank-you email:', error);
    }
  };
  

  
  return (
    <div className="flex flex-col justify-center items-center min-h-[350px] h-auto w-full font-heebo">
      <div className='w-full max-w-md'>
        <p className="text-[#B7B7B7] text-[12px] font-light font-inter">You’ve selected</p>
        <div className="flex flex-col justify-between gap-2 mb-5 text-sm">

          <div className='flex items-center justify-between text-[15px] bg-[#000000] rounded-[10px] px-5 mt-5 h-[45px]'>
            <h2 className='text-[#FFFFFF] font-semibold font-ekMukta text-[14px]'>{selectedRewardName}</h2>
            <button className='bg-none text-[#FFFFFF]  rounded-[10px] font-bold'>
              <span style={{ marginRight: '2px' }}>$</span>{selectedRewardPrice.replace('$', '').trim()}
            </button>
          </div>
          <h2 className="text-white text-sm font-semibold mt-3">Want to add an extra gift?</h2>
        <div className="flex justify-between gap-2 mt-1">
          {[1, 10, 50].map((amt) => (
            <button
              key={amt}
              onClick={() => handleGiftChange(amt)}
              className={`flex justify-center items-center rounded-[10px] w-1/4 h-[45px] text-sm font-bold ${
                extraGift === amt && !isCustom ? 'bg-white text-black' : 'bg-[#252525] text-white border border-[#444]'
              }`}
            >
              ${amt}
            </button>
          ))}
          <input
            type="text"
            value={customGift}
            onChange={handleCustomInputChange}
            placeholder="$ Other"
            className="w-1/4 h-[45px] text-center rounded-[10px] bg-[#252525] text-white border border-[#444] focus:bg-white focus:text-black focus:outline-none"
          />
        </div>

        </div>
        <div className="my-5 mt-5 flex justify-between items-center w-full mx-auto">
          <p className="text-[#FFFFFF] text-[14px]">Total:</p>
          <div className="flex-grow border-t border-dotted border-[#A1A1A1]/20 mx-6"></div>
          <p className="text-[#FFFFFF] mr-1 flex gap-[3px]">${total.toFixed(2)}</p>
        </div>
        <p className="mt-5 mb-5 text-[#B7B7B7] font-inter text-[12px] font-light flex justify-start ml-1">Select a Payment Method:</p>
        <div className="flex items-center justify-between mb-4 gap-5">
          {['stripe', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl font-bold flex items-center justify-center flex-grow h-[45px] mb-5 ${
                paymentMethod === method ? 'bg-[#000000] text-white ' : 'bg-transparent text-[#979797] border-2 border-[#F1F1F1]/5'
              }`}
            >
              {method === 'paypal' ? (
                <div className="flex items-center px-5 max-md:px-2">
                    <Image src="/icons/paypal.svg" width={48} height={1} alt="paypal" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                    <Image src="/icons/card.svg" width={64} height={1} alt="card" />

                </div>
              )}
            </button>
          ))}
        </div>

        {paymentMethod === 'paypal' && (
          <div className="paypal-button-container">
            <PayPalButton amount={total} onSuccess={handlePaymentSuccess} />
          </div>
        )}
        {paymentMethod === 'stripe' && (
          <div className="flex justify-center items-end h-[48px]">
            <CheckoutButton amount={total} />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SupportFormCrowdfunding;
