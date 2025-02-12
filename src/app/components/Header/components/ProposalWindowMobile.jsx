import React, { useState } from 'react';
import GoalDropdown from './GoalDropdown';
import Image from 'next/image';
import emailjs from 'emailjs-com'; 

export default function ProposalWindowMobile({ onClose }) {
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

  const handleSubmit = async (e) => {
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

    try {
      const formUrl =
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdF9zUfle8zlyw3CEUTi6D9jnn7tOUn6Zd1Aj5l2byO2xXa7w/formResponse';

      const formData = new URLSearchParams();
      formData.append('entry.200719805', fullName);
      formData.append('entry.783419390', email);
      formData.append('entry.1586475598', brandName);
      formData.append('entry.212391582', goal);
      formData.append('entry.2105910764', message);

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

      const emailJsResponse = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID', 
        {
          fullName,
          email,
          brandName,
          goal,
          message,
        },
        'YOUR_USER_ID' 
      );

      if (emailJsResponse.status === 200) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-between max-h-[344px] rounded-lg bg-black text-center w-full font-heboo">
        <div className="flex justify-end items-center w-full">
          <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
            <Image src="/icons/Close.svg" width={14} height={14} alt='close' className='mb-[20px] text-[#1E1E1E]'/>
          </button>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <h2 className="text-2xl text-[#1E1E1E] font-bold mb-10 leading-[1]">Thank You!</h2>

          <Image src='./imgs/select.svg' alt='select' width={27} height={27}/>
          <p className="text-[16px] text-[#1E1E1E] mb-[60px] mt-5 leading-[1.2] font-heboo font-normal">
          Your request has been sent! We will <br/>contact you soon
          </p>
        </div>
        <button
          className="bg-[#1E1E1E] text-white px-5 w-full py-3 rosunded-lg hover:bg-gray-800 h-[48px] font-avenirHeavy"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-[#FFFFFF] w-full font-heboo px-5 bg-black">
  
      <form onSubmit={handleSubmit} className="space-y-5 mb-5">
        <div>
          <label className="block text-[16px] font-semibold mb-1 font-heboo" htmlFor="name">
            Name
          </label>
          <div className="relative w-full ">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#979797]">
              <Image src="/imgs/user.svg" width={18} height={18} alt="User Icon" />
            </span>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className="w-full border border-[#CDCDCD] h-[48px] rounded-[10px] px-10 py-2 bg-[#000000]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {fullNameError && (
            <p className="text-red-500 text-sm mt-2">{fullNameError}</p>
          )}
        </div>

        <div>
          <label className="block text-[16px] font-semibold mb-1" htmlFor="email">
            Contact
          </label>
          <div className="relative w-full">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Image src="/imgs/naruto.svg" width={20} height={20} alt="Email Icon" />
            </span>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full border border-[#CDCDCD] h-[48px] rounded-[10px] px-10 py-2 bg-[#000000]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-[16px] font-semibold mb-1" htmlFor="brand-name">
            Brand
          </label>
          <div className="relative w-full">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Image src="/imgs/element.svg" width={15} height={18} alt="Tag Icon" />
            </span>
            <input
              type="text"
              id="brand-name"
              placeholder="Brand name"
              className="w-full border border-[#CDCDCD] h-[48px] rounded-[10px] px-10 py-2 bg-[#000000]"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          {brandNameError && (
            <p className="text-red-500 text-sm mt-2">{brandNameError}</p>
          )}
        </div>

        <div className='text-black'>
          <GoalDropdown
            onChange={(value) => {
              setGoal(value);
              setGoalError(''); 
            }}
            error={goalError} 
          />
        </div>

        <div className="relative">
          <label className="block text-[17px] font-medium text-[#FFFFFF] mb-1" htmlFor="message">
          How can You contribute? 
          {/* <span className="text-[14px] text-[#6F6F6F]">(Optional)</span> */}
          </label>
          <textarea
            id="message"
            placeholder="Share any details"
            className="w-full border border-[#CDCDCD] rounded-lg h-[100px] text-start px-5 bg-[#000000] focus:outline-none resize-none pt-[35px]"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-[#1E1E1E] rounded-lg px-4 py-2 mt-2 cursor-pointer h-[48px] font-avenir-heavy"
        >
          Apply for Collaboration
        </button>
      </form>
    </div>
  );
}