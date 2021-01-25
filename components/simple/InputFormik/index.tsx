import React, { ReactElement } from 'react';
import Input from '@simple/Input';
import { useField } from 'formik';

interface Props {
  name: string;
  inputType: string;
  id?: string;
  placeholder?: string;
}

export default function InputFormik({
  name,
  inputType,
  id,
  placeholder,
}: Props): ReactElement {
  const [fieldInputProps] = useField<string>({
    name,
    type: inputType,
  });

  return (
    <Input
      type={inputType || 'text'}
      {...fieldInputProps}
      id={id}
      placeholder={placeholder}
    />
  );
}
