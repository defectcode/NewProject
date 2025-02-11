'use client'
import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';  
import ButonShere from '../Crowdfunding/components/mobile/ButonShere';
import Image from "next/image";
import NavbarHome from "../components/Header/components/NavbarHome";


const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const containerRef = useRef(null);
    const buttonRef = useRef(null); 
    const [isShareFixed, setIsShareFixed] = useState(false); 
    const [isMobile, setIsMobile] = useState();

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

    useEffect(() => {
        const updateHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

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

    return (
        <div
            ref={containerRef}
            className={`${styles.header} relative w-auto text-white font-ekMukta overflow-hidden`}
        >
            {/* <NavbarHome/> */}

            <div
                className={`absolute inset-0 w-full bg-center bg-no-repeat max-md:w-auto ${isVideoVisible ? 'bg-opacity-50 blur-sm' : ''}`}
                style={{
                    backgroundImage: `url('/imgs/Crowdfunding/dsdse.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

{/* 
            <div
                className={`absolute inset-0 w-full h-screen bg-black bg-no-repeat bg-cover bg-center ${isVideoVisible ? 'bg-opacity-50 blur-sm' : ''}`}
                style={{
                    backgroundImage: `url('/imgs/Crowdfunding/mobileB.webp')`,
                }}
            ></div> */}



            <div
                className="absolute w-full h-[272px] bottom-0 z-20 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0) 100%)",
                }}
            ></div>


            <div className={`${styles.contentWrapper} relative z-30 h-full flex flex-col justify-end px-5`}>
                <Title title={currentData.title} description={currentData.description} />
                <FundraisingProgress data={currentData} />
            </div>

            {!isVideoVisible && (
                <button
                    onClick={handleScreenClick}
                    className={`${styles.playButton} absolute flex items-center justify-center z-40 bg-transparent`}
                    style={{
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Image src="/imgs/pause.svg" alt="Play Video" width={50} height={50} className="w-[50px] h-[50px]" />
                    </button>
            )}

            {isVideoVisible && (
                <VideoPlayer
                    videoSrc="https://valeryfain.com/video/NewVideo.webm"
                    onClose={handleClose}
                />
            )}

            <Icons handleScreenClick={handleScreenClick} />

            <div ref={buttonRef} className="relative w-full">
                <ButonShere isShareFixed={isShareFixed} />
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
