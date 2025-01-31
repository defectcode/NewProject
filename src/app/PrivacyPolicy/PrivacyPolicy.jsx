'use client';
import React from 'react';
import {
  privacyPolicyTitle,
  privacyPolicyLastUpdated,
  introParagraph,
  informationWeCollectTitle,
  informationWeCollectParagraph,
  personalIdentificationTitle,
  useOfDataSubtitle,
  contactUsSubtitle,
  personalIdentificationInformation,
  usageDataInformation,
  useOfDataTitle,
  useDataTitle,
  useOfDataParagraphs,
  dataProtectionTitle,
  dataProtectionParagraph,
  dataRetentionTitle,
  dataRetentionParagraph,
  sharingOfDataTitle,
  sharingOfDataParagraph,
  cookiesTitle,
  cookiesParagraph,
  yourRightsTitle,
  yourRightsParagraph,
  changesToPolicyTitle,
  changesToPolicyParagraph,
  contactUsTitle,
  contactUsParagraphs
} from './constants/privacyPolicyContent';
import Image from 'next/image';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen py-10">
      <div className="max-w-screen-md px-4 lg:px-10 text-center">
        {/* Privacy Policy title and last updated text */}
        <h1 className="text-3xl lg:text-[34px] font-semibold mb-6 mt-[40px] md:mt-[80px] text-[#FFFFFF]">
          {privacyPolicyTitle}
        </h1>
        <p className="text-sm lg:text-[16px] mb-[10px] text-[#979797]">
          {privacyPolicyLastUpdated}
        </p>

        {/* Introductory paragraph */}
        <p className="text-[16px] mb-4 leading-relaxed  text-[#F1F1F1]">
          {introParagraph}
        </p>

        {/* Shield logo after the introductory paragraph */}
        <div className="flex justify-center mb-6">
          <Image src="/imgs/PrivacyPolicy/scut.svg" width={40} height={58} alt="scut" />
        </div>

        {/* Information We Collect Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {informationWeCollectTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed text-[#F1F1F1] font-ekMukta font-normal">
          {informationWeCollectParagraph}
        </p>
        <p className="text-[16px] mb-2 leading-relaxed font-ekMukta">
          <span className='text-[FFFFFF] font-bold text-[16px]'>{personalIdentificationTitle}</span><span className='text-[#CDCDCD]'>{personalIdentificationInformation}</span>
        </p>
        <p className="text-[16px] mb-2 leading-relaxed text-[#F1F1F1] font-ekMukta">
          <span className='text-[FFFFFF] font-bold text-[16px]'>{ useDataTitle }</span><span className='text-[#CDCDCD]'>{usageDataInformation}</span>
        </p>

        {/* Use of Data Section */}
        <h2 className="text-[26px] font-semibold mb-5 mt-10 text-[#FFFFFF] font-ekMukta">
          {useOfDataTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
            {useOfDataSubtitle}
        </p>
        {useOfDataParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-normal text-[#CDCDCD] font-ekMukta">
            {paragraph}
          </p>
        ))}

        {/* Data Protection and Security */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {dataProtectionTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
          {dataProtectionParagraph}
        </p>

        {/* Data Retention */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {dataRetentionTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
          {dataRetentionParagraph}
        </p>

        {/* Sharing of Data */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {sharingOfDataTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
          {sharingOfDataParagraph}
        </p>

        {/* Cookies */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {cookiesTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
          {cookiesParagraph}
        </p>

        {/* Your Rights */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {yourRightsTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
          {yourRightsParagraph}
        </p>

        {/* Changes to This Privacy Policy */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {changesToPolicyTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#F1F1F1] font-ekMukta">
          {changesToPolicyParagraph}
        </p>

        {/* Contact Us */}
        <h2 className="text-lg lg:text-2xl font-bold mb-5 mt-10 text-[#FFFFFF]">
          {contactUsTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-normal text-[#FFFFFF] font-ekMukta">
            {contactUsSubtitle}
        </p>
        {contactUsParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-normal text-[#CDCDCD] font-ekMukta">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
