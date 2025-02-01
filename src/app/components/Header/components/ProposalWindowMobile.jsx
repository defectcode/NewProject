import React, { useState } from 'react';
import  GoalDropdown from './GoalDropdown'
import Image from 'next/image';

export default function ProposalWindowMobile({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formUrl =
        'https://docs.google.com/forms/d/e/1FAIpQLSep6g27u3tQvHY8j4q3FU8jR7DK93qrqIGcIl8Q_0SSE3LzGA/formResponse';
      const formData = new URLSearchParams();
      formData.append('entry.1898953536', fullName);
      formData.append('entry.757255050', email); 
      formData.append('entry.66712416', brandName); 
      formData.append('entry.770977173', goal);
      formData.append('entry.1965389912', message);

      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitted(true);

    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-between h-[344px] bg-[#F9F9F9] rounded-lg text-center w-full font-heboo">
        <div className="flex justify-end items-center w-full">
          <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
            <Image src="/icons/closeBlack.svg" width={14} height={14} alt='close' className='mb-[20px] mr-2 text-[#1E1E1E]'/>
          </button>
        </div>
        <h2 className="text-2xl text-[#1E1E1E] font-bold mb-4">Thank You!</h2>
        <Image src='./imgs/select.svg' alt='select' width={27} height={27}/>
        <p className="text-lg text-[#1E1E1E] mb-6 ">
          Your Request Has Been Sent! We Will <br/>Contact You Soon.
        </p>
        <button
          className="bg-[#1E1E1E] text-white px-5 w-full py-3 rounded-lg hover:bg-gray-800 h-[48px]"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-[#1E1E1E] w-full font-heboo">
        <div className="flex justify-between items-center w-full mt-5">
          <h2 className="text-[20px] text-[#1E1E1E] font-extrabold mb-5 flex items-center justify-center">Request a Proposal</h2>
          <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
            <Image src="/icons/closeBlack.svg" width={14} height={14} alt='close' className='mb-[20px] mr-2 text-[#1E1E1E]'/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[16px] font-semibold mb-1 font-heboo" htmlFor="name">
                  Name
              </label>
              
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Image src="/imgs/user.svg" width={18} height={18} alt="User Icon" />
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  className="w-full border border-[#6F6F6F] h-[56px] rounded-[10px] px-10 py-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-1" htmlFor="email">
                  Contact
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Image src="/imgs/naruto.svg" width={20} height={20} alt="Email Icon" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full border border-[#6F6F6F] h-[56px] rounded-[10px] px-10 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image src="/imgs/element.svg" width={15} height={18} alt="Tag Icon" />
              </span>
              <input
                type="text"
                id="brand-name"
                placeholder="Brand name"
                className="w-full border border-[#6F6F6F] h-[56px] rounded-[10px] px-10 py-2"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div className='text-black'>
              <GoalDropdown/>
            </div>
            <div className="relative">
                <label className="block text-[17px] font-medium text-[#1E1E1E] mb-1" htmlFor="message">
                    Message <span className="text-[14px] text-[#6F6F6F]">(Optional)</span>
                </label>
                <textarea
                    id="message"
                    placeholder="Share any details"
                    className="w-full border border-gray-300 rounded-lg h-[100px] text-start px-5 placeholder-gray-500 focus:outline-none resize-none pt-[35px]"
                    rows="4"
                ></textarea>
            </div>
            <button
            type="submit"
            className="w-full bg-black text-white rounded-lg px-4 py-2 mt-2 hover:bg-gray-800 h-[48px]"
            >
              Get My Proposal
            </button>
        </form>
    </div>
  );
}
