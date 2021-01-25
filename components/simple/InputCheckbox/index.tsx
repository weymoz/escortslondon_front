import React, { ChangeEvent } from 'react';

import s from './style.module.css';

interface IProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox = ({ label, name, onChange, value }: IProps) => {
  return (
    <label htmlFor={label} className={s.checkbox}>
      <input
        id={label}
        onChange={onChange}
        name={name}
        value={value}
        type="checkbox"
      />
      <span className={s.checkboxMask}>{label}</span>
    </label>
  );
};

export default InputCheckbox;
