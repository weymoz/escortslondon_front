import React, { ReactElement } from 'react';
import Textarea from '@simple/Textarea';
import { useField } from 'formik';

interface Props {
  id?: string;
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
}

export default function TextareaFormik({
  id,
  name,
  placeholder,
  className,
  label,
}: Props): ReactElement {
  const [fieldProps] = useField({ name });
  const { onChange, value } = fieldProps;
  return (
    <Textarea
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      label={label}
      value={value}
      onChange={onChange}
    />
  );
}
