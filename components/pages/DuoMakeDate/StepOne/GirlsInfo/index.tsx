import React from 'react';

import s from './style.module.css';
import { Escort } from '@typedefs/app';

interface Props {
  title: string;
  age: string;
}

const GirlsInfo = ({ title, age }: Props) => {
  return (
    <div className={s.girlInfo}>
      <h2 className={s.title}>About {title}</h2>
      <p className={s.item}>
        <span className={s.itemName}>Age:</span>
        {age} years
      </p>
    </div>
  );
};

export default GirlsInfo;
