import React, { useState } from 'react';
import GoalDropdown from './GoalDropdown';
import Image from 'next/image';
import emailjs from 'emailjs-com'; 

export default function ProposalWindow({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [brandNameError, setBrandNameError] = useState('');
  const [goalError, setGoalError] = useState('');

  const [selectedPositions, setSelectedPositions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  const resetForm = () => {
    setSelectedPositions([]);
    setEmail('');
    setFullName('');
    setPhone('');
    setCountry('');
    setMessage('');
    setLinkedin('');
    setPortfolio('');
    setFile('');
    setIsDropdownOpen(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/submitEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          position: selectedPositions.join(", "), 
          email, 
          fullName, 
          phone, 
          country, 
          file, 
          linkedin, 
          portfolio 
        }),
      });


      e.preventDefault();

    setFullNameError('');
    setEmailError('');
    setBrandNameError('');
    setGoalError('');

    let isValid = true;

    if (!fullName) {
      setFullNameError('This entry is required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('This entry is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!brandName) {
      setBrandNameError('This entry is required.');
      isValid = false;
    }

    if (!goal) {
      setGoalError('This entry is required.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
      
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const result = await response.json();
      setMessage(result.message || 'Success!');
  
      resetForm();
  
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Something went wrong!');
    }
  };
    



  if (isSubmitted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-heboo">
        <div className="bg-white shadow-lg rounded-[20px] p-5 max-w-[431px] h-[344px] mx-auto text-center flex flex-col items-center justify-center w-full">
          <div className="flex justify-end items-center w-full">
            <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
              <Image src="/icons/Close.svg" width={16} height={16} alt='close' className='text-[#1E1E1E]'/>
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 mt-4">Thank You!</h2>
          <Image src="/imgs/select.svg" alt="select" width={27.06} height={27.06} />
          <p className="text-[16px] font-heboo font-normal text-[#1E1E1E] mb-[60px] mt-5">
            Your Request Has Been Sent! We Will <br /> Contact You Soon.
          </p>
          <button
            className="bg-[#1E1E1E] text-[#FFFFFF] px-5 py-3 h-[48px] rounded-lg w-full font-avenirHeavy cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-heboo">
      <div className="bg-white shadow-xl rounded-2xl p-5 w-full max-w-[430px] mx-auto">
        <div className="flex justify-between items-center w-full mt-5">
          <h2 className="text-[20px] text-[#1E1E1E] leading-[1] font-semibold mb-5 flex items-center justify-center">Request a proposal</h2>
          <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
            <Image src="/icons/closeBlack.svg" width={14} height={14} alt='close' className='mb-[20px] mr-2 text-[#1E1E1E]'/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[16px] font-semibold text-[#1E1E1E] leading-[1] mb-[10px]" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image src="/imgs/user.svg" width={18} height={18} alt="User Icon" />
              </span>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full border border-[#6F6F6F] rounded-lg h-[56px] px-10 text-gray-800"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {fullNameError && (
              <p className="text-red-500 text-sm mt-2">{fullNameError}</p>
            )}
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-[#1E1E1E] leading-[1] mb-[10px]" htmlFor="email">
              Contact
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image src="/imgs/naruto.svg" width={18} height={18} alt="Email Icon" />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full border border-[#6F6F6F] rounded-lg h-[56px] px-10 text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-[#1E1E1E] leading-[1] mb-[10px]" htmlFor="brand-name">
              Brand
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image src="/imgs/element.svg" width={15} height={15} alt="Brand Icon" />
              </span>
              <input
                type="text"
                id="brand-name"
                placeholder="Brand name"
                className="w-full border border-[#6F6F6F] rounded-lg h-[56px] px-10 text-gray-800"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            {brandNameError && (
              <p className="text-red-500 text-sm mt-2">{brandNameError}</p>
            )}
          </div>

          <GoalDropdown
            onChange={(value) => {
              setGoal(value);
              setGoalError(''); 
            }}
            error={goalError} 
          />

          <div className="relative">
            <label className="block text-[17px] font-medium text-[#1E1E1E] mb-1" htmlFor="message">
              Message <span className="text-[14px] text-[#6F6F6F] font-medium">(Optional)</span>
            </label>
            <textarea
              id="message"
              placeholder="Share any details"
              className="w-full border border-[#6F6F6F] rounded-lg h-[100px] text-[#1E1E1E] text-start px-5 placeholder-gray-500 focus:outline-none resize-none pt-[35px]"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg h-[48px] hover:bg-gray-800 font-avenirHeavy"
          >
            Get Proposal
          </button>
        </form>
      </div>
    </div>
  );
}