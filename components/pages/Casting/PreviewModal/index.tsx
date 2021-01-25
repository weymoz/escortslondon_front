import React from 'react';
import s from './style.module.css';
import PreviewProfileContainer from '../PreviewProfileContainer';

interface Props {
  closeModal(): void;
}

export default function PreviewModal({ closeModal }: Props) {
  return (
    <div className={s.screen}>
      <div className={s.container}>
        <PreviewProfileContainer closeModal={closeModal} />
      </div>
    </div>
  );
}
