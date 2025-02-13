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
    <div className="bg-[#000000] text-white px-5 pt-10 pb-10 w-full mx-auto h-auto">
      
      <div className=''>
        <Networking />
      </div>
      <ul className="text-[14px] font-ekMukta px-5 flex pb-20 items-center justify-around">
        <li><Link legacyBehavior href="/privacypolicy">Privacy Policy</Link></li>
        <li><Link legacyBehavior href="/cookiepolicy">Cookie</Link></li>
        <li><Link legacyBehavior href="/tearm">Tearm</Link></li>
      </ul>
    </div>
  );
}
