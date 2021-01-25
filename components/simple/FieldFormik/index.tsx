import React from 'react';
import { useField } from 'formik';
import Field from '@simple/Field';

interface Props {
  name: string;
  label: string;
  children: any;
  infoText?: string;
}
export default function FieldFormik({
  infoText,
  name,
  label,
  children,
}: Props) {
  const [_, meta] = useField({ name });
  const { error, touched } = meta;
  return (
    <Field infoText={infoText} label={label} error={(touched && error) || ''}>
      {children}
    </Field>
  );
}
