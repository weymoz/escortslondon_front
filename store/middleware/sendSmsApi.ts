import { Middleware } from "redux";
import { RootState } from "../reducer";
import { setSmsCode, sendSms } from "../smsCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { nameChecker, emailChecker, phoneChecker } from "@store/helpers";
import { setFormErrors, setShowModal } from "@store/duoEscortDate";
import { sendSms as clicksendSendSms } from "@functions/clicksend";

declare const DUO_ESCORTS_DATE_TEST_PHONE_NUMBER: string;

export interface FormErrors {
  nameError: boolean;
  emailError: boolean;
  phoneError: boolean;
}

const sendSmsApi: Middleware<{}, RootState> = ({ dispatch, getState }) => (
  next
) => (action: PayloadAction<any | string>) => {
  if (action.type !== sendSms.type) {
    return next(action);
  }

  const {
    settings: { useTestSmsNumber },
    duoEscortDate: { phone, name, email },
  } = getState();

  const nameError = !nameChecker.test(name);
  const emailError = !emailChecker.test(email);
  const phoneError = !phoneChecker.test(phone);
  const formErrors = nameError || emailError || phoneError;

  if (formErrors) {
    dispatch(
      setFormErrors({
        nameError,
        emailError,
        phoneError,
      })
    );
  } else {
    const currentPhone = useTestSmsNumber ? "+8615555555555" : phone;
};

export default sendSmsApi;
