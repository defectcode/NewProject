'use client'
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { rewards } from "./constants/rewardsData";
import Modal from "@/app/checkout/components/order/ModalPayPal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import SupportForm from "@/app/components/Header/components/Payment/SupportForm";
import SupportFormCrowdfunding from "@/app/components/Header/components/Payment/SupportFormCrowdfunding";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const RewardsMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null); 

  const cardWidth = 90; 
  const gapWidth = 6; 

  const handleSwipeLeft = () => {
    if (currentIndex < rewards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col items-center h-auto font-heebo py-6">
      <h2 className="text-[24px] font-bold text-[#FFFFFF] mb-5 mt-10">Select Your Reward</h2>

      <div
        {...handlers}
        className="relative w-full overflow-hidden"
        style={{ padding: `0 ${gapWidth}%` }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(calc(-${currentIndex} * (${cardWidth}% + ${gapWidth}%) + ${
              (100 - cardWidth) / 2
            }%))`,
            gap: `${gapWidth}%`, 
          }}
        >
          {rewards.map((reward, index) => (
            <div
              key={reward.id}
              className={`flex-shrink-0 w-[${cardWidth}%]  bg-[#212121] rounded-[10px] flex flex-col items-center justify-between shadow-md p-5 ${
                index === currentIndex ? "border-transparent" : ""
              } transition-transform duration-300`}
              style={{
                opacity: index === currentIndex ? 1 : 0.6,
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-between leading-[1]">
                  <h3 className="text-[20px] font-bold font-ekMukta text-[#FFFFFF]">{reward.name}</h3>
                  <p className="text-[#D9D9D9] font-ekMukta text-[16px]">{reward.price}</p>
                </div>

                <p className="text-[#BFBFBF] text-[16px] mt-[30px] font-ekMukta leading-[1]">Includes:</p>
                <ul className="text-[#F1F1F1] text-[15px] mt-1">
                  {reward.includes.map((item, i) => (
                      <li
                          key={i}
                          className={`flex items-center relative font-light font-ekMukta text-[#F1F1F1] py-5  leading-[1] ${
                              i !== reward.includes.length - 1 ? "after:border-gradient" : ""
                          }`}
                      >
                      <span className="w-2 h-2 text-[#F1F1F1] rounded-full flex items-center justify-center mr-2">
                          ✔
                      </span>
                          {item}                
                          {i !== reward.includes.length - 1 && (
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]" />
                          )}
                      </li>
                  ))}
                </ul>
                <p className="text-[#DDDDDD] text-[16px] mt-[30px] font-ekMukta leading-[1]">Description:</p>

                <p className="text-[#CDCDCD] text-[14px] font-light font-ekMukta mt-5">{reward.description}</p>

              </div>
              <button
                onClick={() => {
                  setSelectedReward(reward); 
                  openModal(); 
                }}
                className="w-full bg-[#F5F5F7] text-[#0D0D0D] text-[16px] h-[48px] font-semibold py-2 px-4 rounded-md mt-5"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[40px] bg-[#1B1B1B] mt-5 flex items-center justify-center text-[#979797] text-[14px] font-ekMukta">
        {`${currentIndex + 1} / ${rewards.length}`}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          {selectedReward && (
            <SupportFormCrowdfunding
              selectedRewardName={selectedReward.name}
              selectedRewardPrice={selectedReward.price}
              initialAmount={Number(
                selectedReward.price.replace('$', '').replace(/,/g, '')
              ).toLocaleString('en-US')}
            />          
          )}
        </Elements>
      </Modal>
    </div>
  );
};

export default RewardsMobile;
