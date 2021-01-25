import React from 'react';
import PropTypes from 'prop-types';

import s from './style.module.css';

const Textarea = ({
  onBlur,
  onChange,
  placeholder,
  name,
  id,
  value,
  label,
  className
}) => (
  <div className={`${s.textarea} ${className ? className : ""}`}>
    {label ? <label htmlFor={id}>{label}</label> : null}
    <textarea
      onBlur={onBlur}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </div>
);

Textarea.defaultProps = {
  label: '',
};

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};
export default Textarea;
