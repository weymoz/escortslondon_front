import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "@store/reducer";
import { Escort, addEscorts, searchByName } from "@store/escorts";
import { profileClean } from "@store/profile";
import { cleanEscort1Data } from "@store/escortDate";
import { cleanFilteredByName } from "@store/byName";
import EscortsList from "@pages/Main/EscortsList";

interface StateProps {
  escorts: Escort[];
  total: number;
  skip: number;
  limit: number;
  showFiltered: boolean;
}

interface OwnProps {}

interface DispatchProps {
  addEscorts: (p: { limit: number; skip: number }) => void;
  profileClean: () => void;
  searchByName: (query: string) => void;
  cleanEscort1Data: () => void;
  cleanFilteredByName: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

function EscortsListContainer({
  escorts,
  skip,
  total,
  limit,
  addEscorts,
  showFiltered,
}: Props): ReactElement {
  useEffect(() => {
    if (!escorts || escorts.length === 0) addEscorts({ skip, limit });
    //cleanFilteredByName();
  }, []);

  return (
    <EscortsList
      escorts={escorts}
      loadMore={addEscorts}
      total={showFiltered ? escorts.length : total}
      skip={skip}
      limit={limit}
      showMoreButton={!showFiltered && escorts.length < total}
      showFiltered={showFiltered}
    />
  );
}

const mapState = (
  {
    entities: {
      escorts: { list, total, limit, skip, showFiltered },
    },
  }: RootState,
  {}: OwnProps
) => ({ escorts: list, total, limit, skip, showFiltered });

const mapDispatch = {
  addEscorts,
  profileClean,
  searchByName,
  cleanEscort1Data,
  cleanFilteredByName,
};

export default connect(mapState, mapDispatch)(EscortsListContainer);
