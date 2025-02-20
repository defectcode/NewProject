'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { images } from '/src/app/wishlist/constants/carouselData.jsx'
import Title from '../wishlist/components/Title';
import FundraisingProgress from '../wishlist/components/Progres';
import styles from './style/Header.module.css';  
import ButonShere from '../Crowdfunding/components/mobile/ButonShere';
import GiftSection from '../Crowdfunding/components/mobile/GiftSection';
import NavBarCrowd from '/src/app/wishlist/components/mobile/NavBarCrowd'
import VideoPlayer from './components/VideoMobile/VideoPlayer';

export default function HeaderCrowdfundingMobile() {
    const headerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    const currentData = images[0];
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const buttonRef = useRef(null); 
    const [isShareFixed, setIsShareFixed] = useState(false); 
  
    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden');
    };
  
    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    const openSupportModal = () => {
        setIsSupportModalOpen(true);
    };
    
    const closeSupportModal = () => {
        setIsSupportModalOpen(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsShareFixed(!entry.isIntersecting); 
            },
            { threshold: 0 } 
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);


    useEffect(() => {
        const updateHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
        };

        updateHeight();

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

  return (
    <div className="relative max-md:h-[var(--viewport-height)] w-auto text-white font-ekMukta overflow-hidden">    

        <div
            ref={headerRef}
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/Crowdfunding/5294511292218891886.webp')] max-md:background-fixed`}
        ></div>
            
        <div
            className="absolute w-full h-[272px] bottom-0 pointer-events-none"
            style={{
                background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0) 100%)",
            }}
        ></div>

        <div className={`${styles.contentWrapper} relative h-full flex flex-col justify-end px-5`}>
            <Title title={currentData.title} description={currentData.description} />
            {/* <FundraisingProgress data={{ goalAmount: "1417", paymentLinkId: "plink_1QtnQ7Eop8dXaHk5KT3KWoFA" }} /> */}
            <FundraisingProgress data={{ goalAmount: "1417", paymentLinkId: "plink_1QtXZhHWwCgaMkWCzM9cDLUa" }} />

            <GiftSection />
        </div>

        {!isVideoVisible && !isModalOpen && (
            <button
                onClick={handleScreenClick}
                className={`absolute flex items-center justify-center bg-transparent transition-opacity duration-300 ${
                    isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Image src="/imgs/pause.svg" alt="Play Video" width={50} height={50} className="w-[50px] h-[50px] z-20" />
            </button>
        )}

        {isVideoVisible && (
            <VideoPlayer
                videoSrc="https://valeryfain.com/video/Video.webm"
                onClose={handleClose}
            />
        )}

        <div ref={buttonRef} className="relative w-full">
            <ButonShere isShareFixed={isShareFixed} />
        </div>

    </div>
  );
}