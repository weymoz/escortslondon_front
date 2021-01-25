import React, { ReactElement, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PhoneInput from "react-phone-input-2";

import Title from "@simple/Title";
import Field from "@simple/Field";
import Textarea from "@simple/Textarea";
import Input from "@simple/Input";

import s from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import {
  Step3InputFieldName,
  Step3Fields,
  StepData,
  setInputField,
} from "@store/escortDate";
import { fieldIsValid } from "@functions/helpers";
import ScrollToTop from "@simple/ScrollToTop";

const NAME_FIELD: Step3InputFieldName = "name";
const EMAIL_FIELD: Step3InputFieldName = "email";
const PHONE_FIELD: Step3InputFieldName = "phone";
const COMMENT_FIELD: Step3InputFieldName = "comment";

type Props = {};

const StepThree = ({}: Props): ReactElement => {
  // Hooks
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });

  const dispatch = useDispatch();

  const initName = useSelector<RootState>(
    (state) => state.escortDate.step3.value.name
  );

  const [name, setName] = useState(initName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const { name: nameError, email: emailError, phone: phoneError } = useSelector<
    RootState
  >((state) => state.escortDate.step3.error) as Step3Fields<string>;

  const handleChange = (
    changedValue: string | React.SyntheticEvent<HTMLInputElement>,
    name?: string
  ) => {
    if (typeof changedValue === "string") {
      if (!name)
        throw new Error(
          '"name" parameter must be defined if "value" is of type string'
        );
      switch (name) {
        case "name":
          setName(changedValue);
          return;
        case "email":
          setEmail(changedValue);
          return;
        case "phone":
          setPhone(changedValue);
          return;
        case "comment":
          setComment(changedValue);
          return;
      }
    } else if ("currentTarget" in changedValue) {
      const { name, value } = changedValue.currentTarget;

      switch (name) {
        case "name":
          setName(value);
          return;
        case "email":
          setEmail(value);
          return;
        case "phone":
          setPhone(value);
          return;
        case "comment":
          setComment(value);
          return;
      }
    }
  };

  const handleBlur = (
    fieldValue: React.SyntheticEvent<HTMLInputElement> | string,
    fieldName?: string
  ) => {
    let currentName: string = "";
    let currentValue: string = "";

    if (typeof fieldValue === "string") {
      if (!fieldName)
        throw new Error(
          '"name" parameter must be defined if "value" is of type string'
        );
      (currentName = fieldName), (currentValue = fieldValue);
    } else if ("currentTarget" in fieldValue) {
      const { name, value } = fieldValue.currentTarget;
      (currentName = name), (currentValue = value);
    }

    const valid = fieldIsValid(currentName, currentValue);

    dispatch(
      setInputField({
        type: "value",
        name: currentName as Step3InputFieldName,
        value: currentValue,
      })
    );
    dispatch(
      setInputField({
        type: "error",
        name: currentName as Step3InputFieldName,
        value: !valid,
      })
    );
  };

  const handleFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    dispatch(
      setInputField({
        type: "error",
        name: name as Step3InputFieldName,
        value: false,
      })
    );
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
        <Field label="Name" error={(nameError && "Enter Your name") || null}>
          <Input
            type="text"
            value={name}
            name={NAME_FIELD}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            onBlur={handleBlur}
            onFocus={handleFocus}
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
            onChange={handleChange}
            name={EMAIL_FIELD}
            placeholder="Enter your email"
            required
            onBlur={handleBlur}
            onFocus={handleFocus}
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
            onChange={(value: string) => handleChange(value, PHONE_FIELD)}
            containerClass={s.phoneInputContainer}
            inputClass={s.phoneInputInput}
            buttonClass={s.phoneInputButton}
            disableSearchIcon
            placeholder="Enter phone number"
            inputProps={{
              name: "phone",
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              const { name, value } = e.currentTarget;
              handleBlur(value.replace(/\(|\)| /g, ""), name);
            }}
            onFocus={handleFocus}
            masks={{ gb: ".... ............" }}
          />
        </Field>
        <Field label="Comment">
          <Textarea
            id="comment"
            value={comment}
            onChange={handleChange}
            name={COMMENT_FIELD}
            placeholder="Enter your comment"
            onBlur={handleBlur}
          />
        </Field>
      </div>
    </form>
  );
};

export default StepThree;
