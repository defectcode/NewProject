import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { stageDescriptionData, images, icons, carouselImages } from "../constants/stagerData";
import FundingBreakdownMobile from "./FundingBreakdownMobile";
import { CustomCarouselModule } from "./components/Carousel";
import { CarouselModal } from "@/app/wishlist/components/components/Overview/components/components/CarouselModal";

export const CustomCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };
    
    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };
    
    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };
    
    const handleTouchMove = (event) => {
        touchEndX.current = event.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;

            if (diff > 50 && currentIndex < images.length - 1) {
                handleNext();
            } else if (diff < -50 && currentIndex > 0) {
                handlePrev();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };
    
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    
    const handleImageClick = (event) => {
        const imageWidth = event.target.clientWidth;
        const clickX = event.nativeEvent.offsetX;

        if (clickX < imageWidth / 2) {
            handlePrev();
        } else {
            handleNext();
        }
    };

    return (
        <div className="relative w-full overflow-hidden h-[361px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className="min-w-full h-full flex justify-center items-center"
                    >
                        <Image
                            src={img.image}
                            alt={`Image ${index + 1}`}
                            width={345}
                            height={390}
                            className="w-full h-full object-cover cursor-pointer rounded-b-[16px]"
                            onClick={handleImageClick}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 h-4">
                {images.length > 3 ? (
                    [0, 1, images.length - 1].map((index, dotIndex) => (
                        <span 
                            key={dotIndex} 
                            className={`rounded-full transition-all duration-300 cursor-pointer 
                                ${
                                    (currentIndex === 0 && index === 0) || 
                                    (currentIndex > 0 && currentIndex < images.length - 1 && index === 1) || 
                                    (currentIndex === images.length - 1 && index === images.length - 1) 
                                    ? 'bg-[#FFFFFF]/50 h-[8px] w-[8px]' 
                                    : 'bg-[#E8E8ED] opacity-50 h-[6px] w-[6px]'
                                }`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))
                ) : (
                    images.map((_, index) => (
                        <span 
                            key={index} 
                            className={`h-[6px] w-[6px] rounded-full transition-all duration-300 cursor-pointer 
                                ${index === currentIndex ? 'bg-[#FFFFFF]/50' : 'bg-[#E8E8ED] opacity-50'}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};



const StageDescriptionMobile = () => {
    return (
        <div id="overview" className="bg-[#000000] px-[20px] w-full flex flex-col items-start lg:items-center font-heebo">
            
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] mb-5 font-semibold font-ekMukta leading-[1] mt-[40px]">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] w-full text-[16px] font-ekMukta mb-5 leading-[1.3]">
                    {stageDescriptionData.stageHistory}
                </p>

                <CustomCarousel images={images} />
            </div>

            <div>
                <h2 className="text-[24px] text-[#FFFFFF] font-semibold font-ekMukta mb-5 mt-10 leading-[1]">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD] text-[16px] leading-[1.4] mb-5">
                    {stageDescriptionData.fundingProgress}
                </div>

                <CarouselModal icons={icons} />


                <div className="font-ekMukta">
                    <div className="mt-5 mb-10">
                        <FundingBreakdownMobile />
                        <h3 className="text-[#CDCDCD] text-[16px] mt-5 mb-5 leading-[1.4]">
                            {stageDescriptionData.info}
                        </h3>
                        <CustomCarouselModule carouselImages={carouselImages} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em;
                }
            `}</style>
        </div>
    );
};

export default StageDescriptionMobile;
