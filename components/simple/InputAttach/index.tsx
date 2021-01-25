import React, { SyntheticEvent } from 'react';
import s from './style.module.css';

import AttachIcon from '@svg/attach.svg';

interface IProps {
  name: string;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  selectedFileName: string;
}

const InputFile = ({ name, onChange, selectedFileName }: IProps) => {
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.persist();
    onChange(e);
  };
  return (
    <label className={s.uploadFile} htmlFor={name}>
      <input id={name} name={name} type="file" onChange={handleChange} />
      <span className={s.uploadPlaceholder}>
        <AttachIcon /> <span>{selectedFileName || 'Attach a document'}</span>
      </span>
    </label>
  );
};

export default InputFile;
