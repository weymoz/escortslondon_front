import React, { ReactElement, useCallback } from 'react';
import Dropzone from '@simple/Dropzone';
import { useFormikContext, useField } from 'formik';

interface Props {
  name: string;
}

const DropzoneFormik = ({ name }: Props): ReactElement => {
  const [fieldProps, meta, helpers] = useField<File>({ name });
  const { setValue } = helpers;

  const handleFile = useCallback((file: File | null) => {
    setValue(file);
  }, []);

  return <Dropzone handleFile={handleFile} />;
};

export default DropzoneFormik;
