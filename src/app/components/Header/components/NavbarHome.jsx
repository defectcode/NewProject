'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function NavbarHome({ openModal }) {
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
    <nav className="bg-transparent top-0 w-full h-10 md:h-11 z-50 font-avenirRoman mt-5">
      <div className="flex items-center gap-5 max-lg:gap-1 text-[#979797] max-lg:flex-col max-md:space-y-0 max-md:mb-[15px]">
          <div className="flex items-end justify-between gap-5 px-[25px]">
            <Image src="/imgs/Valery Fine.svg" width={132} height={7} alt="dior" className=" h-auto" />
          </div>
        </div>
    </nav>
  );
}
