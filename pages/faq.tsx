import Head from "next/head";
import Layout from "@sections/Layout";
import Main from "@pages/Main";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  getFaqPageSettings,
  getMainPageSettings,
} from "@functions/contentful-api";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import { FaqPageSettings, MainPageSettings } from "@typedefs/app";
import FAQ from "@pages/FAQ";
import FaqPageSettingsModel from "@models/FaqPageSettingsModel";
import { initStore } from "@store/configureStore";
import {
  faqPageSettingsDataReceived,
  selectFaqPageSettings,
} from "@store/faqPageSettings";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";

export const getStaticProps: GetStaticProps<{
  mainPageSettings: MainPageSettings;
  faqPageSettings: FaqPageSettings;
}> = async () => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const faqPageSettingsData = await getFaqPageSettings();
    dispatch(faqPageSettingsDataReceived(faqPageSettingsData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    return {
      props: {
        initialStoreState: {
          ...store.getState(),
        },
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

  const faqPageSettings = useSelector<RootState, FaqPageSettings>(
    selectFaqPageSettings
  );

  const {
    phone,
    whatsApp,
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
  } = mainPageSettings;

  const { titleMetaTag, metaDescriptionTag } = faqPageSettings;

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
      <FAQ
        faqPageSettings={faqPageSettings}
        mainPageSettings={mainPageSettings}
      />
    </Layout>
  );
}
