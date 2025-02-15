import React, { useState, useRef } from "react";
import { ProgresCarousel } from "./ProgresCarousel";
import { donationData } from "./constants/donationData";
import Image from "next/image";

const DonationProgress = () => {
  const [openSections, setOpenSections] = useState({ 0: true });
  const sectionRefs = useRef([]);

  const toggleSection = (index) => {
    setOpenSections((prev) => {
        if (prev[index]) {
            return prev;
        }

        const newSections = { [index]: true };

        setTimeout(() => {
            const element = sectionRefs.current[index];
            if (element) {
                const yOffset = -60; 
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 100);

        return newSections;
    });
};


  return (
        <div className="bg-black text-white rounded-xl w-full px-5 mb-10">
            <div className="bg-[#252525] rounded-[10px] pt-10 pb-[35px]">
                <div className="flex flex-col items-start justify-center mb-[30px] leading-[1] px-5">
                    <h2 className="text-[24px] font-semibold font-ekMukta text-white mb-[10px]">
                        What If We Exceed 100%?
                    </h2>
                    <p className="text-[16px] text-[#CDCDCD] leading-[1.4] font-ekMukta">
                        Every extra contribution improves production<br /> quality and helps us give back.
                    </p>
                </div>
                {donationData.sections.map((section, index) => (
                    <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
                        <div
                            className={`border-b-[1px] ${
                                openSections[index] || index === donationData.sections.length - 1 
                                    ? "border-none mx-5" 
                                    : "border-[#8D8D8D]/50 mx-5"
                            } ${openSections[index] ? "pt-5" : "py-5"}`}
                        >
                            <h2
                                className={`text-[16px] font-semibold font-ekMukta cursor-pointer flex items-center justify-between leading-[1] ${openSections[index] ? "pb-[14px]" : ""}`}
                                onClick={() => toggleSection(index)}
                            >
                                {section.title}
                                <Image
                                    src="/imgs/Crowdfunding/Overview/rightArrow.svg"
                                    width={7}
                                    height={11}
                                    alt="arrow"
                                    className={`transition-transform duration-300 ${openSections[index] ? "rotate-90" : ""}`}
                                />
                            </h2>
                        </div>

                        {openSections[index] && (
                            <>
                                <p className="text-[16px] text-[#CDCDCD] leading-[1.4] font-ekMukta px-5">
                                    {section.description}
                                </p>

                                {section.items && section.items.length > 0 && (
                                    <ul className="list-disc pl-6 text-[16px] text-[#e7e7e7] px-5 pt-[10px] mx-5 mb-5">
                                        {section.items.map((item, idx) => (
                                            <li key={idx} className="leading-[1.4] font-ekMukta text-[16px]">
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="px-0 mb-5">
                                    <ProgresCarousel carouselImages={section.images} />
                                </div>
                            </>
                        )}
                    </div>
                ))}


                <div
                    className={`px-5 ${
                        openSections[donationData.sections.length - 1] ? "pt-[30px]" : "pt-[40px]"
                    }`}
                >
                    <h2 className="text-[20px] font-semibold font-ekMukta leading-[1]">
                        Total Expansion Plan
                    </h2>
                    <ul className="list-disc pl-6 text-[16px] font-ekMukta text-[#CDCDCD] px-5 pt-[10px]">
                        <li>Base Equipment - $7,486.96</li>
                        <li>Advanced Gear & Accessories - $15,000</li>
                        <li>Full Professional Setup - $20,000+</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DonationProgress;
