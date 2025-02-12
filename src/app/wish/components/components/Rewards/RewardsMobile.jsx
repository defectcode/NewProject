'use client'
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { rewards } from "./constants/rewardsData";
import Modal from "@/app/checkout/components/order/ModalPayPal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import SupportFormCrowdfunding from "@/app/components/Header/components/Payment/SupportFormCrowdfunding";
import { motion, AnimatePresence } from "framer-motion";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const RewardsMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null); 

  const cardWidth = 90; 
  const gapWidth = 2; 

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
    <div className="flex flex-col h-auto font-heebo">
      <div className="flex flex-col px-5">
        <h2 className="text-[24px] font-semibold font-ekMukta text-[#FFFFFF] mb-[10px] mt-[100px] leading-[1]">Select Your Reward</h2>
        <p className="font-ekMukta font-extralight text-[#B7B7B7] text-[16px] mb-10 leading-[1.2]">Choose a reward to support and unlock perks.</p>
      </div>

      <div
        {...handlers}
        className="relative w-full overflow-hidden"
        style={{ padding: `0 ${gapWidth}px` }}
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
              className={`flex-shrink-0 w-[${cardWidth}%] max-h-[517px] mb-10 h-full bg-[#212121] rounded-[10px] flex flex-col shadow-md p-5 ${
                index === currentIndex ? "border-transparent" : ""
              } transition-transform duration-300`}
              style={{
                opacity: index === currentIndex ? 1 : 0.6,
                maxHeight: "517px",
                overflowX: "hidden",
              }}
            >
              <div className="w-full h-auto flex-grow overflow-y-auto pr-2 scroll-hidden">
                <div className="flex items-center justify-between leading-[1]">
                  <h3 className="text-[20px] font-bold font-ekMukta text-[#FFFFFF]">{reward.name}</h3>
                  <p className="text-[#D9D9D9] font-ekMukta text-[16px]">{reward.price}</p>
                </div>

                <p className="text-[#BFBFBF] text-[16px] mt-[30px] font-ekMukta leading-[1]">Includes:</p>
                <ul className="text-[#F1F1F1] text-[15px] mt-1">
                  {reward.includes.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-center relative font-light font-ekMukta text-[#F1F1F1] py-5 leading-[1] ${
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

              <div className="w-full mt-auto pt-[30px]">
                <button
                  onClick={() => {
                    setSelectedReward(reward);
                    openModal();
                  }}
                  className="w-full bg-[#F5F5F7] text-[#0D0D0D] text-[16px] h-[40px] py-2 px-4 rounded-[8px] font-heavy"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relativ w-full h-[50px] bg-[#1B1B1B] flex flex-col items-center justify-center text-[#979797] text-[14px] font-ekMukta ">
        <div className="absolute top-[1px] left-0 w-full h-[2px] bg-[#333333]" />
        <motion.div
          className="absolute top-[1px] h-[2px] bg-[#BFBFBF] rounded-full"
          style={{
            width: `40px`, 
          }}
          animate={{
            left: `calc(${(currentIndex / (rewards.length - 1)) * (100 - (40 / window.innerWidth) * 100)}% + 0px)`, // Poziție corectă la margini
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <span className="">{`${rewards.length} rewards`}</span>
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
