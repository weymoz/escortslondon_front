import React, { FC } from 'react';

import Title from '@simple/Title';
import SearchContainer from '@containers/SearchContainer';

import s from './style.module.css';

interface Props {
  message: string;
}

const EscortsListContent: FC<Props> = ({ message }: Props) => {
  return (
    <div className={s.contentWrapper}>
      <div className={s.titleWrapper}>
        <Title content="Naughty and Discrete">{message}</Title>
      </div>
      <SearchContainer />
    </div>
  );
};

export default EscortsListContent;
