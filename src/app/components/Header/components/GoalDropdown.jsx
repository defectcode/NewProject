import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

const options = [
  { value: 'brand-visibility', label: 'Brand Visibility' },
  { value: 'sales-conversions', label: 'Sales & Conversions' },
  { value: 'premium-content', label: 'Premium Content' },
  { value: 'custom-collaboration', label: 'Custom Collaboration' },
];

export default function GoalDropdown({ onChange, error }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (value) => {
    setSelectedOption(value);
    onChange(value); // Trimite valoarea selectată înapoi către componenta părinte
  };

  return (
    <div className="relative w-full text-[#1E1E1E] font-heboo">
      <label className="block text-[16px] font-semibold text-[#1E1E1E] leading-[1] mb-[10px]">
        Goal
      </label>
      <Listbox value={selectedOption} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="border border-[#6F6F6F] rounded-[10px] min-h-[56px] px-4 w-full bg-white flex items-center justify-between shadow-none hover:border-black">
              <span>
                {selectedOption
                  ? options.find((o) => o.value === selectedOption)?.label
                  : 'Select Your Goal'}
              </span>
              <img
                src="/imgs/arrow.svg"
                alt="Dropdown icon"
                className={`w-[11px] h-[6px] transition-transform duration-200 ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Listbox.Button>
            <Listbox.Options className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-[10px] z-20 overflow-hidden border border-[#E0E0E0]">
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `cursor-pointer flex items-center gap-3 mx-5 py-5 text-[14px] ${
                      active ? '' : ''
                    } ${
                      index !== options.length - 1 ? 'border-b border-[#E0E0E0] ' : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`w-5 h-5 border border-[#6F6F6F] rounded flex items-center justify-center ${
                          selected ? 'bg-[#1E1E1E]' : 'bg-white'
                        }`}
                      >
                        {selected && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={selected ? 'text-[#000000]' : ''}>
                        {option.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
      {/* Afișează mesajul de eroare dacă există */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}