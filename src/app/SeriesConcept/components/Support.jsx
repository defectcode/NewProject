import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const Support = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full md:w-[209px] min-w-0 h-[40px] flex items-center justify-center bg-white text-black rounded-xl gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-bold font-avenir-heavy"
      >
        <FaRegHeart className="w-[15px] h-auto" />
        Support
      </button>
    </div>
  );
};

export default Support;
