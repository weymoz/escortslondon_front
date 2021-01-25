import React, { ReactElement, SyntheticEvent, useCallback } from 'react';
import InputAttach from '@simple/InputAttach';
import { useField } from 'formik';

interface Props {
  name: string;
}

export default function InputAttachFormik({ name }: Props): ReactElement {
  const [fieldProps, _, helpers] = useField<File>({ name });
  const { value } = fieldProps;
  const { setValue } = helpers;

  const handleChange = ({
    currentTarget: { files },
  }: SyntheticEvent<HTMLInputElement>) => {
    if (files && files.length > 0) setValue(files[0]);
  };

  return (
    <InputAttach
      name={name}
      selectedFileName={value ? value.name : ''}
      onChange={handleChange}
    />
  );
}
