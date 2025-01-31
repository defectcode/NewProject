import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Support from '../../components/Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShareButton from './Share/ShareButton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ButonShere = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 lg:static flex items-center justify-between px-5 w-full h-[60px] bg-[#1B1B1B] lg:hidden z-50">
            <div className="flex items-center justify-between w-full  gap-4">
                <div className="flex-[2]">
                    <Support onClick={openModal} />
                </div>
                <ShareButton/>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default ButonShere;
