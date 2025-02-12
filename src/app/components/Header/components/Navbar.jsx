'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Navbar({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-transparent top-0 w-full md:h-11 z-50 font-avenirRoman ">
      <div className="flex items-start gap-5 max-lg:gap-1 text-[#979797] max-lg:flex-col max-md:space-y-0 mt-5 max-md:mb-[15px]">
          <div className="flex items-end justify-between gap-5 px-5">
            <Image src="/imgs/dior.svg" width={37} height={1} alt="dior" className=" h-auto" />
            <Image src="/imgs/hermes.svg" width={48} height={1} alt="hermes" className="h-auto  " />
            {/* <Image src="/imgs/cartier.svg" width={45} height={12.46} alt="cartier" className="h-auto" /> */}
            <Image src="/imgs/lamer.svg" width={45} height={1} alt="lamer" className="h-auto" />
            <Image src="/imgs/four.svg" width={85} height={1} alt="four" className="h-auto" />
          </div>
        </div>
    </nav>
  );
}
