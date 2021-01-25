import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Check from "@svg/makeDate/check.svg";
import ArrowRight from "@svg/arrow-right.svg";
import ArrowLeft from "@svg/arrow-left.svg";
import Button from "@simple/Button";
import Title from "@simple/Title";
import MakeDateModal from "@simple/MakeDateModal";
import MakeDateSuccessModal from "@simple/MakeDateSuccessModal";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import s from "./style.module.css";
import { TabletTitle } from "./TabletTitle";
import { GalleryData } from "../ProfilePage";
import { checkSmsCode } from "./../../../functions/clicksend";
import { RootState } from "@store/reducer";
import { duoSendmailApiCallBegan } from "@store/api";
import Preloader from "@simple/Preloader";
import {
  selectDuoEscortGallery,
  selectDuoEscortDateData,
  cleanDuoEscortDateData,
  selectDuoEscortDatePrice,
  selectDuoEscortDatePhone,
  selectDuoEscortDateShowModal,
  setShowModal,
} from "@store/duoEscortDate";
import { selectSmsCode, sendSms } from "@store/smsCode";
import { selectUseTestSmsNumber } from "@store/settings";
import GalleryDuo from "@simple/GalleryDuo";
import { EscortsDuo } from "@typedefs/app";

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

const DuoMakeDate = ({}: Props) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  //Selectors
  const useTestSmsNumber = useSelector<RootState, boolean>(
    selectUseTestSmsNumber
  );

  const smsHashCode = useSelector<RootState, string>(selectSmsCode);
  const phone = useSelector<RootState, string>(selectDuoEscortDatePhone);

  // modals
  const [addSuccessModal, setAddSuccessModal] = useState(false);

  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  //----- duo escorts date ----

  const duoEscortData = useSelector<RootState>(
    selectDuoEscortDateData
  ) as EscortsDuo;

  let images: GalleryData[] = [];
  if (duoEscortData) {
    images = selectDuoEscortGallery(duoEscortData);
  }

  const selectedDuoSlug = useSelector<RootState>(
    (state) => state.duoEscortDate.selectedDuoSlug
  );

  const price = useSelector<RootState, number>(selectDuoEscortDatePrice);

  const showModal = useSelector<RootState, boolean>(
    selectDuoEscortDateShowModal
  );

  useEffect(() => {
    /*
    if (!selectedDuoSlug) {
      dispatch(addInitialDuoEscortData());
    }
     */

    return () => {
      dispatch(cleanDuoEscortDateData());
    };
  }, []);

  const handleVerify = () => {
    dispatch(sendSms(phone));
    dispatch(setShowModal(true));
  };

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
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  // handle modals
  const handleCloseAddVerificationModal = () => {
    dispatch(setShowModal(false));
  };

  const handleAddSuccessModal = (code: string) => {
    if (checkSmsCode(code, smsHashCode)) {
      handleCloseAddVerificationModal();
      handleCloseAddSuccessModal();
      dispatch(duoSendmailApiCallBegan());
    } else {
      alert("wrong code");
    }
  };

  const handleCloseAddSuccessModal = () => {
    setAddSuccessModal(!addSuccessModal);
    document.documentElement.classList.toggle("fixed");
  };

  const sendSmsVerification = (phone: string) => {
    dispatch(sendSms(phone));
  };

  if (!duoEscortData) return <Preloader full />;

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
          {isTablet ? (
            <TabletTitle step={step} name={duoEscortData.title} />
          ) : null}
          {/* gallery hide on mobile step 2 */}
          {isMobile && step > 1 ? null : (
            <div className={`${s.galleryWrapper}`}>
              <GalleryDuo images={images} />
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
                <Link className={s.termsLink} href="/terms">
                  Terms of service
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
                    <Link className={s.termsLink} href="/terms">
                      Terms of service
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
                  <Link className={s.termsLink} href="/terms">
                    Terms of service
                  </Link>
                </p>
              )}
            </div>
            <div className={s.nextStep}>
              {step > 1 ? (
                <span className={s.totalAmount}>
                  <span className={s.totalAmount__property}>Total amount:</span>{" "}
                  <Title size="h5">£{price}</Title>
                </span>
              ) : null}
              {step > 2 ? (
                <Button size="md" onClick={handleVerify}>
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
      {showModal && (
        <MakeDateModal
          handleClose={handleCloseAddVerificationModal}
          handleSuccess={handleAddSuccessModal}
          handleResend={sendSmsVerification.bind(null, phone)}
        />
      )}
      {addSuccessModal && (
        <MakeDateSuccessModal handleClose={handleCloseAddSuccessModal} />
      )}
    </div>
  );
};

export default DuoMakeDate;
