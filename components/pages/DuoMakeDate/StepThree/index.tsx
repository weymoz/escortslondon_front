import React, { ReactElement, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PhoneInput from "react-phone-input-2";
import Title from "@simple/Title";
import Field from "@simple/Field";
import Phone from "@simple/Phone";
import Textarea from "@simple/Textarea";
import Input from "@simple/Input";
import s from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import { first } from "lodash";
import ScrollToTop from "@simple/ScrollToTop";
import {
  selectDuoEscortDateName,
  setName,
  selectDuoEscortDateNameError,
  checkName,
  setEmail,
  selectDuoEscortDateEmail,
  selectDuoEscortDateEmailError,
  checkEmail,
  selectDuoEscortDatePhone,
  selectDuoEscortDatePhoneError,
  selectDuoEscortDateComment,
  setComment,
  setPhone,
  checkPhone,
} from "@store/duoEscortDate";

type Props = {};

const StepThree = ({}: Props): ReactElement => {
  // Hooks
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });

  const dispatch = useDispatch();

  const name = useSelector<RootState, string>(selectDuoEscortDateName);
  const nameError = useSelector<RootState, boolean>(
    selectDuoEscortDateNameError
  );
  const email = useSelector<RootState, string>(selectDuoEscortDateEmail);
  const emailError = useSelector<RootState, boolean>(
    selectDuoEscortDateEmailError
  );

  const phone = useSelector<RootState, string>(selectDuoEscortDatePhone);
  const phoneError = useSelector<RootState, boolean>(
    selectDuoEscortDatePhoneError
  );

  const comment = useSelector<RootState, string>(selectDuoEscortDateComment);

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(setName(e.currentTarget.value));
  };
  const handleEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.currentTarget.value));
  };

  const handlePhoneChange = (phone: string) => {
    dispatch(setPhone(phone));
  };

  const handleCommentChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(setComment(e.currentTarget.value));
  };

  const handleNameBlur = () => {
    dispatch(checkName());
  };
  const handleEmailBlur = () => {
    dispatch(checkEmail());
  };

  const handlePhoneBlur = () => {
    dispatch(checkPhone());
  };

  return (
    <form className={s.form} onSubmit={(e) => e.preventDefault()}>
      <ScrollToTop />
      {!isTablet ? (
        <div className={s.form__title}>
          <Title size="h4">Enter your details</Title>
        </div>
      ) : null}
      <div className={s.form__grid}>
        <Field label="Name" error={nameError ? "Enter valid name" : ""}>
          <Input
            type="text"
            value={name}
            name="name"
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
            onBlur={handleNameBlur}
          />
        </Field>
        <Field
          label="Email"
          error={(emailError && "Enter valid email") || null}
        >
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder="Enter your email"
            required
            onBlur={handleEmailBlur}
          />
        </Field>
        <Field
          label="Phone"
          error={(phoneError && "Enter valid phone number") || null}
          className={s.phoneInputField}
        >
          <PhoneInput
            country={"gb"}
            value={phone}
            enableSearch
            onChange={handlePhoneChange}
            containerClass={s.phoneInputContainer}
            inputClass={s.phoneInputInput}
            buttonClass={s.phoneInputButton}
            disableSearchIcon
            placeholder="Enter phone number"
            inputProps={{
              name: "phone",
            }}
            masks={{ gb: ".... ............" }}
            onBlur={handlePhoneBlur}
          />
        </Field>
        <Field label="Comment">
          <Textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            name="comment"
            placeholder="Enter your comment"
          />
        </Field>
      </div>
    </form>
  );
};

export default StepThree;
