
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
    <div className="bg-[#EBEBF0] text-white px-5 pt-5 w-full max-w-md mx-auto h-auto pb-20">
      <Networking />


      <ul className="text-[#646464] text-[14px] gap-4 font-ekMukta flex items-center justify-between px-5">
        <li><Link legacyBehavior href="/privacypolicy">Privacy Policy</Link></li>
        <li><Link legacyBehavior href="/cookiepolicy">Cookie Policy</Link></li>
        <li><Link legacyBehavior href="/terms">Tearm of Use</Link></li>
      </ul>

      <div className="mb-5 mt-10">
        <p className="text-[#1E1E1E] text-[16px] text-center max-md:text-[10px] font-ekmukta-extralight">
            Copyright © 2024 Fyne S.R.L. All right reserved.
        </p>
      </div>

    </div>
  );
}
