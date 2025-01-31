import React from "react";
import { RiShare2Line } from "react-icons/ri";
import { RWebShare } from "react-web-share";


const ShareButton = ({ url }) => {
   

    return (
        <button 
            className="flex-[1] h-[40px] flex items-center justify-center gap-2 text-white border border-white rounded-xl font-avenirHeavy hover:bg-white hover:text-black">
            <RWebShare
            data={{
                text: "Paradise Problems",
                url: "http://localhost:3000",
                title: "Paradise Problems",
            }}
            onClick={() => console.log("shared successfully!")}
        >
            <button className="flex items-center gap-2">
                Share
                <RiShare2Line />
            </button>
            
        </RWebShare>
        </button>
        
    );
};

export default ShareButton;

