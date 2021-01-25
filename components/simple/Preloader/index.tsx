import React from 'react';

import Logo from '@svg/logo-full.svg';
import SmallLogo from '@svg/el-logo.svg';

import s from './style.module.css';

interface Props {
  full: boolean;
}

const Preloader = ({ full }: Props) => {
  return (
    <div className={`${s.preloader} ${full ? s.full : ''}`}>
      <div className={s.logo}>
        <Logo />
      </div>
    </div>
  );
};

export default Preloader;
