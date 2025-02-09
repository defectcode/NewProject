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
            <NavbarHome/>

            <div
                className="absolute inset-0 w-full h-[100vh] bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url('/imgs/Crowdfunding/mobileB.png')`,
                    backgroundSize: 'contain', 
                    backgroundPosition: 'top center', 
                    backgroundAttachment: 'scroll',
                }}
            ></div>

            <div className={`${styles.gradientBackground} absolute w-full h-[272px] bottom-0`}></div>


            <div className={`${styles.contentWrapper} relative z-30 h-full flex flex-col justify-end px-5`}>
                <Title title={currentData.title} description={currentData.description} />
                <FundraisingProgress data={currentData} />
            </div>

            {!isVideoVisible && (
                <button
                    onClick={handleScreenClick}
                    className={`${styles.playButton} absolute flex items-center justify-center z-40 bg-transparent`}
                    style={{
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Image src="/imgs/pause.svg" alt="Play Video" width={50} height={50} className="w-[50px] h-[50px]" />
                    </button>
            )}

            {isVideoVisible && (
                <VideoPlayer
                    videoSrc="https://www.dropbox.com/scl/fi/bqxswhnitds5u6pqcd9wq/Video.mp4?rlkey=v3rni8n6k9xj05ydyxq9f10xk&st=zpz57pts&raw=1"
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
