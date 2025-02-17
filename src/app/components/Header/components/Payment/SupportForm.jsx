import React, { useState, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import Image from 'next/image';
import CheckoutButton from '@/components/checkout';

const SupportForm = () => {
  const [amount, setAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [fullWishAmount, setFullWishAmount] = useState(1417); 

  const stripe = useStripe();
  const elements = useElements();

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
        const { paymentIntent, error } = await stripe.confirmCardPayment(CLIENT_SECRET, {
          payment_method: event.paymentMethod.id,
        });
      
        if (error) {
          event.complete('fail');
        } else {
          event.complete('success');
          handlePaymentSuccess(paymentIntent); 
        }
      });
      
    }
  }, [stripe, amount]);

  const handleAmountChange = (amt) => {
    setIsCustomAmount(false);
    setCustomAmount('');
    setAmount(amt);
  };

  const handleCustomAmountClick = () => {
    setIsCustomAmount(true);
    setAmount(customAmount === '' ? 0 : parseFloat(customAmount));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value === '' ? 0 : parseFloat(value));
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    setIsPaymentSuccessful(true);
  
    const userEmail = paymentIntent?.charges?.data[0]?.billing_details?.email || "no-email@example.com";
  
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
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-[350px] h-auto w-full">
      <div className='w-full max-w-md'>
        <p className="mb-5 text-[#B7B7B7] text-[14px] font-inter leading-[1]">Select your gift amount</p>
        <div className="flex flex-wrap justify-between mb-5 text-sm">
          <div className="flex items-center justify-between w-full gap-2">
            <button
              onClick={() => handleAmountChange(1)}
              className={`flex items-center justify-center rounded-xl w-1/4 md:max-w-[82px] min-w-[40px] h-[45px] text-[16px] ${
                amount === 1 && !isCustomAmount
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'
              }`}
            >
              $1
            </button>

            <button
              onClick={() => handleAmountChange(50)}
              className={`flex items-center justify-center rounded-xl w-1/4 md:max-w-[82px] min-w-[40px] h-[45px] text-[16px] ${
                amount === 50 && !isCustomAmount
                  ? 'bg-white text-black font-extrabold'
                  : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'
              }`}
            >
              $50
            </button>

            <button
              onClick={() => handleAmountChange(500)}
              className={`flex items-center justify-center rounded-xl w-1/4 md:max-w-[82px] min-w-[40px] h-[45px] text-[16px] ${
                amount === 500 && !isCustomAmount
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'
              }`}
            >
              $500
            </button>

            <div className="relative flex items-center w-1/4 md:flex-grow">
              <div className={`absolute left-[15px] ml- top-1/2 transform -translate-y-1/2 font-ekMukta text-[16px] ${isCustomAmount ? "text-black font-bold" : 'text-white'}`}>
                $
              </div>
              <input
                type="number"
                pattern="\d*"
                value={customAmount}
                onClick={handleCustomAmountClick}
                onChange={handleCustomAmountChange}
                className={`pl-[25px] py-[10px] placeholder-[#5B5B5B] rounded-xl w-full h-[45px] bg-[#252525] text-black text-base focus:border-[#3e3d3d] focus:outline-none ${
                  isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'
                }`}
                placeholder="Other"
              />
            </div>
          </div>

          <button
            onClick={() => handleAmountChange(fullWishAmount)}
            className={`flex items-center justify-between px-[14px] rounded-xl max-w-full text-[14px] font-ekMukta w-full flex-grow h-[45px] mt-5 ${amount === fullWishAmount ? 'bg-white text-black' : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'}`}
          >
            <p className={`leading-[1] text-[16px] ${amount === fullWishAmount ? 'font-semibold' : ''}`}>Gift the Full Wish Amount </p>
            <p className={`text-[15px] font-ekMukta leading-[1] ${amount === fullWishAmount ? 'font-extrabold' : ''}`}>$1,417</p>
          </button>
        </div>
        <div className="my-5 mt-10 flex justify-between items-center w-full mx-auto leading-[1]">
          <p className="text-white font-ek-mukta text-[16px]">Total</p>
          <div className="flex-grow border-t border-dotted border-gray-600 mx-[33px]"></div>
          <p className="text-white font-ek-mukta mr-1 flex gap-[3px]">${amount}</p>
        </div>
        <p className="mt-10 mb-5 text-[#B7B7B7] text-[14px] font-inter leading-[1]">Select a Payment Method</p>
        <div className="flex items-center justify-between mb-10 gap-[18px]">
          {['stripe', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl font-bold flex items-center justify-center flex-grow h-[45px] ${paymentMethod === method ? 'bg-black text-white' : 'bg-[#252525] border-[1px] border-[#F1F1F1]/10'}`}
            >
              {method === 'paypal' ? (
                <Image src="/icons/paypal.svg" width={48} height={1} alt="paypal" className="w-[48px]" />
              ) : (
                <Image src="/icons/card.svg" width={64} height={1} alt="card" />
              )}
            </button>
          ))}
        </div>

        {paymentMethod === 'paypal' && (
          <div className="paypal-button-container">
            <PayPalButton amount={amount} onSuccess={handlePaymentSuccess} />
          </div>
        )}
        {paymentMethod === 'stripe' && (
          <div className="flex justify-center items-end">
            <CheckoutButton amount={amount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportForm;
