import React, { ReactElement, useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import moment, { Moment } from "moment";
import { useMediaQuery } from "react-responsive";
import Title from "@simple/Title";
import Button from "@simple/Button";
import Field from "@simple/Field";
import Input from "@simple/Input";
import Arrow from "@svg/arrow-down.svg";
import InfoIcon from "@svg/info-icon.svg";
import {
  styles,
  DropdownIndicator,
  Input as CustomInput,
} from "@functions/select-style";
import s from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import {
  setDate,
  setPostCode,
  addAddressesByPostcode,
  setSelectedAddress,
  setDateType,
  setTime,
  setDuration,
  DurationSelectOption,
} from "@store/escortDate";
import { SelectOption } from "@components/pages/Main/Hero/types";
import { isOutcallAvailable } from "@functions/helpers";
import { RatesData } from "@functions/rest-client/types";
import { Popout } from "@simple/Popout";
import ScrollToTop from "@simple/ScrollToTop";

const durationOptions: DurationSelectOptions[] = [
  { label: "One hour", value: "1_One hour" },
  { label: "90 minutes", value: "2_90 minutes" },
  { label: "Two hours", value: "3_Two hours" },
  // { label: 'Three hours', value: '4_Three hours' },
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

type Props = {
  postcode: string;
  type: string;
  handleInputChange: () => void;
  handleSelectChange: () => void;
  error: boolean;
};

const StepTwo = ({
  postcode,
  type = "incall",
  handleInputChange,
  handleSelectChange,
  error,
}: Props): ReactElement => {
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(moment());
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });

  const dispatch = useDispatch();

  const title1 = useSelector<RootState>(
    (state) => state.escortDate.escort1.data?.title
  ) as string;
  const date = useSelector<RootState>(
    (state) => state.escortDate.date
  ) as string;
  const time = useSelector<RootState>(
    (state) => state.escortDate.time
  ) as string;
  const duration = useSelector<RootState>(
    (state) => state.escortDate.duration
  ) as string;
  const postCode = useSelector<RootState>(
    (state) => state.escortDate.postCode
  ) as string;

  const postCodeError = useSelector<RootState>(
    (state) => state.escortDate.postCodeError
  ) as string;

  const addresses = useSelector<RootState>(
    (state) => state.escortDate.addresses
  ) as string[];

  const selectedAddress = useSelector<RootState>(
    (state) => state.escortDate.selectedAddress
  ) as string;

  const selectedAddressError = useSelector<RootState>(
    (state) => state.escortDate.selectedAddressError
  ) as boolean;

  const dateType = useSelector<RootState>(
    (state) => state.escortDate.dateType
  ) as string;

  const rates1 = useSelector<RootState>(
    (state) => state.escortDate.escort1.data?.rates
  ) as RatesData;

  const addressesOptions = addresses.map((address) => ({
    value: address,
    label: address,
  }));

  const handleDateChange = (date: Date) => {
    dispatch(setDate(date.toDateString()));
  };

  const handleTimeChange = (time: Moment) => {
    dispatch(setTime(time.toDate().toUTCString()));
  };

  const handleDurationChange = (option: DurationSelectOption) => {
    dispatch(setDuration(option));
  };

  const handlePostcodeInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;
    dispatch(setPostCode(value));
  };

  const handleFindAddressButtonClick = () => {
    dispatch(addAddressesByPostcode(postCode));
  };

  const handleSelectAddress = (option: SelectOption) => {
    dispatch(setSelectedAddress(option.value));
  };

  const handleDateTypeChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    const { value } = e.currentTarget;
    dispatch(setDateType(value));
  };

  const handleDatePickerBlur = () => {
    if (date) {
      setDateError(false);
    } else {
      setDateError(true);
    }
  };

  return (
    <div className={s.stepOne}>
      <ScrollToTop />
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        {!isTablet ? (
          <div className={s.form__title}>
            <Title size="h4">Make a date with {title1}</Title>
          </div>
        ) : null}
        <div className={s.form__grid}>
          <Field
            className={s.datePickerField}
            label="Date"
            error={dateError ? "Select a date" : null}
          >
            <DatePicker
              name="date"
              selected={new Date(date)}
              onChange={handleDateChange}
              customInput={<CustomDatePicker />}
              minDate={new Date()}
              onBlur={handleDatePickerBlur}
              onFocus={() => setDateError(false)}
            />
          </Field>
          <div className={s.selectWrapper}>
            <Field label="Time">
              <TimePicker
                name="time"
                showSecond={false}
                minuteStep={10}
                inputIcon={<Arrow />}
                defaultValue={moment(time)}
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
                  checked={dateType === "incall"}
                  onChange={handleDateTypeChange}
                />
                <span className={s.radioMask}>Incall</span>
              </label>
              <label className={s.radioButton} htmlFor={"outcall"}>
                <input
                  type="radio"
                  id="outcall"
                  name="date_type"
                  value="outcall"
                  checked={dateType === "outcall"}
                  onChange={handleDateTypeChange}
                  disabled={!isOutcallAvailable(rates1)}
                />
                <span className={s.radioMask}>{`Outcall ${
                  !isOutcallAvailable(rates1) ? "(NA)" : ""
                }`}</span>
              </label>
            </div>
          </Field>
          {dateType === "outcall" ? (
            <>
              <Field
                label="Postcode"
                error={postCodeError ? "Enter postcode" : null}
              >
                <div className={s.inputWrapper}>
                  <Input
                    type="text"
                    name="postcode"
                    id="postcode"
                    placeholder="Enter postcode"
                    onChange={handlePostcodeInputChange}
                    value={postCode}
                  />
                  <Button
                    onClick={handleFindAddressButtonClick}
                    theme="outline"
                  >
                    Find
                  </Button>
                </div>
              </Field>
              <Field
                className={s.addressField}
                label="Address"
                error={(selectedAddressError && "Select address") || null}
              >
                <Popout
                  name="address"
                  value={selectedAddress}
                  onChange={handleSelectAddress}
                  options={addressesOptions}
                />
                <div className={s.addressFieldInfo}>
                  {/*

                    <InfoIcon className={s.addressFieldInfoIcon} />
                    */}
                  Taxi fee is not included and will be calculated by
                  administrator
                </div>
              </Field>
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
