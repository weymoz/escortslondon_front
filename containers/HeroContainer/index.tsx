import React, { ReactElement, useEffect } from "react";
import Hero from "@pages/Main/Hero";
import { connect } from "react-redux";
import {
  filterEscorts,
  addEscorts,
  cleanEscorts,
  setEscortsFilterOptions,
} from "@store/escorts";
import { addAllLocations } from "@store/allLocations";
import { addAllPrices } from "@store/allPrices";
import { toggleFiltersDisplay } from "@store/filters";
import { RootState } from "@store/reducer";
import {
  EscortsFilterOptions,
  EscortsFilterOptionsPayload,
  EscortsFilterRequestParams,
} from "@components/pages/Main/Hero/types";
import { addAllServices } from "@store/allServices";

interface DispatchProps {
  addAllLocations: () => void;
  addAllPrices: () => void;
  filterEscorts: (params: EscortsFilterRequestParams) => void;
  addEscorts: () => void;
  cleanEscorts: () => void;
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
  header: string;
  searchTitle: string;
}

type Props = DispatchProps & StateProps & OwnProps;

function HeroContainer({
  addAllLocations,
  addAllPrices,
  allLocations,
  allPrices,
  filterEscorts,
  addEscorts,
  cleanEscorts,
  setEscortsFilterOptions,
  filterOptions,
  filterRequestParams,
  toggleFiltersDisplay,
  showFilters,
  allServices,
  addAllServices,
  header,
  searchTitle,
}: Props): ReactElement {
  useEffect(() => {
    addAllLocations();
    addAllPrices();
    addAllServices();
  }, []);

  return (
    <Hero
      allLocations={allLocations}
      allPrices={allPrices}
      filterEscorts={filterEscorts}
      showUnfilteredEscorts={addEscorts}
      cleanEscorts={cleanEscorts}
      setEscortsFilterOptions={setEscortsFilterOptions}
      filterOptions={filterOptions}
      filterRequestParams={filterRequestParams}
      toggleFiltersDisplay={toggleFiltersDisplay}
      showFilters={showFilters}
      allServices={allServices}
      header={header}
      searchTitle={searchTitle}
    />
  );
}

const mapDispatch = {
  addAllLocations,
  addAllPrices,
  filterEscorts,
  addEscorts,
  cleanEscorts,
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
  { header, searchTitle }: OwnProps
) => ({
  allLocations: locationsList,
  allPrices: pricesList,
  filterOptions,
  filterRequestParams,
  showFilters: show,
  allServices: servicesList,
  header,
  searchTitle,
});

export default connect(mapState, mapDispatch)(HeroContainer);
