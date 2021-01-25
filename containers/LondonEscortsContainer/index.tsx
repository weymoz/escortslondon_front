import React, { useEffect } from 'react';
import LondonEscorts from '@pages/Main/LondonEscorts';
import { fetchEscorts } from '@store/actions';
import { connect } from 'react-redux';
import { RootState } from '@store/reducers/root';
import { AppAction, EscortState } from '@store/types';

interface StateProps {
  escorts: EscortState[];
}

interface DispatchProps {
  fetchEscorts: () => AppAction;
}

export type Props = StateProps & DispatchProps;

const mapStateToProps = ({ escorts }: RootState): StateProps => ({
  escorts,
});

const mapDispatchToProps = {
  fetchEscorts,
};

const LondonEscortsContainer = ({ fetchEscorts, escorts }: Props) => {
  useEffect(() => {
    fetchEscorts();
  }, []);
  return <LondonEscorts escorts={escorts} />;
};
export default connect(mapStateToProps, mapDispatchToProps)(LondonEscortsContainer);
