import React from "react";
import { stageDescriptionData } from '../constants/stagerData';
import DetailedStepsMobile from './DetailedStepsMobile';
import Image from "next/image";

const StageDescriptionMobile = () => {
    return (
        <div id="overview" className="bg-[#000000] px-[20px] w-full flex flex-col items-start lg:items-center font-heebo">
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] mb-5 font-semibold mt-10 font-ekMukta leading-[1]">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] w-full text-[16px] leading-[1.7] font-ekMukta">
                    <span className="text-[#D8D7D7] font-bold">For the past seven years</span>, I have dedicated myself to content creation. Thousands of hours, thousands of videos, and countless stories told.But now, I want to <span className="text-[#CDCDCD] font-bold">elevate everything</span>.This camera is not just a tool—it`s the key to <span className="text-[#CDCDCD] font-bold">creating content that lasts</span>, that isn`t just consumed and forgotten but <span className="text-[#CDCDCD] font-bold">continues to inspire and impact lives</span>.<br/><span className="text-[#CDCDCD] font-bold">By supporting this wish, you`re not just funding equipment. You`re investing in a movement that we are building together.</span>
                </p>
                <Image 
                    src={stageDescriptionData.imageUrl_1} 
                    alt="Stage Description" 
                    width={344.96}
                    height={361}
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />
            </div>
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] font-semibold mb-5">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD] text-[16px] leading-[1.6]">
                    <p className="mb-4">
                        {stageDescriptionData.fundingProgress}
                        <br />
                        This isn`t just a camera; it`s the foundation for creating <span className="text-[#CDCDCD] font-bold">content that truly lasts</span>—content that educates, inspires, and builds something bigger than just social media trends. With this upgrade, I can produce <span className="text-[#CDCDCD] font-bold">high-quality, immersive videos</span> that remain relevant for years to come.
                        <br />
                        By supporting this project, you`re not just helping me get better gear—you`re <span className="text-[#CDCDCD] font-bold">fueling content that empowers, educates, and connects us all</span>.                    
                    </p>
                   
                </div>
                <Image
                    src={stageDescriptionData.imageUrl_2} 
                    alt="Stage Description" 
                    width={344.96}
                    height={361}
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />

                <div className="font-ekMukta">

                    <h2 className="text-[#FFFFFF] font-semibold text-[24px]">{stageDescriptionData.includesItems}</h2>
                    <div className="mt-5">
                        <h4 className="text-[#FFFFFF] text-[16px] font-semibold">
                            {stageDescriptionData.objectName}
                        </h4>
                        <ul className="list-disc ml-7 text-[#CDCDCD] text-[16px]">
                            <li>{stageDescriptionData.objectDescription}</li>
                        </ul>

                        <h4 className="text-[#FFFFFF] text-[16px] font-semibold mt-5">
                            {stageDescriptionData.accessoriesName}
                        </h4>
                        <ul className="list-disc ml-7 text-[#CDCDCD] text-[16px]">
                            {stageDescriptionData.accessoriesList.map((accessory, index) => (
                                <li key={index}>{accessory.item}</li>
                            ))}
                        </ul>


                        <h4 className="text-[#FFFFFF] text-[16px] font-semibold mt-5">
                            {stageDescriptionData.deliveryPrice}
                        </h4>
                        <ul className="list-disc ml-7 text-[#CDCDCD] text-[16px]">
                            <li>{stageDescriptionData.deliveryItems}</li>
                        </ul>

                        <h4 className="text-[#FFFFFF] text-[16px] font-semibold mt-5">
                            {stageDescriptionData.taxes}
                        </h4>
                        <ul className="list-disc ml-7 text-[#CDCDCD] text-[16px]">
                            {stageDescriptionData.taxesList.map((accessory, index) => (
                                <li key={index}>{accessory.items}</li>
                            ))}
                        </ul>

                        <h3 className="text-[#CDCDCD] text-[16px] mt-5">{stageDescriptionData.info}</h3>


                    </div>

                </div>

                <Image 
                    src={stageDescriptionData.imageUrl_3} 
                    alt="Stage Description" 
                    width={344.96}
                    height={361}
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />
            </div>
            {/* <DetailedStepsMobile /> */}
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea marker-ului în funcție de preferințe */
                }
            `}</style>
        </div>
    );
};

export default StageDescriptionMobile;
