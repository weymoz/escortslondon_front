import React, { ReactElement } from 'react';
import Search from '@simple/Search';
import { connect } from 'react-redux';
import {
  filterByName,
  cleanFilteredByName,
  addAllEscorts,
} from '@store/byName';
import { EscortIndexed } from '@store/types';
import { RootState } from '@store/reducer';
import { add } from 'lodash';

interface DispatchProps {
  filterByName: (name: string) => void;
  cleanFilteredByName: () => void;
  addAllEscorts: () => void;
}

interface StateProps {
  escorts: EscortIndexed[];
}

interface OwnProps {
  className?: string;
}

type Props = DispatchProps & StateProps & OwnProps;

function SearchContainer({
  filterByName,
  cleanFilteredByName,
  addAllEscorts,
  escorts,
  className,
}: Props): ReactElement {
  return (
    <Search
      onChange={filterByName}
      cleanPreviousData={cleanFilteredByName}
      addAllEscorts={addAllEscorts}
      escorts={escorts}
      className={className}
    />
  );
}

const mapDispatch = {
  filterByName,
  cleanFilteredByName,
  addAllEscorts,
};

const mapState = (
  {
    entities: {
      byName: { list },
    },
  }: RootState,
  ownProps: OwnProps,
): { escorts: EscortIndexed[]; ownProps: OwnProps } => ({
  escorts: list,
  ownProps,
});

export default connect(mapState, mapDispatch)(SearchContainer);
