import React from 'react';
import s from './style.module.css';

import UploadIcon from '@svg/upload.svg';

interface IProps {
  name: string;
  onChange: () => void;
}

const InputFile = ({ name, onChange }: IProps) => {
  return (
    <label className={s.uploadFile} htmlFor={name}>
      <input id={name} name={name} type="file"  onChange={onChange}/>
      <span className={s.uploadIcon}>
        <UploadIcon />
      </span>
    </label>
  );
};

export default InputFile;
