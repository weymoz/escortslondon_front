import React, { ReactElement } from 'react';
import s from './style.module.css';
import cx from 'classnames';

interface Props {
  className: string;
}

export default function Subheader({ className }: Props): ReactElement {
  return (
    <div className={cx(s.contactWrapper, className)}>
      <img
        className={s.contactImage}
        src="/assets/images/lips.png"
        alt="lips"
      />
      <div className={s.contact}>
        <p className={s.contactLabel}>Calls and SMS</p>
        <a className={s.contactTel} href="tel:079 079 00666 ">
          079 079 00666
        </a>
      </div>
    </div>
  );
}
