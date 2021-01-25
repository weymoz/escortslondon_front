import React, { ReactElement } from "react";
import s from "../style.module.css";
import Field from "@simple/Field";
import { castingStyles } from "@functions/select-style";
import Title from "@simple/Title";
import Info from "@svg/info.svg";
import DropzoneFormik from "@simple/DropzoneFormik";
import InputFormik from "@simple/InputFormik";
import SelectFormik from "@simple/SelectFormik";
import InputAttachFormik from "@simple/InputAttachFormik";
import nationalitiesOptions from "./nationalities";
import FieldFormik from "@simple/FieldFormik";
import ErrorMessageFormik from "@simple/ErrorMessageFormik";

const START_AGE = 18;
const END_AGE = 50;

const ages = new Array(END_AGE - START_AGE + 1).fill(0).map((_, i) => ({
  label: (18 + i).toString(),
  value: 18 + i,
}));

const orientations = [
  {
    label: "Heterosexual",
    value: "heterosexual",
  },
  {
    label: "Bisexual",
    value: "bisexual",
  },
];

const bodyTypes = [
  {
    label: "Petite",
    value: "petite",
  },
  {
    label: "Slim",
    value: "slim",
  },
  {
    label: "Athletic",
    value: "athletic",
  },
  {
    label: "Curvy",
    value: "curvy",
  },
];

const busts = [
  {
    label: "Pert",
    value: "pert",
  },
  {
    label: "Busty",
    value: "busty",
  },
  {
    label: "Super busty",
    value: "super busty",
  },
];

const heights = [
  "5' / 152cm",
  "5'1 / 155cm",
  "5'2 / 158cm",
  "5'3 / 160cm",
  "5'4 / 163cm",
  "5'5 / 165cm",
  "5'6 / 167cm",
  "5'7 / 170cm",
  "5'8 / 172cm",
  "5'9 / 163cm",
  "5'10 / 175cm",
  "5'11 / 180cm",
  "6' / 182cm",
  "6'1 / 185cm",
  "6'2 / 188cm",
  "6'3 / 190cm",
].map((item) => ({
  value: item,
  label: item,
}));

interface Props {}

export default function MainFields({}: Props): ReactElement {
  return (
    <>
      <div className={s.imageWrapper}>
        <DropzoneFormik name="galleryPhoto" />
        <p className={s.mainFields__info}>
          <Info /> Upload gallery photo
        </p>
        <ErrorMessageFormik name="galleryPhoto" cssDisplay="inline" />
      </div>
      <div className={s.fieldsWrapper}>
        <FieldFormik label="Name*" name="name">
          <InputFormik
            inputType="text"
            name="name"
            id="name"
            placeholder="Enter name here"
          />
        </FieldFormik>
        <FieldFormik label="Age*" name="age">
          <SelectFormik
            name="age"
            id="age"
            placeholder="Age"
            options={ages}
            styles={castingStyles}
          />
        </FieldFormik>
        <FieldFormik
          name="passport"
          label="Upload ID Passport"
          infoText={"Add a color ID passport (only png, jpg, pdf)"}
        >
          <InputAttachFormik name="passport" />
        </FieldFormik>
        <FieldFormik name="phone" label="Phone*">
          <InputFormik
            inputType="text"
            name="phone"
            id="phone"
            placeholder="Enter phone here"
          />
        </FieldFormik>
        <FieldFormik name="email" label="Email address*">
          <InputFormik
            inputType="email"
            name="email"
            id="email"
            placeholder="Enter email address"
          />
        </FieldFormik>
      </div>
      <div className={s.fieldsWrapper}>
        <div className={s.fieldsTitle}>
          <Title size="h6">Specifics*</Title>
        </div>
        <FieldFormik name="nationality" label="Nationality">
          <SelectFormik
            name="nationality"
            id="nationality"
            placeholder="Select from list"
            options={nationalitiesOptions}
            styles={castingStyles}
          />
        </FieldFormik>
        <FieldFormik name="orientation" label="Orientation">
          <SelectFormik
            name="orientation"
            placeholder="Select from list"
            options={orientations}
            styles={castingStyles}
          />
        </FieldFormik>
        <FieldFormik name="bodyType" label="Body type">
          <SelectFormik
            name="bodyType"
            placeholder="Select from list"
            options={bodyTypes}
            styles={castingStyles}
          />
        </FieldFormik>
        <FieldFormik name="bust" label="Bust">
          <SelectFormik
            name="bust"
            placeholder="Select from list"
            options={busts}
            styles={castingStyles}
          />
        </FieldFormik>
        <FieldFormik name="height" label="Height">
          <SelectFormik
            name="height"
            placeholder="Select from list"
            options={heights}
            styles={castingStyles}
          />
        </FieldFormik>
      </div>
    </>
  );
}
