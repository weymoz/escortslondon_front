import React, { FC, useEffect } from "react";
import Title from "@simple/Title";
import Welcome from "@svg/welcome.svg";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceInfo,
  selectServiceInfo,
  ServiceInfoSlice,
} from "@store/service";
import { RootState } from "@store/reducer";
import Preloader from "@simple/Preloader";

interface IWhatIs {
  service: string;
}

const WhatIs: FC<IWhatIs> = ({ service }) => {
  const dispatch = useDispatch();

  const { data } = useSelector<RootState, ServiceInfoSlice>(selectServiceInfo);

  return (
    <div className={s.whatIs}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <Title size="h2">What is {data?.title}?</Title>
          </div>
          <p>{data?.description}</p>
        </div>
        <div className={s.image}>
          <Welcome />
        </div>
      </div>
    </div>
  );
};

export default WhatIs;
