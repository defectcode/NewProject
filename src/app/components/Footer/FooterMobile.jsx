
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Networking from "./Components/Networking";
import { IoIosArrowForward } from "react-icons/io";
// import Popup from './Components/PopUp';


export default function FooterMobile() {
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenLegal, setIsOpenLegal] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const toggleSupport = () => setIsOpenSupport(!isOpenSupport);
  const toggleLegal = () => setIsOpenLegal(!isOpenLegal);
  const toggleContact = () => setIsOpenContact(!isOpenContact);

  // max-h-[525px]
  return (
    <div className="bg-[#EBEBF0] text-white px-5 pt-10 pb-10 w-full max-w-md mx-auto h-auto">
            <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E] " onClick={toggleLegal}>
          <h2 className="text-[16px] font-ekMukta font-semibold leading-none">Legal Information</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenLegal ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Image src='/imgs/Footer/arrow.svg' alt='arrow' width={14} height={6}  className='w-[14px] h-[8px]'/>
          </span>
        </div>
        {isOpenLegal && (
          <ul className="text-[#646464] text-[14px] gap-4 font-ekMukta mt-5 px-5 flex items-center justify-between">
            <li><Link legacyBehavior href="/privacypolicy">Privacy Policy</Link></li>
            <li><Link legacyBehavior href="/cookiepolicy">Cookie Policy</Link></li>
            <li><Link legacyBehavior href="/terms">Tearm of Use</Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>


      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className='mt-20'>
        <Networking />
      </div>
    </div>
  );
}
