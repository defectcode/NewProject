import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Networking from "./Components/Networking";
import { IoIosArrowForward } from "react-icons/io";
import Popup from './Components/PopUp'


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
    <div className="bg-[#EBEBF0] text-white px-5 pt-10 pb-5 w-full max-w-md mx-auto h-auto">
            <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E] " onClick={toggleSupport}>
          <h2 className="text-[16px] font-ekMukta font-semibold leading-none">Support & Donations</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenSupport ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Image src='/imgs/Footer/arrow.svg' alt='arrow' width={14} height={6}  className='w-[14px] h-[8px]'/>
          </span>
        </div>
        {isOpenSupport && (
          <ul className="space-y-4 text-[#646464] text-[14px] font-ekMukta gap-4 mt-5 px-5 mb-2">
            <li><Link legacyBehavior href="#"><a>Donation Link</a></Link></li>
            <li><Link legacyBehavior href="#"><a>How Your Contributions Help</a></Link></li>
            <li><Link legacyBehavior href="#"><a>FAQ</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Help Center</a></Link></li>
          </ul>
        )}
      </div>

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
          <ul className="space-y-4 text-[#646464] text-[14px] gap-4 font-ekMukta mt-5 px-5 mb-2">
            <li><Link legacyBehavior href="/privacypolicy"><a>Privacy Policy</a></Link></li>
            <li><Link legacyBehavior href="/cookiepolicy"><a>Cookie Policy</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Tearm of Use</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Copyright Information</a></Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className="p-5">
                <div
                    className="flex justify-between items-center cursor-pointer text-[#1E1E1E]"
                    onClick={openPopup} // Deschide pop-up-ul
                >
                    <h2 className="text-[16px] font-ekMukta font-semibold leading-none">
                        Brands & Collaborations
                    </h2>
                    <span
                        className="text-xl transform transition-transform duration-200 leading-none"
                        style={{
                            transform: isOpenContact ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    >
                        <Image
                            src="/imgs/Footer/arrow.svg"
                            alt="arrow"
                            width={14}
                            height={6}
                            className="w-[14px] h-[8px]"
                        />
                    </span>
                </div>
            </div>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <h2 className="text-[20px] font-bold mb-4">Brands & Collaborations</h2>
                <p className="text-[14px] text-gray-700 mb-4">
                    Contact us for brand partnerships and collaborations. We are open to working
                    with creative and innovative brands worldwide.
                </p>
                <p className="text-[14px] text-gray-700">
                    <strong>Phone:</strong> +373 60 877 733
                </p>
                <p className="text-[14px] text-gray-700">
                    <strong>Email:</strong> Valery@fyne.pro
                </p>
            </Popup>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className='mt-20'>
        <Networking />
      </div>
    </div>
  );
}
