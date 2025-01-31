import React from 'react';
import { images } from '../constants/carouselData';

const Title = ({ contentIndex = 0 }) => {
  const content = images[contentIndex];

  if (!content) {
    return null;
  }

  return (
    <div className="space-y-[6px] w-full text-center lg:text-start">
      <h1 className="text-white text-[36px] font-extrabold font-ekMukta max-md:text-2xl">
        {content.title}
      </h1>
      <p 
      className="text-[#B7B7B7] lg:text-[#FFFFFF] text-[16px] font-ekmukta-extralight lg:font-ekmukta w-full lg:w-[71%] lg:px-0 md:px-1"
      // style={{ fontWeight: isMobile ? '200' : 'normal' }}
      >
        {content.description}
      </p>

    </div>
  );
};

export default Title;
