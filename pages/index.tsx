import Head from "next/head";
import Layout from "@sections/Layout";
import Main from "@pages/Main";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { initStore } from "@store/configureStore";
import { escortsReceived } from "@store/escorts";
import { getEscortsData, getMainPageSettings } from "@functions/contentful-api";
import { RootState } from "@store/reducer";
import { MainPageSettings } from "@typedefs/app";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import { useState } from "react";
import { useSelector } from "react-redux";

export const getStaticProps: GetStaticProps<{
  initialStoreState: RootState;
}> = async () => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const { data: escortsData } = await getEscortsData();
    dispatch(escortsReceived(escortsData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    return {
      props: {
        initialStoreState: getState(),
      },
      revalidate: 1,
    };
  } catch (e) {
    console.error(e);
  }
};

export default function Index({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const {
    titleMetaTag,
    metaDescriptionTag,
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
    phone,
    whatsApp,
  } = mainPageSettings;

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
      <Main />
    </Layout>
  );
}
