import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {
  customSelectCodeStyle,
  DropdownIndicator,
} from '@functions/select-style.js';

import Input from '@simple/Input';

import s from './style.module.css';

const CODES = [
  {
    value: '+38',
    label: (
      <span className={s.codeItem}>
        <img src="/assets/images/uk.svg" alt="uk" /> (+38)
      </span>
    ),
  },
];

const Phone = ({
  onChange,
  onBlur,
  onFocus,
  onCodeChange,
  name,
  codeName,
  code,
  value,
  label,
  id,
}) => {
  return (
    <div className={s.phone}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <div className={s.inline}>
        <div className={s.inlineItem}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={false}
            styles={customSelectCodeStyle}
            placeholder="Code"
            options={CODES}
            hideSelectedOptions={false}
            defaultValue={code}
            onChange={onCodeChange}
            id={id}
            name={codeName}
            components={{ DropdownIndicator }}
          />
        </div>
        <div className={s.inlineItem}>
          <Input
            onBlur={onBlur}
            onFocus={onFocus}
            onFocus={onFocus}
            value={value}
            name={name}
            placeholder="Phone number"
            id="phone"
            onChange={onChange}
            type="tel"
          />
        </div>
      </div>
    </div>
  );
};

Phone.defaultProps = {
  label: '',
};

Phone.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  codeName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};
export default Phone;
