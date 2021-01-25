import React, { ReactElement } from "react";
import Rates from "@simple/Rates";
import s from "../style.module.css";
import LocationFieldFormik from "@simple/LocationFieldFormik";
import ErrorMessageFormik from "@simple/ErrorMessageFormik";

interface Props {}

export default function RateFields({}: Props): ReactElement {
  return (
    <>
      <div>
        <Rates ratesForm />
        <ErrorMessageFormik name="rates" cssDisplay="block" />
      </div>
      <div>
        <LocationFieldFormik name="location" />
        <ErrorMessageFormik name="location" cssDisplay="block" />
      </div>
      <p>
        This form is received in real time!
        <br />
        Please make sure you have read and understood our Terms of service
      </p>
    </>
  );
}
