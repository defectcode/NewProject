'use client'
// HeaderSeriesConcept.jsx
import React, { useRef, useState } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import VideoPlayer from './components/Video/VideoPlayer';  
import Icons from './components/Video/Icons';  
import { images } from './constants/carouselData';
import Image from "next/image";

const HeaderSeriesConcept = () => {
    const currentData = images[0];
    const headerRef = useRef(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden'); 
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
    };

    return (
        <div ref={headerRef} className="relative min-h-screen">
            <div className="header relative bg-cover bg-center min-h-screen bg-no-repeat bg-mobileConcept sm:bg-desktop">
                <div className="max-w-[1200px] absolute top-0 right-0 h-full w-full sm:w-[60%] bg-gradient-to-t from-black/95 via-black/95 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-black/90 sm:to-black/90 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-0 md:pl-[150px]">
                    <div className="flex flex-col gap-4 sm:gap-20 mb-2 lg:mb-0 ">
                        <Title title={currentData.title} description={currentData.description} />
                        <FundraisingProgress data={currentData} />
                    </div>
                </div>
                
                <button 
                    onClick={handleScreenClick} 
                    className="absolute inset-0 flex items-center justify-center z-20 bg-transparent xl:mr-[550px] lg:mr-[450px] md:mr-[350px]"
                >
                    <Image width={100} height={100} src="/imgs/pause.svg" alt="Play Video" className="w-[100px] h-[100px]" />
                </button>
            </div>


            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="https://valeryfain.com/video/desktop.webm" 
                    onClose={handleClose}
                    isMuted={isMuted}
                />
            )}

            <Icons 
                isMuted={isMuted} 
                setIsMuted={setIsMuted} 
                handleScreenClick={handleScreenClick}
            />

            <style jsx>{`
                @media (max-width: 640px) {
                    .bg-gradient-to-t {
                        height: 50%; 
                        bottom: 0; 
                        top: auto;
                    }
                }
            `}</style>
        </div>
    );
}

export default HeaderSeriesConcept;

// VideoPlayer.jsx




