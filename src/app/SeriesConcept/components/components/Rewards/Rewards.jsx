import React from 'react';
import styles from './style/Rewards.module.css'; // Importăm CSS-ul specific

const Rewards = () => {
    return (
        <div id="rewards" className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <img src="/imgs/Crowdfunding/Community/progress.svg" alt="Work In Progress Icon" />
                </div>
            </div>
        </div>
    );
}

export default Rewards;



// import React, { useState } from 'react';

// const rewards = [
//   { id: 1, name: 'Project Supporter', price: '$1', items: '1 item includes', includes: ['Digital wallpapers'], description: 'Access to news and updates' },
//   { id: 2, name: 'Early Backer', price: '$5',  items: '1 item includes', includes: ['1 item includes'], description: 'Support the project early' },
//   { id: 3, name: 'Community Member', price: '$10',  items: '1 item includes', includes: ['3 items include'], description: 'Join the community' },
//   { id: 4, name: 'Art Love', price: '$20',  items: '1 item includes', includes: ['4 items include'], description: 'Appreciate the art' },
//   { id: 5, name: 'Knowledge Seeker', price: '$50',  items: '1 item includes', includes: ['5 items include'], description: 'Seek knowledge' },
//   { id: 6, name: 'Style Supporter', price: '$75',  items: '1 item includes', includes: ['6 items include'], description: 'Support in style' },
//   { id: 7, name: 'Cast Connector', price: '$100',  items: '1 item includes', includes: ['7 items include'], description: 'Connect with the cast' },
//   { id: 8, name: 'Signature Collector', price: '$125',  items: '1 item includes', includes: ['8 items include'], description: 'Collect signatures' },
//   { id: 9, name: 'Exclusive Member', price: '$150',  items: '1 item includes', includes: ['9 items include'], description: 'Exclusive membership' },
//   { id: 10, name: 'Content Insider', price: '$200',  items: '1 item includes', includes: ['10 items include'], description: 'Inside content access' },
//   { id: 11, name: 'Virtual VIP', price: '$500',  items: '1 item includes', includes: ['11 items include'], description: 'Virtual VIP experience' },
//   { id: 12, name: 'Personal VIP', price: '$1,000',  items: '1 item includes', includes: ['12 items include'], description: 'Personal VIP treatment' },
//   { id: 13, name: 'Memorabilia Owner', price: '$5,000',  items: '1 item includes', includes: ['14 items include'], description: 'Own exclusive memorabilia' },
//   { id: 14, name: "Creator's Guest", price: '$15,000',  items: '1 item includes', includes: ['18 items include'], description: 'Be a guest of the creator' },
//   { id: 15, name: 'Exclusive Collector', price: '$30,000',  items: '1 item includes', includes: ['16 items include'], description: 'Exclusive collection access' },
//   { id: 16, name: 'Personalized Patron', price: '$45,000',  items: '1 item includes', includes: ['17 items include'], description: 'Personalized patron experience' },
//   { id: 17, name: 'Premiere Guest', price: '$60,000',  items: '1 item includes', includes: ['15 items include'], description: 'Attend the premiere as a guest' },
//   { id: 18, name: 'Limited Edition Collector', price: '$90,000',  items: '1 item includes', includes: ['18 items include'], description: 'Collect limited editions' },
//   { id: 19, name: 'Named Producer', price: '$600,000',  items: '1 item includes', includes: ['18 items include'], description: 'Be named as a producer' },
// ];

// const Rewards = () => {
//   const [selectedReward, setSelectedReward] = useState(rewards[0]);

//   return (
//     <div className="flex justify-center min-h-screen bg-black">
//       <div className="w-full max-w-[1200px] mx-auto">
//         <div className="flex">
//           {/* Left Sidebar Menu */}
//           <div className="w-1/4 p-4">
//             <h2 className="text-white text-lg mb-4">Select Your Reward</h2>
//             <ul>
//               {rewards.map((reward) => (
//                 <li
//                   key={reward.id}
//                   onClick={() => setSelectedReward(reward)}
//                   className={`cursor-pointer mb-2 p-2 rounded ${
//                     selectedReward.id === reward.id ? 'border-l border-red-500 text-white' : 'text-gray-400'
//                   }`}
//                 >
//                   <span className="text-[18px] font-semibold font-ekMukta">{reward.name}</span>
//                   <div>
//                     <span className="text-[16px] block font-bold text-[#8B8B8C]">{reward.price}</span>
//                     <span className="text-[14px] block font-normal text-[#8B8B8C]">{reward.items}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Center Card */}
//           <div className="w-2/4 p-4 flex justify-center">
//             <div className="bg-[#212121] text-white p-6 rounded-lg shadow-md w-full max-w-[350px] h-[300px] text-center flex flex-col justify-between">
//               <div>
//                 <h3 className="text-xl mb-2">{selectedReward.name}</h3>
//                 <p className="text-sm mb-4">{selectedReward.description}</p>
//               </div>
//               <button className="bg-[#F5F5F7] text-black py-2 px-6 rounded">Select</button>
//             </div>
//           </div>

//           {/* Right Sidebar Details */}
//           <div className="w-1/4 p-4">
//             <h4 className="text-white text-lg mb-4">Includes</h4>
//             <ul className="text-gray-400 list-disc list-inside">
//               {selectedReward.includes.map((item, index) => (
//                 <li key={index} className="mb-2">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Rewards;



