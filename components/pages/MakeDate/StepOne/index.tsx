import React, { ReactElement, useEffect } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import Title from "@simple/Title";
import Field from "@simple/Field";
import GirlsInfo from "./GirlsInfo";
import { styles, DropdownIndicator } from "@functions/select-style";
import s from "./style.module.css";
import { Escort } from "@store/escorts";
import { EscortIndexed } from "@store/types";
import { SelectOption } from "@components/pages/Main/Hero/types";
import { EscortAmmount, setAmmount, cleanEscort1Data } from "@store/escortDate";
import ScrollToTop from "@simple/ScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/reducer";
import { addAllEscorts } from "@store/byName";
import { cleanDuoEscortDateData } from "@store/duoEscortDate";

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

  const escortsByName = useSelector<RootState>(
    (state) => state.entities.byName.list
  ) as EscortIndexed[];

  const escortData = useSelector<RootState>(
    (state) => state.escortDate.escort1.data
  ) as Escort;

  const title = useSelector<RootState>(
    (state) => state.escortDate.escort1.data?.title
  ) as EscortIndexed[];

  const ammount = useSelector<RootState>(
    (state) => state.escortDate.ammount
  ) as EscortAmmount;

  const datePrice = useSelector<RootState>(
    (state) => state.escortDate.datePrice
  ) as number;

  useEffect(() => {
    if (escortsByName.length === 0) {
      dispatch(addAllEscorts());
    }
  }, []);

  const router = useRouter();

  const selectNameOpts = prepareOptions(escortsByName);

  const handleChange = (option: SelectOption): void => {
    const { value: name } = option;
    dispatch(cleanEscort1Data(1));
    router.push(`/make-a-date/${name.toLowerCase()}`);
  };

  const handleAmmountChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value === "duo") router.push("/duo-make-a-date");
    dispatch(cleanDuoEscortDateData());
    dispatch(setAmmount(value as EscortAmmount));
  };

  const selectedNameOpt = { label: title, value: title };
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
                  checked={ammount === "solo"}
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
                  checked={ammount === "duo"}
                  onChange={handleAmmountChange}
                />
                <span className={s.radioMask}>Duo</span>
              </label>
            </div>
          </Field>
          <Field label="Choose girl by name">
            <div className={s.selectWrapper}>
              <Select
                options={selectNameOpts}
                styles={styles}
                placeholder="Choose girl"
                components={{ DropdownIndicator }}
                onChange={handleChange}
                name="girlName"
                isSearchable={false}
                value={selectedNameOpt}
                filterOption={(candidate: SelectOption, value: string) => {
                  const condition = new RegExp(`^${value}`, "i");
                  return condition.test(candidate.value);
                }}
              />
            </div>
          </Field>
        </div>
      </form>
      <GirlsInfo datePrice={datePrice} data={escortData} />
    </div>
  );
};

export default StepOne;
