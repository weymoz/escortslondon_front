import Head from "next/head";
import Layout from "@sections/Layout";
import {
  getCastingPageSettings,
  getMainPageSettings,
} from "@functions/contentful-api";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import Casting from "@pages/Casting";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { CastingPageSettings, MainPageSettings } from "@typedefs/app";
import { initStore } from "@store/configureStore";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import {
  castingPageSettingsDataReceived,
  selectCastingPageSettings,
} from "@store/castingPageSettings";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";

export const getStaticProps: GetStaticProps<{
  mainPageSettings: MainPageSettings;
}> = async () => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const castingPageSettingsData = await getCastingPageSettings();
    dispatch(castingPageSettingsDataReceived(castingPageSettingsData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const state = getState();

    const initialStoreState = {
      mainPageSettings: {
        ...state.mainPageSettings,
      },
      castingPageSettings: {
        ...state.castingPageSettings,
      },
    };

    return {
      props: {
        initialStoreState,
      },
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
  const castingPageSettings = useSelector<RootState, CastingPageSettings>(
    selectCastingPageSettings
  );

  const { titleMetaTag, metaDescriptionTag } = castingPageSettings;

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
        <title>{titleMetaTag}</title>
        <meta name="description" content={metaDescriptionTag} />
      </Head>
      <Casting />
    </Layout>
  );
}
