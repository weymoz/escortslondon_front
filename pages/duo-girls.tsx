import React, { ReactElement } from "react";
import Layout from "@sections/Layout";
import GirlsWaiting from "@sections/GirlsWaiting";
//import Welcome from "@pages/Main/Welcome";
import AboutUs from "@pages/Main/AboutUs";
//import LatestPosts from "@pages/Main/LatestPosts";
import DuoEscortsList from "@pages/DuoGirls/DuoEscortsList";
import RecommendedContainer from "@containers/RecommendedContainer";
//import Hero from "@pages/DuoGirls/Hero";
import DuoHeroContainer from "@containers/DuoHeroContainer";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  getDuoEscortsData,
  getEscortsDuoPageSettings,
  getMainPageSettings,
} from "@functions/contentful-api";
import { initStore } from "@store/configureStore";
import { escortsDuoReceived } from "@store/duoEscorts";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import { EscortsDuoPageSettings, MainPageSettings } from "@typedefs/app";
import { RootState } from "@store/reducer";
import EscortsDuoPageSettingsModel from "@models/EscortsDuoPageSettingsModel";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import {
  escortsDuoPageSettingsDataReceived,
  selectEscortsDuoPageSettings,
} from "@store/escortsDuoPageSettings";
import { useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export const getStaticProps: GetStaticProps<{
  initialStoreState: RootState;
}> = async () => {
  try {
    const { data: duoEscortsData } = await getDuoEscortsData();

    const { dispatch, getState } = initStore();

    dispatch(escortsDuoReceived(duoEscortsData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const escortsDuoPageSettingsData = await getEscortsDuoPageSettings();
    dispatch(escortsDuoPageSettingsDataReceived(escortsDuoPageSettingsData));

    return {
      props: {
        initialStoreState: getState(),
      },
      revalidate: 1,
    };
  } catch (e) {
    console.error();
  }
};

const DuoEscortsPage = ({}: InferGetStaticPropsType<
  typeof getStaticProps
>): ReactElement => {
  const escortsDuoPageSettings = useSelector<RootState, EscortsDuoPageSettings>(
    selectEscortsDuoPageSettings
  );

  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const {
    mainPageHeader,
    searchTitle,
    titleMetaTag,
    galleryTextLine1,
    galleryTextLine2,
    galleryTextLine3,
    metaDescriptionTag,
    aboutUs,
    aboutUsLeftColumn,
    aboutUsRightColumn,
    recommendedLine1,
    recommendedLine2,
    callToActionText,
    callToActionTitle,
    callToActionButtonWrapperText,
    callToActionButtonWrapperTitle,
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
  } = escortsDuoPageSettings;

  const { phone, whatsApp } = mainPageSettings;

  return (
    <Layout
      callToActionFooterSiteDescription={callToActionFooterSiteDescription}
      callToActionFooterTitle={callToActionFooterTitle}
      callToActionFooterText={callToActionFooterText}
      termsFooter={termsFooter}
      phone={phone}
      whatsApp={whatsApp}
    >
      <Head>
        <title>{titleMetaTag}</title>
        <meta name="description" content={metaDescriptionTag} />
      </Head>
      <DuoHeroContainer pageHeader={mainPageHeader} searchTitle={searchTitle} />
      <DuoEscortsList
        galleryTextLine1={galleryTextLine1}
        galleryTextLine2={galleryTextLine2}
        galleryTextLine3={galleryTextLine3}
      />
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
    </Layout>
  );
  {
    /*}
  <Layout mainPageSettings={mainPageSettings}>
    <Head>
      <title>{escortsDuoPageSettings.titleMetaTag}</title>
      <meta
        name="description"
        content={escortsDuoPageSettings.metaDescriptionTag}
      />
    </Head>
    <DuoHeroContainer mainPageSettings={mainPageSettings} />
    <DuoEscortsList escortsDuoPageSettings={escortsDuoPageSettings} />
    <AboutUs mainPageSettings={mainPageSettings} title="Duo Gallery" />
    <RecommendedContainer
      mainPageSettings={mainPageSettings}
      title="Recommended"
    />
    <GirlsWaiting mainPageSettings={mainPageSettings} />
  </Layout>
{*/
  }
};

export default DuoEscortsPage;
