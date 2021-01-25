import React, { useEffect } from 'react';
import MakeDate from '@pages/MakeDate';
import { connect } from 'react-redux';
import { Escort } from '@store/escorts';
import { RootState } from '@store/reducer';
import {
  addEscort1DateData,
  addEscort2DateData,
  addEscortDataInit,
  cleanEscort1Data,
  cleanEscort2Data,
  setAmmount,
  EscortAmmount,
} from '@store/escortDate';
import {
  addAllEscorts as addAllEscortsFilteredByName,
  cleanFilteredByName,
} from '@store/byName';
import { EscortIndexed } from '@store/types';
import Preloader from '@simple/Preloader';

interface StateProps {
  escort1name: string;
  escort1: Escort;
  escort2: Escort;
  escortsByName: EscortIndexed[];
  ammount: EscortAmmount;
  datePrice: number;
  smsHashCode: string;
}

interface DispatchProps {
  addEscort1DateData: (title: string) => void;
  addEscort2DateData: (title: string) => void;
  addEscortDataInit: () => void;
  addAllEscortsFilteredByName: () => void;
  cleanEscort1Data: () => void;
  cleanEscort2Data: () => void;
  cleanFilteredByName: () => void;
  setAmmount: (e: any) => void;
}

type Props = StateProps & DispatchProps;

const mapState = ({
  escortDate: {
    escort1: { data: escort1, name: escort1name },
    escort2: { data: escort2 },
    datePrice,
    ammount,
  },
  entities: {
    byName: { list: escortsByName },
  },
  smsCode: { code },
}: RootState) => {
  return {
    escort1name,
    escort1,
    escort2,
    escortsByName,
    datePrice,
    smsHashCode: code,
    ammount,
  };
};

const mapDispatch = {
  addEscort1DateData,
  addEscort2DateData,
  addEscortDataInit,
  addAllEscortsFilteredByName,
  cleanEscort1Data,
  cleanEscort2Data,
  setAmmount,
};

const MakeDateContainer = ({
  escort1name,
  escort1,
  escortsByName,
  addEscortDataInit,
  addEscort1DateData,
  addAllEscortsFilteredByName,
  cleanEscort1Data,
  datePrice,
  smsHashCode,
  setAmmount,
  ammount,
}: Props) => {
  useEffect(() => {
    if (!escort1name) {
      addEscortDataInit();
    } else {
      addEscort1DateData(escort1name);
    }

    if (escortsByName.length === 0) {
      addAllEscortsFilteredByName();
    }
  }, [escort1name]);

  if (!escort1) return <Preloader full />;

  const handleDateChange = (date: Date) => {
    console.log(date);
  };

  return (
    <MakeDate
      escort1={escort1}
      escortsByName={escortsByName}
      addEscort1DateData={addEscort1DateData}
      cleanEscort1Data={cleanEscort1Data}
      handleDateChange={handleDateChange}
      datePrice={datePrice}
      smsHashCode={smsHashCode}
      setAmmount={setAmmount}
      ammount={ammount}
    />
  );
};

export default connect(mapState, mapDispatch)(MakeDateContainer);
