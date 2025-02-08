import React from "react";
import { stageDescription, stageDescriptionData } from '../constants/stagerData';
import Image from "next/image";

const DetailedSteps = () => {
    const images = [
        stageDescriptionData.imageUrl_3,
        stageDescriptionData.imageUrl_4,
        stageDescriptionData.imageUrl_5,
        stageDescriptionData.imageUrl_6,
        stageDescriptionData.imageUrl_7,
        stageDescriptionData.imageUrl_8,
    ];

    return (
        <div>
            <div className="mt-10 font-heebo">
                <h2 className="text-[26px] text-[#FFFFFF] font-semibold">Detailed Steps</h2>
               
            </div>
            <div className="my-10">
                <h2 className="text-[#FFFFFF] font-semibold text-[26px]">{stageDescription.helpTitle}</h2>
                <p className="text-[#CDCDCD] w-[764px] text-[16px]">{stageDescription.helpInfo}</p>
                <Image 
                    src={stageDescriptionData.imageUrl_8} 
                    alt="Stage Description" 
                    className="mt-10 ml-5" 
                    width={624}
                    height={624}
                    style={{ width: '624px', height: '624px', objectFit: 'cover' }}
                />
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default DetailedSteps;
