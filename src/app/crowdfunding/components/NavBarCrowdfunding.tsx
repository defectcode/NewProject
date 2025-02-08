
'use client'
import React, { useState, useEffect, useRef } from "react";
import Support from './Support';
import { RiShare2Line } from "react-icons/ri";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from "@/app/components/Header/components/Modal";
import SupportForm from '../../components/Header/components/Payment/SupportForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface NavBarCrowdfundingProps {
    setActiveSection: (section: string) => void;
    activeSection: string;
}

const NavBarCrowdfunding: React.FC<NavBarCrowdfundingProps> = ({ setActiveSection, activeSection }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = navbarRef.current;
            const placeholder = placeholderRef.current;

            if (navbar && placeholder) {
                const offsetTop = placeholder.getBoundingClientRect().top;

                if (offsetTop <= 0) {
                    setIsSticky(true);
                    placeholder.style.height = `${navbar.offsetHeight}px`;
                } else {
                    setIsSticky(false);
                    placeholder.style.height = "0px";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLinkClick = (section: string) => {
        setActiveSection(section); // Actualizează secțiunea activă
    };

    const linkClasses = (section: string) =>
        `relative px-5 text-[16px] flex justify-center items-center font-heebo mt-2 ${
            activeSection === section
                ? "text-[#F1F1F1] font-semibold mt-5 pb-4 border-b-[2px] border-[#F1F1F1]"
                : "text-[#979797] pb-[8px] border-b-[2px] border-transparent"
        }`;

    return (
        <div className="w-full bg-[#1B1B1B]">
            <div ref={placeholderRef} className=""></div>
            <div
                ref={navbarRef}
                id="navbar-crowdfunding"
                className={`flex items-center justify-center w-full h-[68px] ${
                    isSticky
                        ? "fixed top-0 left-0 right-0 z-50 bg-[#000000] transition-all duration-300 ease-in-out"
                        : "bg-[#000000]"
                }`}
            >
                <div className="max-w-[1200px] w-full h-[68px] flex items-center justify-between px-5 lg:px-0">
                    {/* Navigația */}
                    <div className="flex items-center h-[68px] gap-10 font-ekMukta">
                        <button
                            className={linkClasses("overview")}
                            onClick={() => handleLinkClick("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={linkClasses("rewards")}
                            onClick={() => handleLinkClick("rewards")}
                        >
                            Rewards
                        </button>
                        <button
                            className={linkClasses("community")}
                            onClick={() => handleLinkClick("community")}
                        >
                            Community
                        </button>
                        <button
                            className={linkClasses("extras")}
                            onClick={() => handleLinkClick("extras")}
                        >
                            Extras
                        </button>
                    </div>
                    {/* Secțiunea Sticky */}
                    {isSticky && (
                        <div className="flex items-center gap-4 transition-opacity duration-300 ease-in-out">
                            <div className="flex items-center">
                                <Support onClick={openModal} />
                            </div>
                            <button className="flex items-center gap-2 text-[#F5F5F7] border border-[#F5F5F7] h-[48px] px-6 py-2 rounded-xl font-avenirHeavy hover:bg-white hover:text-black">
                                Share
                                <RiShare2Line />
                            </button>
                        </div>
                    )}
                    {/* Modalul pentru suport */}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <Elements stripe={stripePromise}>
                            <SupportForm />
                        </Elements>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default NavBarCrowdfunding;
