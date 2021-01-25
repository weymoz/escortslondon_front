import React from 'react';

import s from './style.module.css';
import { Escort } from '@store/escorts';

interface Props {
  data: Escort;
  datePrice: number;
}

const GirlsInfo = ({ data, datePrice }: Props) => {
  if (!data) return null;

  const { title, age, location, services, rates } = data;
  return (
    <div className={s.girlInfo}>
      <div className={s.girlInfo__about}>
        <div className={s.girlInfo__title}>About {title}</div>
        <ul className={s.aboutList}>
          <li>
            <span>Age:</span>
            {age} years
          </li>
          <li>
            <span>Location:</span>
            {location?.name}
          </li>
          <li>
            <span>Minimal price:</span>£{datePrice}
          </li>
        </ul>
      </div>
      {/*
      <div className={s.girlInfo__tags}>
        <div className={s.girlInfo__title}>Included Services</div>
        <ul className={s.tagList}>
          {services?.map(service => (
            <li>{service}</li>
          ))}
        </ul>
      </div>
        */}
    </div>
  );
};

export default GirlsInfo;
