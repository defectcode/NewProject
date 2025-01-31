import React, { useEffect } from 'react';
import Image from 'next/image';

const ModalApplyH = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center max-md:items-end justify-center bg-black bg-opacity-75 w-auto">
      <div className="relative bg-[#F9F9F9] md:bg-transparent rounded-t-[10px] min-h-[400px] h-auto w-full shadow-lg flex flex-col items-center justify-center p-5">
        {children}
      </div>
    </div>
  );
};

export default ModalApplyH;
