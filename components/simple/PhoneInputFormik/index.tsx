import React, { ReactElement } from 'react';
import { useField } from 'formik';
import PhoneInput from 'react-phone-input-2';
import s from './style.module.css';

interface Props {
  name: string;
  label: string;
}

export default function PhoneInputFormik({ name, label }: Props): ReactElement {
  const [, , { setValue }] = useField<string>({ name });
  return (
    <div className={s.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <PhoneInput
        containerClass={s.phoneInputContainer}
        inputClass={`${s.phoneInputInput} ${s.override}`}
        buttonClass={s.phoneInputButton}
        dropdownClass={s.dropdownContainer}
        country="gb"
        enableSearch
        disableSearchIcon
        onChange={setValue}
      />
    </div>
  );
}
