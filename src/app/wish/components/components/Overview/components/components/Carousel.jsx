import React, { useRef, useState } from "react";
import Image from "next/image";
import { carouselImages } from "../../constants/stagerData";

export const CustomCarouselModule = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    // 🔹 Blochează navigarea la prima imagine
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    // 🔹 Blochează navigarea după ultima imagine
    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    // 🔹 Capturăm poziția inițială a atingerii
    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };

    // 🔹 Actualizăm poziția finală a atingerii
    const handleTouchMove = (event) => {
        touchEndX.current = event.touches[0].clientX;
    };

    // 🔹 Swipe: Permite mișcarea doar dacă nu suntem la margini
    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;

            if (diff > 50 && currentIndex < images.length - 1) {  // Swipe Stânga ➡️ (doar dacă nu e ultima imagine)
                handleNext();
            } else if (diff < -50 && currentIndex > 0) {  // Swipe Dreapta ⬅️ (doar dacă nu e prima imagine)
                handlePrev();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // 🔹 Selectează manual o imagine
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    // 🔹 Click pe imagine → navigare înainte/înapoi
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
            {/* 🔹 Conținutul carousel-ului */}
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

            {/* 🔹 Indicatori sub formă de puncte */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 h-4">
                {carouselImages.map((_, index) => {
                    let size = "h-[4px] w-[4px]";
                    if (index === currentIndex) {
                        size = "h-[8px] w-[8px]";
                    } else if (
                        index === currentIndex - 1 ||
                        index === currentIndex + 1 ||
                        (currentIndex === 0 && index === images.length - 1) ||
                        (currentIndex === images.length - 1 && index === 0)
                    ) {
                        size = "h-[6px] w-[6px]";
                    }
                    return (
                        <span 
                            key={index} 
                            className={`${size} rounded-full transition-all duration-300 cursor-pointer 
                                ${index === currentIndex ? 'bg-[#000000]' : 'bg-[#D0D0D0] opacity-50'}`}
                            onClick={() => handleDotClick(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
