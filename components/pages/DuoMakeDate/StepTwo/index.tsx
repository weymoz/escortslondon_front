import React, { ReactElement, useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import moment, { Moment } from "moment";
import { useMediaQuery } from "react-responsive";
import Title from "@simple/Title";
import Field from "@simple/Field";
import Arrow from "@svg/arrow-down.svg";
import {
  styles,
  DropdownIndicator,
  Input as CustomInput,
  AddressesMenu,
} from "@functions/select-style";
import { ReactSelectOption } from "@typedefs/app";
import s from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import ScrollToTop from "@simple/ScrollToTop";
import {
  setDate,
  setTime,
  selectDuoEscortDateDate,
  selectDuoEscortDateTitle,
  selectDuoEscortDateTime,
  selectDuoEscortDateDuration,
  setDuration,
  selectDuoEscortDatePrice,
} from "@store/duoEscortDate";

const durationOptions: ReactSelectOption<string>[] = [
  { label: "One hour", value: "1_One hour" },
  { label: "90 minutes", value: "2_90 minutes" },
  { label: "Two hours", value: "3_Two hours" },
  { label: "Overnight", value: "6_Overnight" },
];

type DatePicker = {
  value: string;
  onClick: any;
};

const CustomDatePicker = ({ value, onClick }: DatePicker): ReactElement => {
  return (
    <div className={s.datePicker} onClick={onClick}>
      {value} <Arrow />
    </div>
  );
};

type Props = {};

const StepTwo = ({}: Props): ReactElement => {
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const dispatch = useDispatch();

  const title = useSelector<RootState, string>(selectDuoEscortDateTitle);
  const date = useSelector<RootState, Date>(selectDuoEscortDateDate);
  const time = useSelector<RootState, Moment>(selectDuoEscortDateTime);
  const duration = useSelector<RootState, ReactSelectOption<string>>(
    selectDuoEscortDateDuration
  );

  const handleDateChange = (date: Date): void => {
    dispatch(setDate(moment(date).format()));
  };

  const handleTimeChange = (time: Moment): void => {
    dispatch(setTime(time.format()));
  };

  const handleDurationChange = (option: ReactSelectOption<string>) => {
    dispatch(setDuration(option));
  };

  return (
    <div className={s.stepOne}>
      <ScrollToTop />
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        {!isTablet ? (
          <div className={s.form__title}>
            <Title size="h4">Make a date with {title}</Title>
          </div>
        ) : null}
        <div className={s.form__grid}>
          <Field label="Date" className={s.datePickerField}>
            <DatePicker
              name="date"
              selected={date}
              onChange={handleDateChange}
              customInput={<CustomDatePicker />}
              minDate={new Date()}
            />
          </Field>
          <div className={s.selectWrapper}>
            <Field label="Time">
              <TimePicker
                name="time"
                showSecond={false}
                minuteStep={10}
                inputIcon={<Arrow />}
                defaultValue={time}
                onChange={handleTimeChange}
                className={s.datingTime}
                popupClassName={s.datingTimePopup}
              />
            </Field>
            <Field label="Duration">
              <Select
                options={durationOptions}
                styles={styles}
                components={{ DropdownIndicator }}
                value={duration}
                name="duration"
                isSearchable={false}
                onChange={handleDurationChange}
              />
            </Field>
          </div>

          <Field label="Date type">
            <div className={s.radioButtons}>
              <label className={s.radioButton} htmlFor={"incall"}>
                <input
                  type="radio"
                  id="incall"
                  name="date_type"
                  value="incall"
                  checked={true}
                />
                <span className={s.radioMask}>Incall</span>
              </label>
            </div>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
