import React from 'react';
import { Link } from 'react-router-dom';

import NotFoundIcon from '@svg/not-found.svg';
import s from './style.module.css';

const NotFound = () => (
  <div className={s.root}>
    <div className={s.container}>
      <div className={s.wrapper}>
        <NotFoundIcon />
        <div className={s.content}>
          <div className={s.heading}>Something missing...</div>
          <div className={s.text}>
            Looks like the page you are tying to visit doesn’t exist. Check URL address or try later. In any case we
            apologize for the inconvenience
          </div>
          <Link to="/" className={s.linkBack}>
            Back to Main page
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
