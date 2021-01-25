import Head from "next/head";
import Layout from "@sections/Layout";
import { initStore } from "@store/configureStore";
import { getEscortsData, getMainPageSettings } from "@functions/contentful-api";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import MakeDate from "@pages/MakeDate";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProfileData } from "@functions/contentful-api";
import { escortDateDataReceived } from "@store/escortDate";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { MainPageSettings } from "@typedefs/app";

export const getServerSideProps: GetServerSideProps = async () => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const { data: firstEscortData } = await getEscortsData(1);
    const title = firstEscortData?.items[0]?.fields?.title;

    const { data: escortData } = await getProfileData(title);

    dispatch(escortDateDataReceived(escortData, 1));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const state = getState();

    const initialStoreState = {
      escortDate: {
        ...state.escortDate,
      },
      mainPageSettings: {
        ...state.mainPageSettings,
      },
    };

    return {
      props: {
        initialStoreState,
        title,
      },
    };
  } catch (e) {
    console.error(e);
  }
};

export default function Index({
  title,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const {
    phone,
    whatsApp,
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
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
        <title>{`Make a date with ${title}`}</title>
        <meta
          name="description"
          content={`Escortslondon.com | Make a date with ${title}`}
        />
      </Head>
      <MakeDate />
    </Layout>
  );
}
