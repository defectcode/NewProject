import Image from 'next/image';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5" onClick={onClose}>
      <div className="bg-[#252525] rounded-[10px] shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end items-center w-full">
          <h2 className="text-[20px] font-ek-mukta font-extrabold mb-5 flex items-center justify-center mr-[23%] text-[#FFFFFF]">Your Rewards</h2>
          <button onClick={onClose} className="text-[#FFFFFF] text-5xl">
            <Image src="/icons/close.svg" width={16} height={16} alt='close' className='mb-[20px] mr-2'/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
