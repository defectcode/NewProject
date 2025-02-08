import Image from 'next/image';
import { useState } from 'react';
import Select, { components } from 'react-select';

const options = [
  { value: 'product-contribution', label: 'Product Contribution' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'strategic-collaboration', label: 'Strategic Collaboration' },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid #CDCDCD' : '1px solid #CDCDCD',
    borderRadius: '10px',
    minHeight: '48px',
    padding: '0 1rem',
    backgroundColor: '#000000',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(205, 205, 205, 0.5)' : 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      border: '1px solid black',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#1E1E1E',
    color: 'white',
    borderRadius: '5px',
    padding: '2px 5px',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center', 
    margin: '2px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
    whiteSpace: 'nowrap',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0',
  }),
  clearIndicator: () => null,
  menu: (provided) => ({
    ...provided,
    borderRadius: '10px',
    border: '1px solid #CDCDCD',
    backgroundColor: '#212121',
    zIndex: '20',
    width: '300px',
    position: 'absolute',
    right: '0',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: state.isFocused ? '#212121' : state.isSelected ? '#212121' : '#212121',
    color: state.isSelected || state.isFocused ? '#FFFFFF' : '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#333333',
    },
  }),
};

const DropdownIndicator = (props) => {
  const { selectProps } = props;
  const open = selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/imgs/arrow.svg"
        alt="Dropdown icon"
        width={11}
        height={6}
        className={`w-[11px] h-[6px] transition-transform duration-200 ${
          open ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </components.DropdownIndicator>
  );
};

export default function GoalDropdown({ onChange, error }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onChange(selected ? selected.map(option => option.value) : []);
  };

  return (
    <div className="relative text-[#FFFFFF] font-heboo">
      <label className="block text-[16px] font-semibold text-[#FFFFFF] leading-[1] mb-[10px]">
        Goals
      </label>
      <Select
        isMulti
        isSearchable={false}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        styles={customStyles}
        components={{
          IndicatorSeparator: () => null, 
          DropdownIndicator, 
          ClearIndicator: () => null, 
        }}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

