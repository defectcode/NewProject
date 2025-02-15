// import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import Support from '../../components/Support';
import SupportCenter from '../../components/SupportCenter';
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OpenPopUp from './Share/OpenPopUp';
import Support from "@/app/wishlist/components/Support";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ButonShere = ({ isShareFixed }) => {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        if (isShareFixed) {
            setTimeout(() => setShowButtons(true), 50);
        } else {
            setShowButtons(false);
        }
    }, [isShareFixed]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div
            className={`${
                isShareFixed ? 'fixed bottom-0 left-0 right-0' : 'relative'
            } flex items-center justify-center w-full h-auto bg-transparent z-50`}
        >

            {isShareFixed ? (
                <AnimatePresence>
                    {isShareFixed && showButtons && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }} 
                            animate={{ y: 0, opacity: 1 }} 
                            exit={{ y: 100, opacity: 0 }} 
                            transition={{ duration: 0.4, ease: "easeOut" }} 
                            className="fixed bottom-0 left-0 right-0 flex items-center justify-center w-full h-auto bg-transparent z-50"
                        >
                            <div className="flex items-center justify-center w-full px-5 gap-5 bg-transparent mb-5">
                                <div className="flex-[2]">
                                    <Support onClick={openModal} />
                                </div>
                                <OpenPopUp />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             ) : (
                <div className="flex items-center justify-center w-full px-5 gap-[18px] bg-transparent mt-[18px] mb-5">
                    <div className="flex-[2]">
                        <Support onClick={openModal} />
                    </div>
                    <OpenPopUp />
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
