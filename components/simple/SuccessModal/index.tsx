import React from 'react';
import PropTypes from 'prop-types';

import Title from '@simple/Title';
import Button from '@simple/Button';
import Input from '@simple/Input';

import s from './style.module.css';

const SuccessModal = ({ onRequestClose }) => {
  return (
    <div className={s.root}>
      <div className={s.top}>
        <Title size="h4">Thank you!</Title>
      </div>
      <div className={s.infoText}>Your review was successfully sent.  It will  be published after approval </div>
      <div className={s.bottom}>
        <div className={s.buttonControl} onClick={onRequestClose}>
          <Button size="sm">Ok</Button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
};

export default SuccessModal;
