import React from 'react';

import Title from '@simple/Title';

import s from './style.module.css';

const GirlNotFound = props => {
  return (
    <div className={s.girlNotFound}>
      <div className={s.container}>
        <div className={s.titleWrapper}>
          <Title content="Sorry">No angel has been found...</Title>
        </div>
        <p>We’re sure we have a sexy angel who’s right for you, if you just try another search.</p>
      </div>
    </div>
  );
};

export default GirlNotFound;
