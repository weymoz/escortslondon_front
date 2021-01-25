import React, { ReactElement, useEffect } from "react";
import Hero from "@pages/DuoGirls/Hero";
import { connect, useDispatch, useSelector } from "react-redux";
import { setEscortsFilterOptions, cleanAllFilters } from "@store/escorts";
import {
  addAllLocations,
  addAllDuoLocations,
  selectAllLocations,
} from "@store/allLocations";
import {
  addAllPrices,
  selectAllPrices,
  addAllDuoPrices,
} from "@store/allPrices";
import { toggleFiltersDisplay } from "@store/filters";
import { RootState } from "@store/reducer";
import {
  EscortsFilterOptions,
  EscortsFilterOptionsPayload,
  EscortsFilterRequestParams,
} from "@components/pages/Main/Hero/types";
import {
  addAllServices,
  addAllDuoServices,
  selectAllServices,
} from "@store/allServices";
import {
  cleanDuoEscorts,
  filterDuoEscorts,
  addEscortsDuo,
} from "@store/duoEscorts";
import { DuoEscortsFilterRequestParams, MainPageSettings } from "@typedefs/app";

interface DispatchProps {
  addAllLocations: () => void;
  addAllPrices: () => void;
  filterDuoEscorts: (params: DuoEscortsFilterRequestParams) => void;
  addEscortsDuo: () => void;
  cleanDuoEscorts: () => void;
  toggleFiltersDisplay: () => void;
  setEscortsFilterOptions: (payload: EscortsFilterOptionsPayload) => void;
  addAllServices: () => void;
}

interface StateProps {
  allLocations: string[];
  allPrices: string[];
  filterOptions: EscortsFilterOptions;
  filterRequestParams: EscortsFilterRequestParams;
  showFilters: boolean;
  allServices: string[];
}

interface OwnProps {
  pageHeader: string;
  searchTitle: string;
}

type Props = DispatchProps & StateProps & OwnProps;

function HeroContainer({
  filterDuoEscorts,
  addEscortsDuo,
  cleanDuoEscorts,
  setEscortsFilterOptions,
  filterOptions,
  filterRequestParams,
  toggleFiltersDisplay,
  showFilters,
  pageHeader,
  searchTitle,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const allLocations = useSelector<RootState, string[]>(selectAllLocations);
  const allPrices = useSelector<RootState, string[]>(selectAllPrices);
  const allServices = useSelector<RootState, string[]>(selectAllServices);

  useEffect(() => {
    dispatch(addAllDuoLocations());
    dispatch(addAllDuoPrices());
    dispatch(addAllDuoServices());
    dispatch(cleanAllFilters());
  }, []);

  const cleanAndLoad = () => {
    cleanDuoEscorts();
    addEscortsDuo();
    dispatch(cleanAllFilters());
  };

  return (
    <Hero
      allLocations={allLocations}
      allPrices={allPrices}
      filterEscorts={filterDuoEscorts}
      showUnfilteredEscorts={addEscortsDuo}
      cleanEscorts={cleanAndLoad}
      setEscortsFilterOptions={setEscortsFilterOptions}
      filterOptions={filterOptions}
      filterRequestParams={filterRequestParams}
      toggleFiltersDisplay={toggleFiltersDisplay}
      showFilters={showFilters}
      allServices={allServices}
      pageHeader={pageHeader}
      searchTitle={searchTitle}
    />
  );
}

const mapDispatch = {
  addAllLocations,
  addAllPrices,
  filterDuoEscorts,
  addEscortsDuo,
  cleanDuoEscorts,
  setEscortsFilterOptions,
  toggleFiltersDisplay,
  addAllServices,
};

const mapState = (
  {
    allLocations: { list: locationsList },
    allPrices: { list: pricesList },
    allServices: { list: servicesList },
    entities: {
      escorts: { filterOptions, filterRequestParams },
    },
    filters: { show },
  }: RootState,
  { pageHeader, searchTitle }: OwnProps
) => ({
  allLocations: locationsList,
  allPrices: pricesList,
  filterOptions,
  filterRequestParams,
  showFilters: show,
  allServices: servicesList,
  pageHeader,
  searchTitle,
});

export default connect(mapState, mapDispatch)(HeroContainer);
