import { useState } from 'react';
import Select, { components } from 'react-select';

const options = [
  { value: 'brand-visibility', label: 'Brand Visibility' },
  { value: 'sales-conversions', label: 'Sales & Conversions' },
  { value: 'premium-content', label: 'Premium Content' },
  { value: 'custom-collaboration', label: 'Custom Collaboration' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #6F6F6F',
    borderRadius: '10px',
    minHeight: '56px',
    padding: '0 1rem',
    backgroundColor: 'white',
    boxShadow: 'none',
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
    border: '1px solid #E0E0E0',
    backgroundColor: 'white',
    zIndex: '20',
    width: '300px',
    position: 'absolute',
    right: '0',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: state.isSelected ? '#1E1E1E' : 'white',
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F0F0F0',
    },
  }),
};

const DropdownIndicator = (props) => {
  const { selectProps } = props;
  const open = selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <img
        src="/imgs/arrow.svg"
        alt="Dropdown icon"
        className={`w-[11px] h-[6px] transition-transform duration-200 ${
          open ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </components.DropdownIndicator>
  );
};

export default function MultiSelectDropdown({ onChange, error }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onChange(selected ? selected.map(option => option.value) : []);
  };

  return (
    <div className="relative text-[#1E1E1E] font-heboo">
      <label className="block text-[16px] font-semibold text-[#1E1E1E] leading-[1] mb-[10px]">
        Goals
      </label>
      <Select
        isMulti
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
