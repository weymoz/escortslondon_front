import React, { SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import s from './style.module.css';

interface Props {
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  onFocus?: (e: SyntheticEvent) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string;
  theme?: string;
  required?: boolean;
}

const Input = ({
  onChange,
  onBlur,
  onFocus,
  placeholder,
  type,
  name,
  id,
  label,
  value,
  theme,
  required = false,
}: Props) => {
  return (
    <div className={`${s.input} ${theme ? s[theme] : ''}`}>
      <div className={s.fieldText}>
        {label ? <span className={s.label}>{label}</span> : null}
      </div>
      <input
        onBlur={onBlur}
        onFocus={onFocus}
        required={required}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
Input.defaultProps = {
  label: '',
  required: false,
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  theme: PropTypes.string,
  required: PropTypes.bool,
};
export default Input;
