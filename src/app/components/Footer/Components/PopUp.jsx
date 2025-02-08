import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Header/components/Navbar';
import ProposalWindowMobile from '../../Header/components/ProposalWindowMobile';
import Image from 'next/image';

export default function Popup({ isOpen, onClose, children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);
    const headerRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-start z-50 h-full overflow-auto">
        <div className="relative h-screen w-full text-white">
            <div
                ref={headerRef}
                className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/mobile.webp')] max-md:background-fixed`}
            ></div>
            <div className={`absolute bottom-0 w-full md:h-1/5 h-[40%] -mb-2 bg-gradient-to-t `}
            style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.99) 10%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.01) 100%)',
            }}></div>
                <div className={`relative z-10 h-full`}>
                  <div className='flex items-center justify-between h-[40px] mb-5'>
                    <Navbar showSupportInNavbar={showSupportInNavbar} openModal={openModal} />
                    <button
                        className="text-white text-xl mr-5 mb-1"
                        onClick={onClose}
                    >
                        <Image src='./icons/Close.svg' width={14} height={14} alt='close'/>
                    </button>
                  </div>
                  <div className="max-w-[1200px] w-auto mx-auto h-full flex flex-col text-white max-md:p-0">
                    <div className="flex-grow flex flex-col justify-end header-content max-md:p-0">
                      <div className={`flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center customStyles`}>
                        <div className="flex flex-col mb-14 items-center md:flex-row gap-3 max-md:gap-0 max-lg:flex-col max-lg:justify-center">
                          <div className="md:hidden flex flex-col items-center justify-center mt-8 leading-[1] mb-5">
                            <h2 className='font-ekMukta text-[24px] font-ekmukta-extrabold leading-[1]'>
                              Exclusive Collaborations
                            </h2>
                          </div>
                          <div className=" md:flex md:flex-col md:items-start md:hidden font-avenirHeavy">
                            <p className="text-[16px] max-lg:text-lg max-md:text-[15px] max-md:leading-[1.125rem] max-lg:text-start max-md:text-center max-md:mb-5 text-[#CDCDCD] mx-0 max-md:mx-4 font-ekMukta tracking-neg-3percent"
                              style={{ letterSpacing: '-0.02em' }}
                            >
                              Partner with me through contributions or sponsorships. <br/>
                              Let’s create impact together. Apply now!                            
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <ProposalWindowMobile onClose={closeModal} />
        </div>
    );
}
