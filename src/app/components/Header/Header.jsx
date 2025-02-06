'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Support from './components/Support';
import ModalApplyH from './components/ModalApplyH';
import SupportForm from './components/Payment/SupportForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ModalApply from './components/ModalApply'
import ProposalWindow from './components/ProposalWindow'
import ProposalWindowMobile from './components/ProposalWindowMobile'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);
  const headerRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div className="relative h-[100dvh] max-md:h-[var(--viewport-height)] w-auto text-white overflow-hidden">
      <div
        ref={headerRef}
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/mobile.webp')] max-md:background-fixed`}
      ></div>
      <div className={`absolute bottom-0 w-full md:h-1/5 h-[40%] -mb-2 bg-gradient-to-t  ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}
      style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.99) 10%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.01) 100%)',
      }}></div>
      <div className={`relative z-10 h-full overflow-auto ${isModalOpen ? 'blur-sm' : ''}`}>
        <Navbar showSupportInNavbar={showSupportInNavbar} openModal={openModal} />
        <div className="max-w-[1200px] w-auto mx-auto h-full flex flex-col text-white max-md:p-0">
          <div className="flex-grow flex flex-col justify-end header-content max-md:p-0">
            <div className={`flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center customStyles`}>
              <div className="flex flex-col mb-10 max-md:mb-0 items-center md:flex-row gap-3 max-md:gap-0 max-lg:flex-col max-lg:justify-center">
                <div className="md:hidden flex flex-col items-center justify-center mt-8 leading-[1] mb-5">
                  <h2 className='font-ekMukta text-[24px] font-ekmukta-extrabold leading-[1]'>
                    Exclusive Collaborations
                  </h2>
                </div>
                {!showSupportInNavbar && (
                    <div className='flex items-end justify-between min-w-[1200px] w-full'>
                      <div className="flex flex-col items-start px-2 space-y-[10px] max-md:mb-4 font-avenirHeavy max-md:hidden">
                        <h2 className='text-[24px] leading-[1] font-ekmukta-extrabold'>
                          Exclusive Collaborations
                        </h2>
                        <p
                          className="leading-[1.3] text-[15px] font-ekmukta-regular text-[#CDCDCD]"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          Partner with a loyal, premium audience through <br /> authentic, impact content. Apply for a proposal.
                        </p>
                        <button
                            onClick={openModal}
                            className="bg-[#F5F5F7] text-[#1E1E1E] rounded-lg px-5 py-2 cursor-pointer w-[289px] h-[40px] font-avenir-heavy text-[15px]"
                          >
                            Apply
                          </button>
                      </div>
                      <div className="flex items-end justify-between gap-5 px-5 max-md:hidden">
                        <Image src="/imgs/dior.svg" width={64} height={1} alt="netflix" className="md:w-[49px] h-auto" />
                        <Image src="/imgs/hermes.svg" width={64} height={1} alt="netflix" className="md:w-[70px] h-auto  " />
                        <Image src="/imgs/cartier.svg" width={70} height={12.46} alt="sony" className="md:w-[53px] h-auto" />
                        <Image src="/imgs/lamer.svg" width={66} height={1} alt="netflix" className="md:w-[63px] h-auto" />
                        <Image src="/imgs/four.svg" width={85} height={1} alt="netflix" className="md:w-[107px] h-auto" />
                      </div>
                    </div>
                )}
                <div className=" md:flex md:flex-col md:items-start md:hidden font-avenirHeavy">
                  <p className="text-[16px] max-lg:text-lg max-md:text-[15px] max-md:leading-[1.125rem] max-lg:text-start max-md:text-center max-md:mb-5 text-[#CDCDCD] mx-0 max-md:mx-4 font-ekMukta tracking-neg-3percent"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    Partner with a loyal, premium audience through <br/>
                    authentic, high-impact content. Apply for a proposal.
                  </p>
                   {!showSupportInNavbar && (
                    <div className="md:hidden flex justify-center max-md:mb-5">
                      <button
                        onClick={openModal}
                            className="bg-[#F5F5F7] text-[#1E1E1E] rounded-lg px-5 py-2 cursor-pointer w-[189px] h-[40px] font-avenir-heavy text-[15px]"
                      >
                        Apply
                      </button>
                    </div>
                  )} 
                  <div className="flex items-center gap-5 max-lg:gap-1 text-[#979797] max-lg:flex-col max-md:space-y-0 max-md:mb-[15px]">
                    <div className="flex items-end justify-between gap-5 px-[25px]">
                      <Image src="/imgs/dior.svg" width={37} height={1} alt="dior" className=" h-auto" />
                      <Image src="/imgs/hermes.svg" width={48} height={1} alt="hermes" className="h-auto  " />
                      <Image src="/imgs/cartier.svg" width={45} height={12.46} alt="cartier" className=" h-auto" />
                      <Image src="/imgs/lamer.svg" width={45} height={1} alt="lamer" className="h-auto" />
                      <Image src="/imgs/four.svg" width={85} height={1} alt="four" className="h-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ModalApplyH isOpen={isModalOpen} onClose={closeModal}>
        {isMobile ? <ProposalWindowMobile onClose={closeModal} /> : <ProposalWindow onClose={closeModal} />}
      </ModalApplyH>
    </div>
  );
}
