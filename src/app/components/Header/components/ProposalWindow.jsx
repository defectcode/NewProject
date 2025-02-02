import React, { useState } from 'react';
import GoalDropdown from './GoalDropdown';
import Image from 'next/image';
import emailjs from 'emailjs-com'; // Importă EmailJS

export default function ProposalWindow({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Stări pentru mesajele de eroare
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [brandNameError, setBrandNameError] = useState('');
  const [goalError, setGoalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetăm mesajele de eroare înainte de validare
    setFullNameError('');
    setEmailError('');
    setBrandNameError('');
    setGoalError('');

    // Validare câmpuri obligatorii
    let isValid = true;

    if (!fullName) {
      setFullNameError('This entry is required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('This entry is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Validare format email
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

    // Dacă validarea eșuează, nu trimitem formularul
    if (!isValid) {
      return;
    }

    // Trimitem datele la Google Forms
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

      // Trimite email folosind EmailJS
      const emailJsResponse = await emailjs.send(
        'YOUR_SERVICE_ID', // Înlocuiește cu Service ID de la EmailJS
        'YOUR_TEMPLATE_ID', // Înlocuiește cu Template ID de la EmailJS
        {
          fullName,
          email,
          brandName,
          goal,
          message,
        },
        'YOUR_USER_ID' // Înlocuiește cu User ID de la EmailJS
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-heboo">
        <div className="bg-white shadow-lg rounded-lg px-5 max-w-[431px] h-[344px] mx-auto text-center flex flex-col items-center justify-center w-full">
          <div className="flex justify-end items-center w-full">
            <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
              <Image src="/icons/closeBlack.svg" width={14} height={14} alt='close' className='mb-[20px] mr-2 text-[#1E1E1E]'/>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <Image src="/imgs/select.svg" alt="select" width={48} height={48} />
          <p className="text-lg text-gray-600 mb-6">
            Your Request Has Been Sent! We Will <br /> Contact You Soon.
          </p>
          <button
            className="bg-[#1E1E1E] text-white px-6 py-3 rounded-lg hover:bg-gray-800 w-full"
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Câmpul Full Name */}
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

          {/* Câmpul Email */}
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

          {/* Câmpul Brand Name */}
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
                placeholder="Your Brand Name"
                className="w-full border border-[#6F6F6F] rounded-lg h-[56px] px-10 text-gray-800"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            {brandNameError && (
              <p className="text-red-500 text-sm mt-2">{brandNameError}</p>
            )}
          </div>

          {/* GoalDropdown cu validare */}
          <GoalDropdown
            onChange={(value) => {
              setGoal(value);
              setGoalError(''); // Resetează mesajul de eroare când utilizatorul selectează o opțiune
            }}
            error={goalError} // Trimite mesajul de eroare către GoalDropdown
          />

          {/* Câmpul Message (optional) */}
          <div className="relative">
            <label className="block text-[17px] font-semibold text-[#1E1E1E] mb-1" htmlFor="message">
              Message <span className="text-[14px] text-[#6F6F6F] font-medium">(Optional)</span>
            </label>
            <textarea
              id="message"
              placeholder="Share any details"
              className="w-full border border-gray-300 rounded-lg h-[100px] text-[#1E1E1E] text-start px-5 placeholder-gray-500 focus:outline-none resize-none pt-[35px]"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {/* Butonul de submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg h-[48px] hover:bg-gray-800 font-avenirHeavy"
          >
            Get My Proposal
          </button>
        </form>
      </div>
    </div>
  );
}