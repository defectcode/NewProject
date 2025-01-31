import React from "react";
import { stageDescriptionData, stageDescription } from '../constants/stagerData';

const DetailedStepsMobile = () => {
    const images = [
        stageDescriptionData.imageUrl_8,
    ];

    return (
        <div className="">
            <div className="mt-5">
                <h2 className="text-lg text-[#FFFFFF] font-ekMukta font-semibold">Detailed Steps</h2>
                <div className="font-ekMukta text-[#CDCDCD] mt-4">
                    {stageDescription.detailedSteps.map((step, index) => (
                        <div key={index} className="mt-6">
                            <h3 className="text-[16px] text-[#E60716] font-semibold">
                                {index + 1}. {step.title}
                            </h3>
                            <ul className="list-disc list-inside list-small ml-4 mt-2">
                                {step.items.map((item, idx) => (
                                    <li key={idx} className="mt-2">
                                        <span className=" text-[#CDCDCD] text-[16px]">{item.item}:</span> <span className="text-[#CDCDCD] text-[16px]">{item.cost}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* Corresponding image for each step */}
                            {/* {images[index] && (
                                <img 
                                    src={images[index]} 
                                    alt={`Stage Description ${index + 1}`} 
                                    className="mt-6 w-full h-auto"
                                    style={{ objectFit: 'cover' }}
                                />
                            )} */}
                        </div>
                    ))}
                </div>
            </div>
            <img 
                src={stageDescriptionData.imageUrl_3} 
                alt="Stage Description" 
                className="mt-5 w-full h-auto"
                style={{ objectFit: 'cover' }}
            />
            <div className="my-10">
                <h2 className="text-[#FFFFFF] font-ekMukta font-semibold text-[26px]">{stageDescription.helpTitle}</h2>
                <p className="text-[#CDCDCD] w-full text-[16px] mt-4">{stageDescription.helpInfo}</p>
                <img 
                    src={stageDescriptionData.imageUrl_4} 
                    alt="Stage Description" 
                    className="mt-10 w-full h-auto"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Adjust the size as necessary */
                }
            `}</style>
        </div>
    )
}

export default DetailedStepsMobile;
