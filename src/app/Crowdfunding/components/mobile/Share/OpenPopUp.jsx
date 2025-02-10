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
                className="flex-[1] h-[40px] w-[117px] w-full flex items-center justify-center gap-2 text-white bg-black border border-white rounded-[10px]  font-avenir">
                Collaborate
            </button>    

            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={closePopup}/>   
            )}
        </div>
    );
};

export default OpenPopUp;
