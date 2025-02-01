import React, { useState } from 'react';
import Select, { components } from 'react-select';

const customStyles = {
  control: (base) => ({
    ...base,
    border: '1px solid #6F6F6F',
    borderRadius: '10px',
    minHeight: '56px',
    padding: '0 8px',
    width: '100%',
    backgroundColor: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'none',
    ':hover': {
      borderColor: '#000',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '250px',
    position: 'absolute',
    right: '0',
    zIndex: 10,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#E5E7EB',
    borderRadius: '5px',
    padding: '3px 6px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#1E1E1E',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#6F6F6F',
    cursor: 'pointer',
    ':hover': {
      color: '#000',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#E5E7EB' : state.isFocused ? '#F0F0F0' : '#FFF',
    color: '#1E1E1E',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: state.isSelected ? 'bold' : 'normal',
  }),
};

// Opțiunile disponibile
const options = [
  { value: 'brand-visibility', label: 'Brand Visibility' },
  { value: 'sales-conversions', label: 'Sales & Conversions' },
  { value: 'premium-content', label: 'Premium Content' },
  { value: 'custom-collaboration', label: 'Custom Collaboration' },
];

// Componență personalizată pentru opțiunile cu checkbox
const CustomOption = ({ data, isSelected, innerRef, innerProps }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
      isSelected ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
    }`}
  >
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => null}
      className="form-checkbox h-4 w-4 text-[#1E1E1E] border-gray-300"
    />
    <span>{data.label}</span>
  </div>
);

export default function GoalDropdown() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  return (
    <div className="relative w-full text-[#1E1E1E] font-heboo">
      <label className="block text-[16px] font-semibold mb-2" htmlFor="goal">
        Goal
      </label>
      <Select
        id="goal"
        options={options}
        placeholder="Select Your Goals"
        styles={customStyles}
        components={{ Option: CustomOption }}
        value={selectedOptions}
        onChange={handleChange}
        isMulti
        closeMenuOnSelect={false}
      />
    </div>
  );
}
