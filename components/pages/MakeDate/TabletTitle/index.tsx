import React, { ReactElement } from 'react';

import Title from '@simple/Title';

import s from './style.module.css';

type TabletTitle = {
  step: number;
};

export const TabletTitle = ({ step, name }: TabletTitle): ReactElement => {
  return (
    <div className={s.titleWrapper}>
      <Title size="h4">
        {step === 1 ? 'Choose your girl' : null}
        {step === 2 ? `Make a date with ${name}` : null}
        {step === 3 ? 'Enter your details' : null}
      </Title>
    </div>
  );
};

export default TabletTitle;
