import React, { ChangeEvent } from 'react';
import { useField } from 'formik';
import InputCheckbox from '@simple/InputCheckbox';

interface IProps {
  label: string;
  name: string;
  value: string;
}

const InputCheckboxFormik = ({ label, name, value }: IProps) => {
  const [fieldProps] = useField<string>({ name, type: 'checkbox', value });
  const { onChange } = fieldProps;

  return (
    <InputCheckbox
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputCheckboxFormik;
