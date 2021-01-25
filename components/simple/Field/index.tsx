import React, { ReactElement } from 'react';

import InfoIcon from '@svg/info.svg';

import s from './style.module.css';

type Props = {
  label: string;
  error?: string | null;
  children: React.ReactNode;
  className?: string;
  infoText?: string;
};

const Field = ({
  label,
  error,
  children,
  className,
  infoText,
}: Props): ReactElement => {
  return (
    <div className={`${s.field} ${className ? className : ''}`}>
      <div className={s.fieldText}>
        <label className={s.label}>{label}</label>
        {infoText && (
          <div className={s.labelInfo}>
            <div className={s.infoIcon}>
              <InfoIcon />
            </div>
            <div className={s.infoPopup}>{infoText}</div>
          </div>
        )}
      </div>
      {children}
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default Field;
