import React from 'react';
import Image from "next/image";


const Support = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full md:w-[209px] min-w-[200px] h-[40px] flex items-center justify-center bg-white text-[#1E1E1E] rounded-[8px] gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-avenir-heavy"
      >
        Gift Now
      </button>
    </div>
  );
};

export default Support;
