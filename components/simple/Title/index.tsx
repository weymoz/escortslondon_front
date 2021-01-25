import React, { FC } from 'react';

import s from './style.module.css';

interface ITitle {
  children: any;
  size?: string;
  content?: string;
  after?: string;
  onClick?: () => void;
}

const Title = ({ children, size='h3', content, after, onClick }: ITitle) => (
  <>
    {size === 'h1' ? (
      <h1 className={`${s.title} ${s.h1}`}>{children}</h1>
    ) : null}
    {size === 'h2' ? (
      <h2 className={`${s.title} ${s.h2}`}>{children}</h2>
    ) : null}
    {size === 'h3' ? (
      <h3 className={`${s.title} ${s.h3}`} aria-label={content}>
        {children}
      </h3>
    ) : null}
    {size === 'h4' ? (
      <h4 className={`${s.title} ${s.h4}`}>{children}</h4>
    ) : null}
    {size === 'h5' ? (
      <h5 className={`${s.title} ${s.h5}`}>{children}</h5>
    ) : null}
    {size === 'h6' ? (
      <h6 className={`${s.title} ${s.h6}`}>{children}</h6>
    ) : null}
    {after && after.length ? (
      <span
        className={`${s.afterTitle} ${onClick && s.clicked}`}
        onClick={onClick && onClick}
      >{`${after}`}</span>
    ) : null}
  </>
);

export default Title;
