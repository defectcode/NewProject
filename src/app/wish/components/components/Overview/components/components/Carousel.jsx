import React, { useRef, useState } from "react";
import Image from "next/image";

export const CustomCarouselModule = ({ carouselImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < carouselImages.length - 1) {
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

            if (diff > 50 && currentIndex < carouselImages.length - 1) {
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
                {carouselImages.map((img, index) => (
                    <div 
                        key={index} 
                        className="min-w-full h-full flex justify-center items-center"
                    >
                        <Image
                            src={img.image}
                            alt={`Image ${index + 1}`}
                            width={345}
                            height={361}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={handleImageClick}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 h-4">
                {carouselImages.map((_, index) => (
                    <span 
                        key={index} 
                        className={`rounded-full transition-all duration-300 cursor-pointer 
                            ${index === currentIndex ? 'bg-[#000000] h-[8px] w-[8px]' : 'bg-[#D0D0D0] opacity-50 h-[4px] w-[4px]'}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};
