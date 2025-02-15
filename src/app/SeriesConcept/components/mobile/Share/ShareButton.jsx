import React from "react";
import { RiShare2Line } from "react-icons/ri";
import { RWebShare } from "react-web-share";


const ShareBottonNavBar = ({ url }) => {
   
    return (
        <button 
            className="text-white">
            <RWebShare
            data={{
                text: "Valery Fine",
                url: "http://localhost:3000",
                title: "Valery Fine",
            }}
            onClick={() => console.log("shared successfully!")}
            >
            <button className="flex items-center gap-2">
                <RiShare2Line />
            </button>
            </RWebShare>
        </button>
        
    );
};

export default ShareBottonNavBar;

