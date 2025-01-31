// 'use client';
// import React from 'react';
// import {
//   privacyPolicyTitle,
//   privacyPolicyLastUpdated,
//   introParagraph,
//   informationWeCollectTitle,
//   informationWeCollectParagraph,
//   personalIdentificationTitle,
//   useOfDataSubtitle,
//   contactUsSubtitle,
//   personalIdentificationInformation,
//   usageDataInformation,
//   useOfDataTitle,
//   useDataTitle,
//   useOfDataParagraphs,
//   dataProtectionTitle,
//   dataProtectionParagraph,
//   dataRetentionTitle,
//   dataRetentionParagraph,
//   sharingOfDataTitle,
//   sharingOfDataParagraph,
//   cookiesTitle,
//   cookiesParagraph,
//   yourRightsTitle,
//   yourRightsParagraph,
//   changesToPolicyTitle,
//   changesToPolicyParagraph,
//   contactUsTitle,
//   contactUsParagraphs
// } from './constants/cookiePolicyContent';
// import Image from 'next/image';

// const CookiePolicy = () => {
//   return (
//     <div className="bg-black text-white flex min-h-screen py-10">
//       <div className="max-w-screen-md px-4 lg:px-10">

//         {/* Privacy Policy title and last updated text */}
//         <h1 className="text-[20px] md:text-[26px] font-semibold mb-4 md:mb-6 mt-[20px] md:mt-[40px] text-[#FFFFFF]">
//           {privacyPolicyTitle}
//         </h1>
//         <p className="text-xs md:text-sm lg:text-[16px] mb-[8px] md:mb-[10px] text-[#979797]">
//           {privacyPolicyLastUpdated}
//         </p>

//         {/* Introductory paragraph */}
//         <p className="text-[14px] md:text-[16px] mb-4 leading-relaxed text-[#F1F1F1]">
//           {introParagraph}
//         </p>

//         {/* Information We Collect Section */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-2 text-white">
//           {informationWeCollectTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed text-[#F1F1F1] font-ekMukta font-normal">
//           {informationWeCollectParagraph}
//         </p>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-ekMukta">
//           <span className='text-[FFFFFF] font-bold'>{personalIdentificationTitle}</span><span className='text-[#CDCDCD]'>{personalIdentificationInformation}</span>
//         </p>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed text-[#F1F1F1] font-ekMukta">
//           <span className='text-[FFFFFF] font-bold'>{ useDataTitle }</span><span className='text-[#CDCDCD]'>{usageDataInformation}</span>
//         </p>

//         {/* Use of Data Section */}
//         <h2 className="text-[20px] md:text-[24px] font-semibold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF] font-ekMukta">
//           {useOfDataTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
//             {useOfDataSubtitle}
//         </p>
//         {useOfDataParagraphs.map((paragraph, index) => (
//           <p key={index} className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#CDCDCD] font-ekMukta">
//             {paragraph}
//           </p>
//         ))}

//         {/* Data Protection and Security */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {dataProtectionTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
//           {dataProtectionParagraph}
//         </p>

//         {/* Data Retention */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {dataRetentionTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
//           {dataRetentionParagraph}
//         </p>

//         {/* Sharing of Data */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {sharingOfDataTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
//           {sharingOfDataParagraph}
//         </p>

//         {/* Cookies */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {cookiesTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
//           {cookiesParagraph}
//         </p>

//         {/* Your Rights */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {yourRightsTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
//           {yourRightsParagraph}
//         </p>

//         {/* Changes to This Privacy Policy */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {changesToPolicyTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
//           {changesToPolicyParagraph}
//         </p>

//         {/* Contact Us */}
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-5 mt-8 md:mt-10 text-[#FFFFFF]">
//           {contactUsTitle}
//         </h2>
//         <p className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
//             {contactUsSubtitle}
//         </p>
//         {contactUsParagraphs.map((paragraph, index) => (
//           <p key={index} className="text-[14px] md:text-[16px] mb-2 leading-relaxed font-normal text-[#CDCDCD] font-ekMukta">
//             {paragraph}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CookiePolicy;
