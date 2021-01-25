import Head from "next/head";
import Layout from "@sections/Layout";
import { initStore } from "@store/configureStore";
import {
  getDuoEscortsData,
  getDuoProfileData,
  getMainPageSettings,
} from "@functions/contentful-api";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import DuoMakeDate from "@pages/DuoMakeDate";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { duoEscortDateDataReceived } from "@store/duoEscortDate";
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
    const firstProfileData = await getDuoEscortsData(1);
    const slug = firstProfileData?.data?.items[0]?.fields?.slug;
    const duoProfileData = await getDuoProfileData((slug as string) || "");
    dispatch(duoEscortDateDataReceived(duoProfileData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const state = getState();

    const initialStoreState = {
      duoEscortDate: {
        ...state.duoEscortDate,
      },
      mainPageSettings: {
        ...state.mainPageSettings,
      },
    };
    return {
      props: {
        initialStoreState,
        escort1Title: state?.duoEscortDate?.data?.escort_1?.title || "",
        escort2Title: state?.duoEscortDate?.data?.escort_2?.title || "",
      },
    };
  } catch (e) {
    console.error(e);
  }
};

export default function Index({
  escort1Title,
  escort2Title,
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
        <title>{`Make a date with ${escort1Title} and ${escort2Title}`}</title>
        <meta
          name="description"
          content={`Escortslondon.com | Make a date with ${escort1Title} and ${escort2Title}`}
        />
      </Head>
      <DuoMakeDate />
    </Layout>
  );
}
