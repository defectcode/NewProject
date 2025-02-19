import React, { useState, useEffect } from 'react';
import Support from './Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SupportForm from '@/app/components/Header/components/Payment/SupportForm';
import useCountdownTimer from './hooks/useCountdownTimer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FundraisingProgress = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [totalRaised, setTotalRaised] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const countdown = useCountdownTimer();

    const goalAmount = parseInt(data.goalAmount.replace(/,/g, ''), 10);

    useEffect(() => {
        const fetchTotalRaised = async () => {
            try {
                if (!data.paymentLinkId) return; // Asigură-te că există un paymentLinkId
                
                const response = await fetch(`/api/stripe/total?paymentLinkId=${data.paymentLinkId}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                
                const result = await response.json();
                setTotalRaised(result.totalRaised || 0);
                setTotalTransactions(result.totalTransactions || 0);
            } catch (error) {
                console.error("Error fetching total raised:", error);
            }
        };
    
        fetchTotalRaised();
        const interval = setInterval(fetchTotalRaised, 10000);
        return () => clearInterval(interval);
    }, [data.paymentLinkId]); // Dependență pentru actualizare corectă
    
    let rawProgressPercentage = (totalRaised / goalAmount) * 100 || 0;
    let progressPercentage = rawProgressPercentage > 0 && rawProgressPercentage < 1 
        ? rawProgressPercentage.toFixed(1) : Math.round(rawProgressPercentage);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="text-white">
            <div className="flex items-center justify-between mb-2 w-full lg:w-[346px]">
                <span className="text-[20px] lg:text-2xl font-ekmukta font-bold text-[#FFFFFF] leading-[1]">
                    ${totalRaised.toFixed(2)}
                </span>
                <span className="text-md block font-ekMukta text-[15px] md:text-[#E8E8ED] text-[#C1C1C1] leading-[1]">
                    <span className="text-[#FFFFFF] font-semibold font-ekMukta">{countdown}</span>
                </span>
            </div>

            <div className="relative w-full max-w-[400px] mx-auto"> 
                <div className="h-1 bg-[#FFFFFF]/50 rounded-full w-full relative">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }} 
                    ></div>

                    <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `calc(${Math.min(progressPercentage, 100)}% - 6px)` }} 
                    >
                        <div className="w-[8px] h-[8px] rounded-full bg-white flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-between mt-[10px] lg:w-[346px]">
                <div className="flex flex-col">
                    <span className="font-semibold text-[15px] lg:text-[20px]">
                        <span className='font-semibold font-ekMukta text-[15px] md:text-[#E8E8ED] text-[#FFFFFF]'>
                            {progressPercentage}<span className='text-[13px] font-ekMukta'>%</span>&nbsp;
                        </span>
                        <span className="text-[#C1C1C1] font-ekmukta text-[15px]">
                            raised of ${data.goalAmount} wish
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-semibold font-ekMukta text-[16px] lg:text-[20px] md:text-[#E8E8ED] text-[#FFFFFF]">
                        {totalTransactions}
                    </span>
                    <span className="flex items-center text-[#C1C1C1] font-ekMukta font-normal text-[15px]">
                        gifters
                    </span>
                </div>
            </div>

            <div className="hidden md:block mt-2 lg:mt-10">
                <Support onClick={() => setIsModalOpen(true)} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default FundraisingProgress;
