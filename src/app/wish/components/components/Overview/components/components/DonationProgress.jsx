import React, { useState } from "react";
import { ProgresCarousel } from "./ProgresCarousel";
import { donationData, images } from "./constants/donationData";
import Image from "next/image";


const DonationProgress = () => {
  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (index) => {

    setOpenSections((prev) => {

        if (prev[index]) {
            return prev;
        }

        return { [index]: true };
    });
};


  return (
    <div className="bg-black text-white rounded-xl w-full px-5 mb-10">
      <div className="bg-[#252525] rounded-[10px] py-10">
        <div className="flex flex-col items-start justify-center mb-[30px] leading-[1] px-5">
            <h2 className="text-[24px] font-semibold font-ekMukta text-white mb-[10px]">What If We Exceed 100%?</h2>
            <p className="text-[16px] text-[#CDCDCD] leading-[1.4] font-ekMukta">Every extra contribution improves production<br/> quality and helps us give back.</p>
        </div>
        {donationData.sections.map((section, index) => (
            <div
                key={index}
                className={`border-b-[1px] ${
                    openSections[index] || index === donationData.sections.length - 1 
                        ? "border-none" 
                        : "border-[#8D8D8D]/50"
                } ${openSections[index] ? "pt-5" : "py-5"}`}
            >
                <h2
                    className={`text-[18px] font-semibold font-ekMukta cursor-pointer flex items-center justify-between leading-[1] px-5 ${openSections[index] ? 'pb-[20px]' : ''}`}
                    onClick={() => toggleSection(index)}
                >
                    {section.title}
                    <Image 
                        src='/imgs/Crowdfunding/Overview/rightArrow.svg' 
                        width={7} 
                        height={11} 
                        alt="arrow" 
                        className={`transition-transform duration-300 ${openSections[index] ? 'rotate-90' : ''}`} 
                    />
                </h2>

                {openSections[index] && (
                    <>
                        <p className="text-[16px] text-[#CDCDCD] leading-[1.4] font-ekMukta px-5">{section.description}</p>
                        
                        {section.items && section.items.length > 0 && (
                            <ul className="list-disc pl-6 text-[16px] text-[#CDCDCD] px-5 pt-[10px] mx-5 mb-10">
                                {section.items.map((item, idx) => (
                                    <li key={idx} className="leading-[1.4] font-ekMukta text-[16px]">{item.name}</li>
                                ))}
                            </ul>
                        )}

                        <div className="px-0">
                            <ProgresCarousel carouselImages={section.images} />
                        </div>
                    </>
                )}

            </div>
        ))}
        <div className="pt-5 px-5">
            <h2 className="text-[24px] font-semibold font-ekMukta leading-[1]">Total Expansion Plan</h2>
            <ul className="list-disc pl-6 text-[16px] font-ekMukta text-[#CDCDCD] px-5 pt-[10px]">
                <li className="">Base Equipment: $7,486.96</li>
                <li className="">Advanced Gear & Accessories: $15,000</li>
                <li className="">Full Professional Setup: $20,000+</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default DonationProgress;