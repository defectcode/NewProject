import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Support from '../../components/Support';
import SupportCenter from '../../components/SupportCenter';

import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShareButton from './Share/ShareButton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ButonShere = ({ isShareFixed }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div 
            className={`flex items-center justify-center w-full h-[40px] bg-transparent z-50 ${
                isShareFixed ? 'fixed bottom-0 left-0 right-0' : 'relative'
            }`}
            style={{ bottom: isShareFixed ? '0' : 'auto' }}
        >
            {isShareFixed ? (
                // Butonul Support când este fixat
                <div className="flex items-center justify-center w-[209px] h-[80px] bg-transparent mb-10">
                    <SupportCenter onClick={openModal} />
                </div>
            ) : (
                // Ambele butoane în poziția inițială
                <div className="flex items-center justify-center w-full px-5 gap-4">
                    <div className="flex-[2]">
                        <Support onClick={openModal} />
                    </div>
                    <ShareButton />
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
};

export default ButonShere;
