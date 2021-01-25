import React, { useState } from "react";
import { customSelectStyle } from "@functions/select-style.js";
import Title from "@simple/Title";
import Button from "@simple/Button";
import s from "./style.module.css";
import { Formik, Form } from "formik";
import RatingFormik from "@simple/RatingFormik";
import SelectFormik from "@simple/SelectFormik";
import { ReactSelectOption } from "@typedefs/app";
import * as Yup from "yup";
import ErrorMessageFormik from "@simple/ErrorMessageFormik";
import TextareaFormik from "@simple/TextareaFormik";
import PhoneInputFormik from "@simple/PhoneInputFormik";
import { useDispatch, useSelector } from "react-redux";
import SmsModalFormik from "@simple/SmsModalFormik";
import SubmitReviewModal from "@simple/SubmitReviewModal";
import UploadEndModal from "@simple/UploadEndModal";
import useSearchParams from "@functions/hooks/useSearchParams";
import { cleanReviews } from "@store/reviews";
import { selectProfileData } from "@store/profile";
import { RootState } from "@store/reducer";
import { Escort } from "@store/escorts";
import { useRouter } from "next/router";

const toReactSelectOption = (item: string) => ({ value: item, label: item });
const VISIT_TYPES: ReactSelectOption[] = ["incall", "outcall"].map(
  toReactSelectOption
);

const getTime = (i: number) => (i < 10 ? `0${i}:00` : `${i}:00`);
const TIMES: ReactSelectOption[] = new Array(24).fill(0).map((_, i) => {
  const time = getTime(i);
  return toReactSelectOption(time);
});
const DUIRATIONS: ReactSelectOption[] = [
  "1 hour",
  "90 minutes",
  "2 hours",
  "3 hours",
  "overnight",
].map(toReactSelectOption);

export interface SubmitReviewState {
  rating: number;
  visitType: ReactSelectOption | null;
  time: ReactSelectOption | null;
  duration: ReactSelectOption | null;
  comment: string;
  phone: string;
}

const sampleState = {
  rating: 4,
  visitType: { value: "incall", label: "incall" },
  time: { value: "12:30", label: "12:30" },
  duration: { value: "2 hours", label: "2 hours" },
  comment: "Very nice girl!",
  phone: "80988343620",
};
const initialState = {
  rating: 0,
  visitType: null,
  time: null,
  duration: null,
  comment: "",
  phone: "",
};

const validationSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Required").required(),
  visitType: Yup.mixed().required("Required"),
  time: Yup.mixed().required("Required"),
  duration: Yup.mixed().required("Required"),
  comment: Yup.string().required("Required"),
  phone: Yup.string(), //.required("Required"),
});

interface Props {
  onClose(): void;
}

const ReviewAddModal = ({ onClose }: Props) => {
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showSubmitReviewModal, setShowSubmitReviewModal] = useState(false);
  const [showUploadEndModal, setShowUploadEndModal] = useState(false);
  const [uploadEndData, setUploadEndData] = useState({
    error: false,
    title: "",
    description: "",
    buttonText: "",
  });
  const dispatch = useDispatch();
  const { title } = useSelector<RootState, Escort>(selectProfileData);
  const [ratingAssigned, setRatingAssigned] = useState(false);

  const onSubmit = () => {
    //dispatch(cleanReviews());
    setShowSmsModal(true);
  };

  const handleSmsModalSuccess = () => {
    setShowSubmitReviewModal(true);
  };

  const handleUploadSuccess = () => {
    setUploadEndData({
      error: false,
      title: "Thank You!",
      description: "You comment was successfully submitted.",
      buttonText: "Ok",
    });
    setShowSubmitReviewModal(false);
    setShowUploadEndModal(true);
  };

  const handleUploadError = () => {
    setUploadEndData({
      error: true,
      title: "Error occured.",
      description: "Try to submit your comment one more time",
      buttonText: "Ok",
    });
    setShowSubmitReviewModal(false);
    setShowUploadEndModal(true);
  };

  return (
    <div className={s.root}>
      <div className={s.top}>
        <Title size="h4">{title ? `Feedback to ${title}` : ""}</Title>
      </div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={s.wrapper}>
            <div className={s.formControl}>
              <label>Rate</label>
              <RatingFormik name="rating" />
              <ErrorMessageFormik name="rating" />
            </div>
            <div className={`${s.formControl} ${s.formControlInline}`}>
              <div className={s.formInlineItem}>
                <label>Visit type</label>
                <div className={s.selectWrapper}>
                  <SelectFormik
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    styles={customSelectStyle}
                    placeholder="Visit type"
                    options={VISIT_TYPES}
                    hideSelectedOptions={false}
                    name="visitType"
                  />
                </div>
                <ErrorMessageFormik name="visitType" />
              </div>
              <div className={s.formInlineItem}>
                <label>Time</label>
                <div className={s.selectWrapper}>
                  <SelectFormik
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    styles={customSelectStyle}
                    placeholder="Time"
                    options={TIMES}
                    hideSelectedOptions={false}
                    name="time"
                  />
                </div>
                <ErrorMessageFormik name="time" />
              </div>
              <div className={s.formInlineItem}>
                <label>Duration</label>
                <div className={s.selectWrapper}>
                  <SelectFormik
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    styles={customSelectStyle}
                    placeholder="Duration"
                    options={DUIRATIONS}
                    hideSelectedOptions={false}
                    name="duration"
                  />
                </div>
                <ErrorMessageFormik name="duration" />
              </div>
            </div>
            <div className={s.formControl}>
              <TextareaFormik
                placeholder="Enter your comment"
                name="comment"
                id="comment"
                label="Comment"
              />
            </div>
            <ErrorMessageFormik
              className={s.errorMessageComment}
              name="comment"
            />
            <div className={`${s.formControl} ${s.formControlInlinePhone}`}>
              <div className={s.formInlineItem}>
                <PhoneInputFormik label="Phone number" name="phone" />
                <ErrorMessageFormik name="phone" />
              </div>
              <div className={s.formInlineItem}>
                <div className={s.infoText}>
                  All information which you provide is confidential!
                </div>
              </div>
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.bottomText}>
              After pressing “Submit” an SMS with verification code will be sent
              to the mobile number you have provided.
            </div>
            <div className={s.buttonControl}>
              <Button type="submit" size="md">
                Submit
              </Button>
            </div>
          </div>
          {showSmsModal && (
            <SmsModalFormik
              onSuccess={handleSmsModalSuccess}
              closeModal={() => setShowSmsModal(false)}
            />
          )}
          {showSubmitReviewModal && (
            <SubmitReviewModal
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
              closeModal={() => setShowSubmitReviewModal(false)}
            />
          )}
          {showUploadEndModal && (
            <UploadEndModal
              title={uploadEndData.title}
              description={uploadEndData.description}
              buttonText={uploadEndData.buttonText}
              error={uploadEndData.error}
              closeModal={() => {
                onClose && onClose();
                setShowUploadEndModal(false);
              }}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default ReviewAddModal;
