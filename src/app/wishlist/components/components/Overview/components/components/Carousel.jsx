import React, { useRef, useState } from "react";
import Image from "next/image";

export const CustomCarouselModule = ({ carouselImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const containerRef = useRef(null);
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    
    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, carouselImages.length - 1));
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

            if (diff > 50) {
                handleNext();
            } else if (diff < -50) {
                handlePrev();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };
    
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    
    return (
        <div 
            ref={containerRef}
            className="relative w-full overflow-hidden h-[361px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {carouselImages.map((img, index) => (
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
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 h-4">
                {carouselImages.length > 3 ? (
                    [0, 1, carouselImages.length - 1].map((index, dotIndex) => (
                        <span 
                            key={dotIndex} 
                            className={`rounded-full transition-all duration-300 cursor-pointer 
                                ${
                                    (currentIndex === 0 && index === 0) || 
                                    (currentIndex > 0 && currentIndex < carouselImages.length - 1 && index === 1) || 
                                    (currentIndex === carouselImages.length - 1 && index === carouselImages.length - 1) 
                                    ? 'bg-[#FFFFFF]/50 h-[8px] w-[8px]' 
                                    : 'bg-[#E8E8ED] opacity-50 h-[6px] w-[6px]'
                                }`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))
                ) : (
                    carouselImages.map((_, index) => (
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
