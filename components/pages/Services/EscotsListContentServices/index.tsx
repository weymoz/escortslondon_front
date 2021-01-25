import React, { FC, ReactElement } from "react";
import Title from "@simple/Title";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectServicePageData } from "@store/service";
import { ServicePageSettings } from "@typedefs/app";

const EscortsListContentServices: FC = () => {
  const servicePageSettings = useSelector<RootState, ServicePageSettings>(
    selectServicePageData
  );
  if (!servicePageSettings) return null;
  const {
    title,
    galleryTextLine1,
    galleryTextLine2,
    galleryTextLine3,
  } = servicePageSettings;
  return (
    <div className={s.contentWrapper}>
      <div className={s.titleWrapper}>
        <Title content={galleryTextLine1 || `Naughty and Discrete`}>
          {`${title} ${galleryTextLine2 || "Escorts in London"}`}
        </Title>
      </div>
      <p>
        {galleryTextLine3 ||
          `
        Now its time for the exciting part - choosing the perfect London escort!
          `}
      </p>
    </div>
  );
};

export default EscortsListContentServices;
