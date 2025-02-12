import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { stageDescriptionData, images, carouselImages, ModiuleElement } from "../constants/stagerData";
import FundingBreakdownMobile from "./FundingBreakdownMobile";
import { CustomCarouselModule } from "./components/Carousel";


const CustomCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDarkImage, setIsDarkImage] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const imageRef = useRef(null); // 🔹 Referință pentru imaginea curentă

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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
                {images.map((_, index) => {
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

const StageDescriptionMobile = () => {
    return (
        <div id="overview" className="bg-[#000000] px-[20px] w-full flex flex-col items-start lg:items-center font-heebo">
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] mb-5 font-semibold mt-10 font-ekMukta leading-[1]">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] w-full text-[16px] font-ekMukta mb-5 leading-[1.3]">
                    <span className="text-[#D8D7D7] font-bold">For the past seven years</span>, I have dedicated myself to content creation. Thousands of hours, thousands of videos, and countless stories told. But now, I want to <span className="text-[#CDCDCD] font-bold">elevate everything</span>. This camera is not just a tool—it`s the key to <span className="text-[#CDCDCD] font-bold">creating content that lasts</span>, that isn`t just consumed and forgotten but <span className="text-[#CDCDCD] font-bold">continues to inspire and impact lives</span>.<br/><span className="text-[#CDCDCD] font-bold">By supporting this wish, you`re not just funding equipment. You`re investing in a movement that we are building together.</span>
                </p>

                <CustomCarousel images={images} />
            </div>

            <div>
                <h2 className="text-[24px] text-[#FFFFFF] font-semibold font-ekMukta mb-5 mt-10 leading-[1]">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD] text-[16px] leading-[1.4]">
                    <p className="mb-5">
                        {stageDescriptionData.fundingProgress}
                        <br />
                        This isn`t just a camera; it`s the foundation for creating <span className="text-[#CDCDCD] font-bold">content that truly lasts</span>—content that educates, inspires, and builds something bigger than just social media trends. With this upgrade, I can produce <span className="text-[#CDCDCD] font-bold">high-quality, immersive videos</span> that remain relevant for years to come.
                        <br />
                        By supporting this project, you`re not just helping me get better gear—you`re <span className="text-[#CDCDCD] font-bold">fueling content that empowers, educates, and connects us all</span>.
                    </p>
                </div>

                {/* <CustomCarousel images={images} /> */}

                <Image
                    src='/imgs/Crowdfunding/Overview/ModuleElement.jpg'
                    alt={`Image`}
                    width={345}
                    height={361}
                    className="w-full h-full object-cover cursor-pointer"
                />


                <div className="font-ekMukta">
                    {/* <h2 className="text-[#FFFFFF] font-semibold text-[24px] mt-10 leading-[1]">{stageDescriptionData.includesItems}</h2> */}
                    <div className="mt-5 mb-10">
                        {/* <h4 className="text-[#FFFFFF] text-[16px] font-semibold">
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
                            {stageDescriptionData.taxes}</h4>
                        <ul className="list-disc ml-7 text-[#CDCDCD] text-[16px]">
                            {stageDescriptionData.taxesList.map((accessory, index) => (
                                <li key={index}>{accessory.items}</li>
                            ))}
                        </ul> */}

                        <FundingBreakdownMobile />
                        
                        <h3 className="text-[#CDCDCD] text-[16px] mt-5 mb-5 leading-[1.4]">{stageDescriptionData.info}</h3>

                        <CustomCarouselModule images={images} />

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
