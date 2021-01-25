import React, { FC, ReactElement } from "react";

import GirlsWaiting from "@sections/GirlsWaiting";

import Welcome from "./Welcome";
import AboutUs from "./AboutUs";
/*
import LatestPosts from './LatestPosts';
 */
import EscortsListContainer from "@containers/EscortsListContainer";
import RecommendedContainer from "@containers/RecommendedContainer";
import HeroContainer from "@containers/HeroContainer";
import { MainPageSettings } from "@typedefs/app";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectMainPageSettings } from "@store/mainPageSettings";

const Main: FC = (): ReactElement => {
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const {
    mainPageHeader,
    searchTitle,
    welcomeTitle,
    welcomeText,
    aboutUs,
    aboutUsLeftColumn,
    aboutUsRightColumn,
    recommendedLine1,
    recommendedLine2,
    callToActionText,
    callToActionTitle,
    callToActionButtonWrapperText,
    callToActionButtonWrapperTitle,
    phone,
    whatsApp,
  } = mainPageSettings;

  return (
    <>
      <HeroContainer header={mainPageHeader} searchTitle={searchTitle} />
      <EscortsListContainer />
      <Welcome welcomeText={welcomeText} welcomeTitle={welcomeTitle} />
      <AboutUs
        title={aboutUs?.title}
        text={aboutUs?.text}
        leftColumnData={aboutUsLeftColumn}
        rightColumnData={aboutUsRightColumn}
      />
      <RecommendedContainer
        title={recommendedLine1}
        subTitle={recommendedLine2}
        cardLinkType="router"
      />
      {/* Hidden until Milestone 2 */}
      {/* <LatestPosts /> */}
      <GirlsWaiting
        phone={phone}
        whatsApp={whatsApp}
        callToActionText={callToActionText}
        callToActionTitle={callToActionTitle}
        callToActionButtonWrapperTitle={callToActionButtonWrapperTitle}
        callToActionButtonWrapperText={callToActionButtonWrapperText}
      />
    </>
  );
};
export default Main;
