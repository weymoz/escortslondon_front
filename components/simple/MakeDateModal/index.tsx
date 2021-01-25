import React, { useState, useRef } from 'react';
import Countdown from 'react-countdown';

import Button from '@simple/Button';

import s from './style.module.css';

const MakeDateModal = ({ handleClose, handleSuccess, handleResend }) => {
  const countdownRef = useRef(null);
  const codeRef = useRef(null);

  const handleSubmitButton = () => {
    handleSuccess(codeRef.current.value);
  };

  const handleResendBtn = () => {
    countdownRef.current.api.start();

    handleResend();
  };

  return (
    <div className={s.modal} onClick={handleClose}>
      <form
        className={s.modalForm}
        onClick={e => e.stopPropagation()}
        onSubmit={e => e.preventDefault()}
      >
        <div className={s.modalTitle}>Booking code</div>
        <p className={s.modalDesc}>
          We sent to your phone number booking code. Please enter code to
          confirm booking.
        </p>
        <div className={s.modalInput}>
          <input type="text" placeholder="Enter booking code" ref={codeRef} />
        </div>
        <div className={s.resendCode}>
          <Countdown
            ref={countdownRef}
            date={Date.now() + 30000} // 30s
            renderer={({ hours, minutes, seconds, completed }) => {
              console.log(completed);

              if (completed) {
                return (
                  <button className={s.resendBtn} onClick={handleResendBtn}>
                    Resend code
                  </button>
                );
              } else {
                return <>{`Resend in ${seconds}`}</>;
              }
            }}
          />
        </div>
        <div className={s.modalButtons}>
          <Button onClick={handleSubmitButton}>Submit</Button>
          <Button onClick={handleClose} theme="transparent">
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MakeDateModal;
