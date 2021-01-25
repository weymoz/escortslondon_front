import React from 'react';

import s from './style.module.css';

const Logo = () => (
  <a href="/" className={s.logo}>
    <img src="./assets/images/logo.png" alt="logo" />
    <span>Fit3d</span>
  </a>
);
Logo.propTypes = {};
export default Logo;
