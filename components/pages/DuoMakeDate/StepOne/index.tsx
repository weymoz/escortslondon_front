import React, { ReactElement, useEffect } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";

import Title from "@simple/Title";
import Field from "@simple/Field";

import GirlsInfo from "./GirlsInfo";

import { styles, DropdownIndicator } from "@functions/select-style";

import s from "./style.module.css";
import { Escort } from "@store/escorts";
import { EscortIndexed } from "@store/types";
import { SelectOption } from "@components/pages/Main/Hero/types";
import {
  EscortAmmount,
  cleanEscort1Data,
  addEscort1DateData,
  setAmmount,
  setEscort1Name,
} from "@store/escortDate";
import {
  addAllDuoEscorts,
  addDuoEscortData,
  cleanDuoEscortDateData,
} from "@store/duoEscortDate";
import ScrollToTop from "@simple/ScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import { addAllEscorts } from "@store/byName";
import { useHistory } from "react-router-dom";
import { ReactSelectOption, EscortsDuo } from "@typedefs/app";
import { useRouter } from "next/router";

const girls = [
  { label: "Nancy", value: "Nancy" },
  { label: "Vitora", value: "Vitora" },
  { label: "Sahara", value: "Sahara" },
  { label: "Aria", value: "Aria" },
];

const prepareOptions = (data: EscortIndexed[]): SelectOption[] => {
  return data.map((escort) => {
    return {
      label: escort.title || "",
      value: escort.title || "",
    };
  });
};

interface Props {}

const StepOne = ({}: Props): ReactElement => {
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });

  const dispatch = useDispatch();

  const escortsDuoByName = useSelector<RootState>(
    (state) => state.duoEscortDate.escortsDuoByName
  ) as ReactSelectOption<string>;

  const { title, slug, escort_1, escort_2, rates, location } = useSelector<
    RootState
  >((state) => state.duoEscortDate.data) as EscortsDuo;

  useEffect(() => {
    dispatch(addAllDuoEscorts());
  }, []);

  const router = useRouter();

  const handleChange = (option: SelectOption): void => {
    const { value } = option;
    dispatch(cleanDuoEscortDateData());
    dispatch(addDuoEscortData(value));
  };

  const handleAmmountChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(setAmmount(value as EscortAmmount));
    router.push("/make-a-date");
  };

  return (
    <div className={s.stepOne}>
      <ScrollToTop />
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        {!isTablet ? (
          <div className={s.form__title}>
            <Title size="h4">Choose your girl</Title>
          </div>
        ) : null}
        <div className={s.form__grid}>
          <Field label="How many girls do you want?">
            <div className={s.radioButtons}>
              <label className={s.radioButton} htmlFor={"solo"}>
                <input
                  type="radio"
                  id="solo"
                  name="amount"
                  value="solo"
                  onChange={handleAmmountChange}
                />
                <span className={s.radioMask}>Solo</span>
              </label>
              <label className={s.radioButton} htmlFor={"duo"}>
                <input
                  type="radio"
                  id="duo"
                  name="amount"
                  value="duo"
                  checked
                />
                <span className={s.radioMask}>Duo</span>
              </label>
            </div>
          </Field>
          <Field label="Choose girl by name">
            <div className={s.selectWrapper}>
              <Select
                options={escortsDuoByName}
                styles={styles}
                placeholder="Choose girl"
                components={{ DropdownIndicator }}
                onChange={handleChange}
                name="girlName"
                isSearchable={false}
                value={{
                  value: slug,
                  label: title,
                }}
              />
            </div>
          </Field>
        </div>
      </form>
      <div className={s.girlsInfoContainer}>
        <GirlsInfo
          title={escort_1?.title || ""}
          age={escort_1?.age.toString() || ""}
        />

        <GirlsInfo
          title={escort_2?.title || ""}
          age={escort_2?.age.toString() || ""}
        />
      </div>
      <p className={s.location}>
        <span className={s.locationName}>Location:</span>
        {location?.name || ""}
      </p>
      <p className={s.minimalPrice}>
        <span className={s.minimalPriceName}>Minimal price:</span>£
        {rates?.gbp["1_One hour"].incall || ""}
      </p>
    </div>
  );
};

export default StepOne;
