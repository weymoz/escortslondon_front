import React, { ReactElement } from 'react';
import s from './style.module.css';

interface Props {
  text?: string;
}

export default function LoadingData({ text: string }: Props): ReactElement {
  return <div className={s.wrapper}>{/* <h2 className={s.message}>Loading Data...</h2> */}</div>;
}
