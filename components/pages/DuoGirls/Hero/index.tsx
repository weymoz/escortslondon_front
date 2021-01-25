import React, { useState, ReactElement, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import {
  customStyle,
  physicalStyle,
  DropdownIndicator,
  MultiValueContainer,
  ControlIcon,
  Option,
  GroupHeading,
  PriceMenuList,
  PriceOption,
} from "@functions/select-style.js";

import Check from "@svg/check.svg";
import Parameters from "@svg/parameters.svg";
import CircleArrow from "@svg/circle-arrow.svg";

import Title from "@simple/Title";
import Button from "@simple/Button";

import s from "./style.module.css";
import {
  SelectOption,
  EscortsFilterOptions,
  EscortsFilterOptionsPayload,
  EscortsFilterRequestParams,
} from "./types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { DuoEscortsFilterRequestParams, MainPageSettings } from "@typedefs/app";
import { useRouter } from "next/router";
// const locationOptions = (districts as string[]).map(district => ({ value: district, label: district }));

const prepareOptions = (values: string[]): SelectOption[] => {
  if (!values || values.length === 0 || !Array.isArray(values)) return [];
  return values.map((value) => ({ label: value, value }));
};

const filterIsEmpty = (params: EscortsFilterRequestParams): boolean => {
  const isEmpty = true;
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    const param = params[keys[i] as keyof EscortsFilterRequestParams];
    if (Array.isArray(param)) {
      if (param && param.length > 0) {
        return false;
      }
    } else {
      if (param) return false;
    }
  }
  return isEmpty;
};

interface Props {
  filterEscorts: (params: DuoEscortsFilterRequestParams) => void;
  showUnfilteredEscorts: (payload: { limit: number; skip: number }) => void;
  cleanEscorts: () => void;
  allLocations: string[];
  allPrices: string[];
  setEscortsFilterOptions: (payload: EscortsFilterOptionsPayload) => void;
  filterOptions: EscortsFilterOptions;
  filterRequestParams: EscortsFilterRequestParams;
  toggleFiltersDisplay: () => void;
  showFilters: boolean;
  allServices: string[];
  pageHeader: string;
  searchTitle: string;
}

const Hero = ({
  allLocations,
  allPrices,
  filterEscorts,
  cleanEscorts,
  setEscortsFilterOptions,
  filterOptions,
  filterRequestParams,
  toggleFiltersDisplay,
  showFilters,
  allServices,
  pageHeader,
  searchTitle,
}: Props): ReactElement => {
  const onServicesPage = useRouter().pathname.includes("services");
  const history = useHistory();

  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const [rotation, setRotation] = useState(false);

  const locationOptions = allLocations ? prepareOptions(allLocations) : [];
  const priceOptions = allPrices ? prepareOptions(allPrices) : [];
  const serviceOptions = allServices ? prepareOptions(allServices) : [];

  const resetFilter = () => {
    cleanEscorts();
    // showUnfilteredEscorts({ limit: 24, skip: 0 });
    setRotation(true);
    setTimeout(() => setRotation(false), 600);
  };

  const handleClick = () => {
    if (!filterIsEmpty(filterRequestParams)) {
      filterEscorts(filterRequestParams);
    } else {
      resetFilter();
    }

    if (onServicesPage) {
      history.push("/");
    }
  };

  const handleChange = (name: string, options: SelectOption[]) => {
    setEscortsFilterOptions({ name, options });
  };

  const handleCheck = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setEscortsFilterOptions({ name });
  };

  const handleMoreParametersClick = () => toggleFiltersDisplay();

  return (
    <section className={s.hero}>
      <div className={s.container}>
        <div className={s.titleWrapper}>
          <Title size="h1">
            {pageHeader || "London's Premium Escort Agency"}
          </Title>
        </div>
        <div className={s.filtersWrapper}>
          <p className={s.filtersLabel}>
            {searchTitle ||
              `
            Search for the hottest duo escorts in London
              `}
          </p>
          <div className={s.filterSelect}>
            <Select
              closeMenuOnSelect={false}
              styles={customStyle}
              components={{
                DropdownIndicator,
                MultiValueContainer,
                Control: ControlIcon,
                Option,
              }}
              isMulti
              isSearchable={false}
              placeholder="Location"
              options={locationOptions}
              hideSelectedOptions={false}
              onChange={handleChange.bind(null, "location")}
              value={filterOptions.location}
            />
          </div>
          {!isMobile || showFilters ? (
            <div className={s.filterSelect}>
              <Select
                closeMenuOnSelect={false}
                styles={customStyle}
                components={{
                  DropdownIndicator,
                  MultiValueContainer,
                  Control: ControlIcon,
                  Option: PriceOption,
                }}
                isMulti
                isSearchable={false}
                placeholder="Price / Hour"
                options={priceOptions}
                hideSelectedOptions={false}
                onChange={handleChange.bind(null, "price")}
                value={filterOptions.price}
              />
            </div>
          ) : null}
          {!isTablet || showFilters ? (
            <>
              <div className={s.filterSelect}>
                <Select
                  styles={customStyle}
                  components={{
                    DropdownIndicator,
                    MultiValueContainer,
                    Control: ControlIcon,
                    Option,
                  }}
                  isMulti
                  isSearchable={false}
                  closeMenuOnSelect={false}
                  placeholder="Services"
                  options={serviceOptions}
                  hideSelectedOptions={false}
                  onChange={handleChange.bind(null, "services")}
                  value={filterOptions.services}
                />
              </div>
              {/*}
              <div className={s.filterSelect}>
                <Select
                  styles={physicalStyle}
                  components={{
                    DropdownIndicator,
                    MultiValueContainer,
                    Control: ControlIcon,
                    GroupHeading,
                  }}
                  isMulti
                  isSearchable={false}
                  closeMenuOnSelect={false}
                  placeholder="Physique"
                  options={groupedOptions}
                  hideSelectedOptions={false}
                  onChange={handleChange.bind(null, 'physique')}
                  value={filterOptions.physique}
                />
              </div>
              {*/}
            </>
          ) : null}
          <div className={s.filterBtn}>
            <Button onClick={handleClick} size="sm">
              Display results
            </Button>
          </div>

          <div className={s.checkboxWrapper}>
            {/*}
            <div className={s.filterCheckbox}>
              <label className={s.checkboxLabel} htmlFor="new">
                <input
                  checked={filterOptions.new_tag}
                  name="new"
                  onChange={handleCheck}
                  id="new"
                  type="checkbox"
                />
                <div className={s.checkboxMask}>
                  <span className={s.checkmark}>
                    <Check />
                  </span>
                </div>
                New
              </label>
            </div>
            <div className={s.filterCheckbox}>
              <label className={s.checkboxLabel} htmlFor="recommended">
                <input
                  checked={filterOptions.recommended_tag}
                  name="recommended"
                  onChange={handleCheck}
                  id="recommended"
                  type="checkbox"
                />
                <div className={s.checkboxMask}>
                  <span className={s.checkmark}>
                    <Check />
                  </span>
                </div>
                Recommended
              </label>
            </div>
          {*/}
            <button onClick={resetFilter} className={s.reset} type="reset">
              <CircleArrow
                className={`${s.resetIcon} ${rotation && s.rotate}`}
              />
              <span className={s.resetText}>Reset parameters</span>
            </button>
          </div>

          {isTablet && (
            <div className={s.moreParameters}>
              <button
                onClick={handleMoreParametersClick}
                type="button"
                className={s.moreParametersButton}
              >
                <Parameters />
                {showFilters ? "Less" : "More"} parameters
              </button>
            </div>
          )}
        </div>
        {/* <div className={s.checkboxWrapper}>
          <div className={s.filterCheckbox}>
            <label className={s.checkboxLabel} htmlFor="new">
              <input checked={filterOptions.new_tag} name="new" onChange={handleCheck} id="new" type="checkbox" />
              <div className={s.checkboxMask}>
                <span className={s.checkmark}>
                  <Check />
                </span>
              </div>
              New
            </label>
          </div>
          <div className={s.filterCheckbox}>
            <label className={s.checkboxLabel} htmlFor="recommended">
              <input
                checked={filterOptions.recommended_tag}
                name="recommended"
                onChange={handleCheck}
                id="recommended"
                type="checkbox"
              />
              <div className={s.checkboxMask}>
                <span className={s.checkmark}>
                  <Check />
                </span>
              </div>
              Recommended
            </label>
          </div>
          <button onClick={resetFilter} className={s.reset} type="reset">
            <CircleArrow className={s.resetIcon} />
            <span className={s.resetText}>Reset parameters</span>
          </button>
        </div> */}
      </div>
    </section>
  );
};
export default Hero;
