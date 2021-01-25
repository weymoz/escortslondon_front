import Head from "next/head";
import Layout from "@sections/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import GirlsWaiting from "@sections/GirlsWaiting";
import AboutUs from "@pages/Main/AboutUs";
//import LatestPosts from '../Main/LatestPosts';
import EscortsList from "@pages/Services/EscortsList";
import RecommendedContainer from "@containers/RecommendedContainer";
//import HeroContainer from '@containers/HeroContainer';
import WhatIs from "@pages/Services/WhatIs";
import { useRouter } from "next/router";
import {
  getAllServices,
  getEscortsByServiceData,
  getMainPageSettings,
  getServiceData,
  getServicesPageSettings,
} from "@functions/contentful-api";
import { initStore } from "@store/configureStore";
import {
  escortsByServiceReceived,
  selectServicePageData,
  servicesReceived,
  ServiceStateSlice,
} from "@store/service";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import { MainPageSettings, Service, ServicePageSettings } from "@typedefs/app";
import ServicePageSettingsModel from "@models/ServicePageSettingsModel";
import React from "react";
import Preloader from "@components/simple/Preloader";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export async function getStaticPaths() {
  try {
    const { data } = await getAllServices();

    const paths = data.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error(e);
  }
}

export const getStaticProps: GetStaticProps<
  {
    initialStoreState: { service: ServiceStateSlice };
  },
  { slug: string }
> = async ({ params }) => {
  if (params.slug) {
    try {
      const store = initStore();
      const { dispatch, getState } = store;

      const currentServiceData = await getServiceData(params.slug);
      dispatch(servicesReceived(currentServiceData));

      const { data: escortsByServiceData } = await getEscortsByServiceData(
        params.slug
      );
      dispatch(escortsByServiceReceived(escortsByServiceData));

      const mainPageSettingsData = await getMainPageSettings();
      dispatch(mainPageSettingsReceived(mainPageSettingsData));

      const initialStoreState = getState();

      return {
        props: {
          initialStoreState: {
            service: initialStoreState.service,
            mainPageSettings: initialStoreState.mainPageSettings,
          },
        },
        revalidate: 1,
      };
    } catch (e) {
      console.error(e);
    }
  }
};

export default function ServiceBySlug({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const router = useRouter();
  const servicePageSettings = useSelector<RootState, ServicePageSettings>(
    selectServicePageData
  );
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );
  if (router.isFallback) {
    return <Preloader full />;
  }
  const {
    titleTag,
    metaDescriptionTag,
    title,
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
  } = servicePageSettings;

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
        <title>{titleTag}</title>
        <meta name="description" content={metaDescriptionTag} />
      </Head>
      <WhatIs service={title} />
      <EscortsList />
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
}
