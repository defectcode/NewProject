import Popup from "@/app/components/Footer/Components/PopUp";
import React, { useState } from "react";

const OpenPopUp = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>

            <button 
                onClick={openPopup} 
                className="flex-[1] h-[40px] w-[117px] flex items-center justify-center gap-2 text-white bg-black border border-white rounded-[10px] hover:bg-white hover:text-[#1E1E1E] hover:border-black">
                Collaborate
            </button>    

            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={closePopup}/>
                   
            )}
        </div>
    );
};

export default OpenPopUp;
