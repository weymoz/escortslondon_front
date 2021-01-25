import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { SelectOption } from '@components/pages/Main/Hero/types';
import Arrow from '@svg/arrow-down.svg';
import Search from '@svg/search.svg';
import s from './style.module.css';

interface Props {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  name: string;
  value: string;
}

export const Popout = ({ options, onChange, name, value }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonValue =
    value ||
    (options.length > 0 && `${options.length} adresses found`) ||
    'Select address';
  const handleButtonClick = () => setIsOpen(!isOpen);
  const handleChange = (option: SelectOption) => {
    onChange(option);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={handleButtonClick} className={s.button}>
        <span className={s.buttonValue}>{buttonValue}</span>
        <Arrow />
      </button>
      {isOpen && (
        <Select
          className={s.select}
          onBlur={handleButtonClick}
          styles={{
            container: base => ({
              ...base,
            }),
            control: base => ({
              ...base,
              borderRadius: 0,
              padding: '4px 16px 0 16px',
              border: 'none',
            }),
            valueContainer: base => ({
              ...base,
              height: 46,
            }),
            input: base => ({
              ...base,
              fontSize: '14px',
            }),
            placeholder: base => ({
              ...base,
              fontSize: '14px',
            }),
            menu: base => ({
              ...base,
              borderRadius: 0,
              marginTop: 0,
              boxShadow: 'none',
              zIndex: 2,
            }),
            option: (base, state) => {
              return {
                ...base,
                color: state.isFocused ? '#FA1D52' : 'black',
                backgroundColor: state.isFocused ? '#F3F3F3' : 'white',
                cursor: 'pointer',
              };
            },
          }}
          autoFocus
          controlShouldRenderValue={false}
          options={options}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          placeholder="Search by name"
          onChange={handleChange}
          name={name}
          menuIsOpen={true}
          value={value ? { value, label: value } : null}
        />
      )}
    </div>
  );
};

const ValueContainer = props => {
  return (
    <div className={s.valueContainer}>
      <Search className={s.searchIcon} />
      <components.ValueContainer {...props}>
        {props.children}
      </components.ValueContainer>
    </div>
  );
};
