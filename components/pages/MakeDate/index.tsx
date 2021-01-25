import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import noScroll from "no-scroll";
import { useDispatch, useSelector } from "react-redux";

import Check from "@svg/makeDate/check.svg";
import ArrowRight from "@svg/arrow-right.svg";
import ArrowLeft from "@svg/arrow-left.svg";

import Gallery from "@simple/Gallery";
import Button from "@simple/Button";
import Title from "@simple/Title";
import MakeDateModal from "@simple/MakeDateModal";
import MakeDateSuccessModal from "@simple/MakeDateSuccessModal";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import s from "./style.module.css";
import { TabletTitle } from "./TabletTitle";
import { Escort, EscortDateType } from "@store/escorts";
import { GalleryData } from "../ProfilePage";
import { checkSmsCode } from "./../../../functions/clicksend";
import { RootState } from "@store/reducer";
import {
  Step3Fields,
  StepData,
  EscortAmmount,
  setSelectedAddressError,
  setPostCode,
  setPostCodeError,
  setInputField,
  addEscortDataInit,
  addEscort1DateData,
} from "@store/escortDate";
import { sendmailApiCallBegan } from "@store/api";
import { fieldIsValid } from "@functions/helpers";
import Preloader from "@simple/Preloader";
import { sendSms } from "@store/smsCode";

const steps = [
  {
    id: 1,
    text: "Step 1: Choose your girl",
    mobileText: "Step 1",
  },
  {
    id: 2,
    text: "Step 2: Make a date",
    mobileText: "Step 2",
  },
  {
    id: 3,
    text: "Step 3: Enter your details",
    mobileText: "Step 3",
  },
];

interface Props {}

const MakeDate = ({}: Props) => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  //Selectors
  const useTestSmsNumber = useSelector<RootState>(
    (state) => state.settings.useTestSmsNumber
  ) as boolean;

  const requiredFieldsAreEmpty = useSelector<RootState>(
    (state) => state.escortDate.requiredFieldsAreEmpty
  ) as boolean;

  const {
    value: { phone, email, name },
    error,
  } = useSelector<RootState>((state) => state.escortDate.step3) as StepData<
    Step3Fields<string>,
    Step3Fields<boolean>
  >;

  const postCode = useSelector<RootState>((state) => state.escortDate.postCode);

  const address = useSelector<RootState>(
    (state) => state.escortDate.selectedAddress
  );

  const dateType = useSelector<RootState>(
    (state) => state.escortDate.dateType
  ) as EscortDateType;

  const escort1Data = useSelector<RootState>(
    (state) => state.escortDate.escort1.data
  ) as Escort;

  const escort1Name = useSelector<RootState>(
    (state) => state.escortDate.escort1.name
  ) as string;

  const datePrice = useSelector<RootState>(
    (state) => state.escortDate.datePrice
  ) as number;

  const smsHashCode = useSelector<RootState>(
    (state) => state.smsCode.code
  ) as string;

  // modals
  const [addVerificationModal, setAddVerificationModal] = useState(false);
  const [addSuccessModal, setAddSuccessModal] = useState(false);

  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const getGalleryImages = useCallback((imageUrl, additionalImageUrls) => {
    return [imageUrl, ...(additionalImageUrls || [])].map((url) => ({
      original: url || "",
      thumbnail: url || "",
    }));
  }, []);

  if (!escort1Data) return <Preloader full />;

  //local vars
  const { imageUrl, additionalImageUrls } = escort1Data;
  const images = getGalleryImages(imageUrl, additionalImageUrls);

  const currentStep = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

  const nextStep = () => {
    if (step > 2) return;
    if (step === 2 && dateType === "outcall") {
      if (!postCode) {
        dispatch(setPostCodeError(true));
      }
      if (!address) {
        dispatch(setSelectedAddressError(true));
        return;
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  // handle modals
  const handleAddVerificationModal = () => {
    if (
      fieldIsValid("name", name) &&
      fieldIsValid("email", email) &&
      fieldIsValid("phone", phone)
    ) {
      sendSmsVerification(phone, useTestSmsNumber);
      handleCloseAddVerificationModal();
    } else {
      if (!fieldIsValid("name", name))
        dispatch(
          setInputField({
            type: "error",
            name: "name",
            value: true,
          })
        );
      if (!fieldIsValid("email", email))
        dispatch(
          setInputField({
            type: "error",
            name: "email",
            value: true,
          })
        );
      if (!fieldIsValid("phone", phone))
        dispatch(
          setInputField({
            type: "error",
            name: "phone",
            value: true,
          })
        );
    }
  };

  const handleCloseAddVerificationModal = () => {
    setAddVerificationModal(!addVerificationModal);
    document.documentElement.classList.toggle("fixed");
  };

  const handleAddSuccessModal = (code: string) => {
    if (checkSmsCode(code, smsHashCode)) {
      handleCloseAddVerificationModal();
      handleCloseAddSuccessModal();
      dispatch(sendmailApiCallBegan());
    } else {
      alert("wrong code");
    }
  };

  const handleCloseAddSuccessModal = () => {
    setAddSuccessModal(!addSuccessModal);
    document.documentElement.classList.toggle("fixed");
  };

  const sendSmsVerification = (phone: string, useTestSmsNumber: boolean) => {
    let recipNumber: string;
    if (useTestSmsNumber) {
      recipNumber = "+447777777777";
    } else if (phone) {
      recipNumber = phone;
    } else {
      console.log("Phone nuber not set");
      return;
    }
    dispatch(sendSms(recipNumber));
  };

  return (
    <div className={s.makeDate}>
      <div className={s.container}>
        <ul className={`${s.steps} step__${step}`}>
          {steps.map(({ id, text, mobileText }) => (
            <li
              className={`${s.step} ${id < step ? s.checked : ""} ${
                id === step ? s.active : ""
              }`}
              key={id}
            >
              <button className={s.step__button}>
                <Check />
                {isMobile ? mobileText : text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${s.stepsBody} ${
          isMobile && step > 1 ? s.mobileStepsBody : ""
        }`}
      >
        <div className={`${s.container} ${s.stepsContainer}`}>
          {/* mobile previous step */}
          {isMobile && step > 1 ? (
            <div className={s.mobilePrevStep}>
              <Button theme="transparent" onClick={prevStep}>
                <ArrowLeft /> {"Previous Step"}
              </Button>
            </div>
          ) : null}
          {/* tablet title */}
          {isTablet ? <TabletTitle step={step} name={escort1Name} /> : null}
          {/* gallery hide on mobile step 2 */}
          {isMobile && step > 1 ? null : (
            <div className={`${s.galleryWrapper}`}>
              <Gallery images={images} />
            </div>
          )}
          {/* steps function */}
          {currentStep(step)}
          {/* desktop  notification */}
          {step !== 1 && !isMobile ? (
            <div className={s.stepsNotification}>
              <p>
                This form is received in real time! Make sure you have read and
                understood our{" "}
                <Link href="/terms">
                  <a className={s.termsLink}>Terms of service</a>
                </Link>
              </p>
            </div>
          ) : null}
          <div className={s.stepsControls}>
            <div className={s.prevStep}>
              {/* desktop prev step and notification */}
              {!isMobile ? (
                step === 1 ? (
                  <p>
                    This form is received in real time! Make sure you have read
                    and understood our{" "}
                    <Link href="/terms">
                      <a className={s.termsLink}>Terms of service</a>
                    </Link>
                  </p>
                ) : (
                  <Button theme="transparent" onClick={prevStep}>
                    <ArrowLeft /> {"Previous Step"}
                  </Button>
                )
              ) : null}
              {/* mobile notification */}
              {isMobile && (
                <p>
                  This form is received in real time! Make sure you have read
                  and understood our{" "}
                  <Link href="/terms">
                    <a className={s.termsLink}>Terms of service</a>
                  </Link>
                </p>
              )}
            </div>
            <div className={s.nextStep}>
              {step > 1 ? (
                <span className={s.totalAmount}>
                  <span className={s.totalAmount__property}>Total amount:</span>{" "}
                  <Title size="h5">£{datePrice}</Title>
                </span>
              ) : null}
              {step > 2 ? (
                <Button size="md" onClick={handleAddVerificationModal}>
                  {"Verify"}
                </Button>
              ) : (
                <Button size="md" onClick={nextStep}>
                  {"Next Step"} <ArrowRight />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modals */}
      {addVerificationModal && (
        <MakeDateModal
          handleClose={handleCloseAddVerificationModal}
          handleSuccess={handleAddSuccessModal}
          handleResend={sendSmsVerification.bind(null, phone, useTestSmsNumber)}
        />
      )}
      {addSuccessModal && (
        <MakeDateSuccessModal handleClose={handleCloseAddSuccessModal} />
      )}
    </div>
  );
};

export default MakeDate;
