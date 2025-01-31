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
    <nav className="bg-transparent fixed top-0 w-full h-10 md:h-11 z-50 font-avenirRoman">
      <div className="max-w-[1200px] flex justify-between items-center h-full mx-5 md:mx-auto relative z-50 mt-2">
        <div className="flex items-center h-full">
            <Link href="/"><Image src="/imgs/Valery Fain.svg" alt='logo' className='md:w-200 h-auto' width={117} height={25} /></Link>
        </div>

        <div className='flex gap-10 items-center justify-center'>
          <Link href='https://www.tiktok.com/@valery.fain14'>
            <Image src='./imgs/tiktok.svg' width={21} height={24} alt='tiktok'/>
          </Link>
          <Link href='https://www.instagram.com/valery.fain'>
            <Image src='./imgs/instagram.svg' width={20} height={20} alt='instagram'/>
          </Link>
          <Link href='https://www.youtube.com/@valery.fine3'>
            <Image src='./imgs/youtube.svg' width={26.93} height={19.97} alt='youtube'/>
          </Link>
        </div>
      </div>
    </nav>
  );
}
