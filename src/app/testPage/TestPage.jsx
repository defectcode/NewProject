'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Crowdfunding from '../wishlist/page';
import { images } from '/src/app/wishlist/constants/carouselData.jsx'
import Title from '../wishlist/components/Title';
import FundraisingProgress from '../wishlist/components/Progres';
import Icons from '../wishlist/components/Video/Icons';
import ButonShere from '../wishlist/components/mobile/ButonShere';
import DesktopWorkPage from '../wishlist/DesktopWorkPage';
import NavBarCrowd from '/src/app/wishlist/components/mobile/NavBarCrowd'

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);

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

    // Setăm înălțimea doar o singură dată la încărcare
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="relative h-[100dvh] max-md:h-[var(--viewport-height)] w-auto text-white font-ekMukta overflow-hidden">        
      <div
        ref={headerRef}
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/mobile.webp')] max-md:background-fixed`}
      ></div>
      
       <div
                 className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/mobile.webp')] max-md:background-fixed`}
            ></div>

            <div
                className="absolute w-full h-[272px] bottom-0 z-20 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0) 100%)",
                }}
            ></div>



            <div className={`relative z-30 h-full flex flex-col justify-end px-5`}>
                <Title title={currentData.title} description={currentData.description} />
                <FundraisingProgress data={currentData} />
            </div>


            {!isVideoVisible && (
                <button
                    onClick={handleScreenClick}
                    className={`absolute flex items-center justify-center z-40 bg-transparent`}
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
                    videoSrc="https://valeryfain.com/video/Video.webm"
                    onClose={handleClose}
                />
            )}

            <Icons handleScreenClick={handleScreenClick} />

            <div ref={buttonRef} className="relative w-full">
                {/* <ButonShere isShareFixed={isShareFixed} /> */}
            </div>
            <DesktopWorkPage/>

    </div>
  );
}
