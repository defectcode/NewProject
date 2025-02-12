import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { carouselImages } from "../../constants/stagerData";

export const CustomCarouselModule = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDarkImage, setIsDarkImage] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const imageRef = useRef(null); // 🔹 Referință pentru imagine

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

            if (diff > 50 && currentIndex < images.length - 1) {  
                handleNext();
            } else if (diff < -50 && currentIndex > 0) {  
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

    // 🔹 Detectează luminozitatea imaginii curente
    useEffect(() => {
        const checkImageBrightness = () => {
            const imageElement = imageRef.current;
            if (!imageElement) return;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let totalBrightness = 0;
            const sampleSize = 100; // Număr de pixeli de eșantionat

            for (let i = 0; i < pixels.length; i += 4 * Math.floor(pixels.length / sampleSize)) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const brightness = (r + g + b) / 3;
                totalBrightness += brightness;
            }

            const averageBrightness = totalBrightness / sampleSize;
            setIsDarkImage(averageBrightness < 128); // Dacă luminozitatea medie e sub 128, e considerată "întunecată"
        };

        const imageElement = imageRef.current;
        if (imageElement && imageElement.complete) {
            checkImageBrightness();
        } else {
            imageElement.onload = checkImageBrightness;
        }
    }, [currentIndex]);

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
                            ref={index === currentIndex ? imageRef : null} // 🔹 Salvăm referința doar pentru imaginea curentă
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
                                ${index === currentIndex 
                                    ? isDarkImage 
                                        ? 'bg-[#FFFFFF]' // Dacă imaginea este întunecată, punctele devin deschise
                                        : 'bg-[#000000]' // Dacă imaginea este deschisă, punctele devin închise
                                    : 'bg-[#D0D0D0] opacity-50'
                                }`}
                            onClick={() => handleDotClick(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
