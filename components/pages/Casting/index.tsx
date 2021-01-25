import React, { useState } from "react";
import Title from "@simple/Title";
import Button from "@simple/Button";
import s from "./style.module.css";
import { Formik, Form, Field } from "formik";
import MainFields from "./MainFields";
import ServicesFields from "./ServicesFields";
import AddPhotosFields from "./AddPhotosFields";
import RateFields from "./RateFields";
import { ReactSelectOption, Location } from "@typedefs/app";
import PreviewModal from "./PreviewModal";
import * as Yup from "yup";
import SmsModalFormik from "@simple/SmsModalFormik";
import UploadModalFormik from "@simple/UploadModalFormik";
import UploadEndModal from "@simple/UploadEndModal";
import FieldFormik from "@simple/FieldFormik";
import useSearchParams from "@functions/hooks/useSearchParams";

export interface CastingFormState {
  accept: boolean;
  approved: string;
  galleryPhoto: File | null;
  name: string;
  age: ReactSelectOption<number> | null;
  passport: File | null;
  phone: string;
  email: string;
  nationality: ReactSelectOption<string> | null;
  orientation: ReactSelectOption<string> | null;
  bodyType: ReactSelectOption<string> | null;
  bust: ReactSelectOption<string> | null;
  height: ReactSelectOption<string> | null;
  services: string[];
  notice: string;
  about: string;
  location: Location;
  portraitPhotos: {
    photo1: File;
    photo2: File;
    photo3: File;
    photo4: File;
    photo5: File;
    photo6: File;
  };
  verificationPhoto: File;
  landscapePhotos: {
    photo1: File;
    photo2: File;
  };
  rates: CasitngRates;
}

export interface CasitngRates {
  incall: CastingRatesTime;
  outcall: CastingRatesTime;
}

export interface CastingRatesTime {
  "One hour": string;
  "90 minutes": string;
  "Two hours": string;
  "Additional hour": string;
  Overnight: string;
}

export type CastingRatesDuration = keyof CastingRatesTime;

export const initialValues: CastingFormState = {
  accept: false,
  approved: "No",
  galleryPhoto: null,
  name: "",
  age: null,
  passport: null,
  phone: "",
  email: "",
  nationality: null,
  orientation: null,
  bodyType: null,
  bust: null,
  height: null,
  services: [],
  notice: "",
  about: "",
  location: {
    lat: 51.5074,
    lng: 0.1278,
    name: "London",
    address: "London",
  },
  portraitPhotos: {
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    photo6: null,
  },
  verificationPhoto: null,
  landscapePhotos: {
    photo1: null,
    photo2: null,
  },
  rates: {
    incall: {
      "One hour": "",
      "90 minutes": "",
      "Two hours": "",
      "Additional hour": "",
      Overnight: "",
    },
    outcall: {
      "One hour": "",
      "90 minutes": "",
      "Two hours": "",
      "Additional hour": "",
      Overnight: "",
    },
  },
};

const isAtLeastOneItem = (value: { [key: string]: any }): boolean =>
  Object.keys(value).reduce((acc, key) => acc || !!value[key], false);

const areAllItems = (value: { [key: string]: any }): boolean =>
  Object.keys(value).reduce((acc, key) => acc && !!value[key], true);

const validationSchema = Yup.object({
  accept: Yup.boolean().oneOf([true], "Must Accept Terms of Service"),
  name: Yup.string().min(2).required(),
  age: Yup.mixed().required(),
  passport: Yup.mixed().required(),
  portraitPhotos: Yup.object().test(
    "portrait",
    "You should add at least one portrait photo",
    isAtLeastOneItem
  ),
  landscapePhotos: Yup.object().test(
    "landscape",
    "add at least one landscape photo",
    isAtLeastOneItem
  ),
  galleryPhoto: Yup.mixed().required("Add gallery photo"),
  verificationPhoto: Yup.mixed().required("Verification photo is required"),
  phone: Yup.mixed().required(),
  email: Yup.string().email().required(),
  nationality: Yup.mixed().required(),
  orientation: Yup.mixed().required(),
  bodyType: Yup.mixed().required(),
  bust: Yup.mixed().required(),
  height: Yup.mixed().required(),
  services: Yup.array().required("select at least 1 service"),
  notice: Yup.string().required(),
  about: Yup.string().required(),
  rates: Yup.object().test(
    "rates",
    "You must set all prices",
    (value: typeof initialValues.rates) => {
      const { incall, outcall } = value;
      return areAllItems(incall) && areAllItems(outcall);
    }
  ),
  location: Yup.object().test(
    "location",
    "You must set your location",
    (value: typeof initialValues.location) => {
      if (value.address === initialValues.location.address) return false;
      return true;
    }
  ),
});

const uploadEndModalInitialState = {
  error: false,
  title: "",
  description: "",
  buttonText: "",
};

export interface CasttingRatesTime {}

const Casting = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploaEndModal, setShowUploadEndModal] = useState(false);
  const [uploadEndData, setEndUploadEndData] = useState(
    uploadEndModalInitialState
  );

  const handleShowPreview = () => {
    setShowSmsModal(false);
    setShowUploadModal(false);
    setShowUploadEndModal(false);
    setShowPreview(true);
  };

  const handleSubmit = () => {
    setShowUploadModal(false);
    setShowUploadEndModal(false);
    setEndUploadEndData(uploadEndModalInitialState);
    setShowSmsModal(true);
  };

  const handleSmsModalSuccess = () => {
    setShowSmsModal(false);
    setShowUploadModal(true);
  };

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
    setEndUploadEndData({
      error: false,
      title: "Thank You!",
      description: "Soon we will contact You",
      buttonText: "OK",
    });
    setShowUploadEndModal(true);
  };

  return (
    <div className={s.casting}>
      <div className={s.castingTitle}>
        <div className={s.container}>
          <div className={s.titleWrapper}>
            <Title size="h4">Casting</Title>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={s.previewBtn}
          >
            Profile preview
          </button>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.castingForm}>
          <div className={s.container}>
            <section className={s.mainFields}>
              <MainFields />
            </section>
            <section className={s.servicesFiels}>
              <ServicesFields />
            </section>
            <section className={s.addPhotosFiels}>
              <AddPhotosFields />
            </section>
            <section className={s.rateFiels}>
              <RateFields />
            </section>
            <div className={s.submitWrapper}>
              <div className={s.terms}>
                <FieldFormik name="accept">
                  <label className={s.checkbox} htmlFor="accept">
                    <Field className={s.accept} type="checkbox" name="accept" />
                    Accept our{" "}
                    <a target="_blank" href="/terms">
                      Terms of Service{" "}
                    </a>
                  </label>
                </FieldFormik>
              </div>
              <div className={s.termsButtons}>
                <button
                  type="button"
                  className={s.previewBtn}
                  onClick={handleShowPreview}
                >
                  Profile preview
                </button>
                <Button type="submit">Submit application</Button>
              </div>
            </div>
          </div>
          {showPreview && (
            <PreviewModal closeModal={() => setShowPreview(false)} />
          )}
          {showSmsModal && (
            <SmsModalFormik
              onSuccess={handleSmsModalSuccess}
              closeModal={() => setShowSmsModal(false)}
            />
          )}
          {showUploadModal && (
            <UploadModalFormik
              onSuccess={handleUploadSuccess}
              closeModal={() => setShowUploadModal(false)}
            />
          )}
          {showUploaEndModal && (
            <UploadEndModal
              title={uploadEndData.title}
              description={uploadEndData.description}
              buttonText={uploadEndData.buttonText}
              error={uploadEndData.error}
              closeModal={() => {
                setShowUploadEndModal(false);
                location.reload();
              }}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Casting;
