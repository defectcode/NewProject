// import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import Support from '../../components/Support';
import SupportCenter from '../SupportCenter';
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OpenPopUp from './Share/OpenPopUp';
import Support from "@/app/wishlist/components/Support";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GiftSection = () => {



    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div
            className={`flex items-center justify-center w-full h-auto bg-transparent z-50`}
        >

            <div className="flex items-center justify-center w-full gap-[18px] bg-transparent mt-[18px] mb-5">
                <div className="flex-[2]">
                    <Support onClick={openModal} />
                </div>
                <OpenPopUp />
            </div>
            

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
};

export default GiftSection;