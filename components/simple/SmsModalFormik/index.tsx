import React, { useState, useEffect, useRef, useCallback } from "react";
import Countdown from "react-countdown";
import { checkSmsCode } from "@functions/clicksend";
import { useFormikContext } from "formik";
import { CastingFormState } from "@pages/Casting";

import Button from "@simple/Button";

import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSmsCode, sendSms } from "@store/smsCode";
import { RootState } from "@store/reducer";

interface Props {
  closeModal(): void;
  onSuccess(): void;
}

const SmsModalFormik = ({ closeModal, onSuccess }: Props) => {
  const countdownRef = useRef(null);
  const codeRef = useRef(null);
  const {
    values: { phone },
  } = useFormikContext<CastingFormState>();
  const [smsError, setSmsError] = useState(false);
  const dispatch = useDispatch();

  const smsHashCode = useSelector<RootState, string>(selectSmsCode);

  useEffect(() => {
    dispatch(sendSms(phone));
  }, []);

  const handleResendBtn = () => {
    countdownRef.current.api.start();
    dispatch(sendSms(phone));
    setSmsError(false);
  };

  const handleSubmit = () => {
    if (checkSmsCode(codeRef.current.value, smsHashCode)) {
      setSmsError(false);
      onSuccess();
      closeModal();
    } else {
      setSmsError(true);
    }
  };

  return (
    <div className={s.modal}>
      <form
        className={s.modalForm}
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={s.modalTitle}>Verification code</div>
        {smsError ? (
          <p style={{ color: "red" }} className={s.modalDesc}>
            You have entered wrong code. Please try again or click "resend" and
            enter new code
          </p>
        ) : (
          <p className={s.modalDesc}>
            We sent to your phone number verification code. Please enter code to
            confirm your application.
          </p>
        )}
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
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={closeModal} theme="transparent">
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SmsModalFormik;
