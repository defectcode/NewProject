import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Header/components/Navbar';
import ProposalWindowMobile from '../../Header/components/ProposalWindowMobile';
import Image from 'next/image';

export default function Popup({ isOpen, onClose, children }) {
    const [isMobile, setIsMobile] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        // Gestionează scroll-ul
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Curăță stilurile la demontarea componentei
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        // Detectează dispozitivul mobil
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
        // Actualizează viewport-ul
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-start  h-full overflow-auto">
            <div className="relative h-[70vh] w-full text-white mt-5">
                <div
                    ref={headerRef}
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat rounded-[20px]"
                    style={{
                        backgroundImage: `url(${isMobile ? '/imgs/mobile.png' : '/imgs/Background.webp'})`,
                    }}
                ></div>
                <div
                    className="absolute bottom-0 w-full h-[25%] -mb-2 bg-gradient-to-t"
                    style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.99) 10%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.01) 100%)',
                    }}
                ></div>
                <div className="relative z-10 h-full">
                    <div className='fixed top-5 right-0 left-0'>
                        <div className="flex items-center justify-between h-[40px] mb-5">
                            <Navbar showSupportInNavbar={false} />
                            <button className="text-white text-xl mt-2 p-5" onClick={onClose}>
                                <Image src="./icons/Close.svg" width={14} height={14} alt="close" />
                            </button>
                        </div>
                    </div>
                    <div className="max-w-[1200px] w-auto mx-auto h-full flex flex-col text-white max-md:p-0">
                        <div className="flex-grow flex flex-col justify-end header-content max-md:p-0">
                            <div className="flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center">
                                <div className="flex flex-col mb-14 items-center md:flex-row gap-3 max-md:gap-0 max-lg:flex-col max-lg:justify-center">
                                    <div className="md:hidden flex flex-col items-center justify-center mt-8 leading-[1] mb-5">
                                        <h2 className="font-ekMukta text-[24px] font-ekmukta-extrabold leading-[1]">
                                            Exclusive Collaborations
                                        </h2>
                                    </div>
                                    <div className="md:flex md:flex-col md:items-start md:hidden font-avenirHeavy">
                                        <p className="text-[16px] max-lg:text-lg max-md:text-[15px] max-md:leading-[1.125rem] max-lg:text-start max-md:text-center max-md:mb-5 text-[#CDCDCD] mx-0 max-md:mx-4 font-ekMukta tracking-neg-3percent"
                                            style={{ letterSpacing: '-0.02em' }}
                                        >
                                            Partner with me through contributions or sponsorships. <br />
                                            Let’s create impact together. Apply now!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProposalWindowMobile onClose={onClose} />
        </div>
    );
}
